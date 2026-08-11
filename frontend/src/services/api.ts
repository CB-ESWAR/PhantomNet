export interface EngineScores {
  stylometric: number;
  statistical: number;
  readability: number;
  fingerprint: number;
  similarity: number;
}

export interface ModelSimilarity {
  gpt: number;
  claude: number;
  gemini: number;
  deepseek: number;
  copilot: number;
  mistral: number;
  llama: number;
}

export interface AnalyzeResponse {
  verdict: string;
  aiProbability: number;
  humanProbability: number;
  confidence: number;
  reliability: number;
  reliabilityGrade: string;
  engineScores: EngineScores;
  modelSimilarity: ModelSimilarity;
  evidence: string[];
  recommendation: string;
}

const API_BASE_URL = "https://phantomnet-api.onrender.com";

/**
 * Checks if the PhantomNet FastAPI backend is online and reachable.
 */
export async function checkEngineHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return data && data.message === "PhantomNet API Running";
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Sends input text to the PhantomNet C++ engine via FastAPI backend.
 * Strict response contract matching backend Pydantic models.
 */
export async function analyzeText(text: string): Promise<AnalyzeResponse> {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("Input text cannot be empty.");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: trimmed }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let detail = "PhantomNet analysis engine failed.";
      try {
        const errorData = await response.json();
        if (errorData && errorData.detail) {
          detail = typeof errorData.detail === "string" ? errorData.detail : JSON.stringify(errorData.detail);
        }
      } catch {
        // Fallback to HTTP status status text
        detail = `Engine request failed with status ${response.status}: ${response.statusText}`;
      }
      throw new Error(detail);
    }

    const data: AnalyzeResponse = await response.json();
    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("PhantomNet analysis timed out after 35 seconds.");
    }
    if (error.message && error.message.includes("Failed to fetch")) {
      throw new Error("PhantomNet analysis engine is unavailable.");
    }
    throw error;
  }
}

/**
 * Sends uploaded document (.txt, .pdf, .docx) to FastAPI backend endpoint POST /analyze-file.
 */
export async function analyzeFile(file: File): Promise<AnalyzeResponse> {
  if (!file) {
    throw new Error("No file provided for analysis.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(`${API_BASE_URL}/analyze-file`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let detail = "PhantomNet file analysis engine failed.";
      try {
        const errorData = await response.json();
        if (errorData && errorData.detail) {
          detail = typeof errorData.detail === "string" ? errorData.detail : JSON.stringify(errorData.detail);
        }
      } catch {
        detail = `File engine request failed with status ${response.status}: ${response.statusText}`;
      }
      throw new Error(detail);
    }

    const data: AnalyzeResponse = await response.json();
    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("PhantomNet file analysis timed out after 45 seconds.");
    }
    if (error.message && error.message.includes("Failed to fetch")) {
      throw new Error("PhantomNet analysis engine is unavailable.");
    }
    throw error;
  }
}

