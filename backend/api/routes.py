import io
import json
import subprocess

from fastapi import APIRouter, HTTPException, UploadFile, File

from config import ENGINE_PATH
from dependencies import validate_text
from schemas import AnalyzeRequest, AnalyzeResponse


router = APIRouter()


def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    filename_lower = filename.lower() if filename else ""

    if filename_lower.endswith(".txt"):
        try:
            return file_bytes.decode("utf-8")
        except UnicodeDecodeError:
            return file_bytes.decode("latin-1", errors="ignore")

    elif filename_lower.endswith(".pdf"):
        try:
            import pypdf
            pdf_file = io.BytesIO(file_bytes)
            reader = pypdf.PdfReader(pdf_file)
            text_parts = []
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text_parts.append(extracted)
            return "\n".join(text_parts)
        except Exception as error:
            raise ValueError(f"Failed to extract PDF content: {str(error)}")

    elif filename_lower.endswith(".docx"):
        try:
            import docx
            docx_file = io.BytesIO(file_bytes)
            doc = docx.Document(docx_file)
            text_parts = [p.text for p in doc.paragraphs if p.text]
            return "\n".join(text_parts)
        except Exception as error:
            raise ValueError(f"Failed to extract DOCX content: {str(error)}")

    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload a .txt, .pdf, or .docx file."
        )


def run_engine_analysis(text: str) -> dict:
    if not ENGINE_PATH.exists():
        raise HTTPException(
            status_code=500,
            detail="PhantomNet engine executable was not found."
        )

    try:
        result = subprocess.run(
            [str(ENGINE_PATH), "--api"],
            input=text,
            text=True,
            capture_output=True,
            timeout=30
        )

        if result.returncode != 0:
            error = result.stderr.strip()
            if not error:
                error = "PhantomNet engine failed."
            raise HTTPException(
                status_code=500,
                detail=error
            )

        output = result.stdout.strip()
        if not output:
            raise HTTPException(
                status_code=500,
                detail="PhantomNet engine returned an empty response."
            )

        try:
            return json.loads(output)
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=500,
                detail="PhantomNet engine returned invalid JSON."
            )

    except subprocess.TimeoutExpired:
        raise HTTPException(
            status_code=504,
            detail="PhantomNet analysis timed out."
        )


@router.post(
    "/analyze",
    response_model=AnalyzeResponse
)
def analyze(
    request: AnalyzeRequest
):
    try:
        try:
            text = validate_text(request.text)
        except ValueError as error:
            raise HTTPException(
                status_code=400,
                detail=str(error)
            )

        return run_engine_analysis(text)

    except HTTPException:
        raise
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


@router.post(
    "/analyze-file",
    response_model=AnalyzeResponse
)
def analyze_file(
    file: UploadFile = File(...)
):
    try:
        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="Uploaded file has no filename."
            )

        file_bytes = file.file.read()

        try:
            raw_text = extract_text_from_file(file_bytes, file.filename)
        except HTTPException:
            raise
        except ValueError as error:
            raise HTTPException(
                status_code=400,
                detail=str(error)
            )
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from file."
            )

        try:
            text = validate_text(raw_text)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from file."
            )

        return run_engine_analysis(text)

    except HTTPException:
        raise
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )