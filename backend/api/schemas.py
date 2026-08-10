from typing import List

from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    text: str


class EngineScores(BaseModel):
    stylometric: float
    statistical: float
    readability: float
    fingerprint: float
    similarity: float


class ModelSimilarity(BaseModel):
    gpt: float
    claude: float
    gemini: float
    deepseek: float
    copilot: float
    mistral: float
    llama: float


class AnalyzeResponse(BaseModel):
    verdict: str
    aiProbability: float
    humanProbability: float
    confidence: float
    reliability: float
    reliabilityGrade: str
    engineScores: EngineScores
    modelSimilarity: ModelSimilarity
    evidence: List[str]
    recommendation: str