from pathlib import Path

API_DIR = Path(__file__).resolve().parent
BACKEND_DIR = API_DIR.parent
PROJECT_ROOT = BACKEND_DIR.parent

ENGINE_PATH = (
    BACKEND_DIR
    / "build"
    / "engine"
    / "phantomnet"
)

UPLOAD_FOLDER = (
    BACKEND_DIR
    / "uploads"
)

UPLOAD_FOLDER.mkdir(
    parents=True,
    exist_ok=True
)