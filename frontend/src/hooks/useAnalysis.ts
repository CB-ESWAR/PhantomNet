import { useState, useEffect, useCallback } from "react";
import { analyzeText, analyzeFile, checkEngineHealth, AnalyzeResponse } from "../services/api";

export type AnalysisStatus = "idle" | "scanning" | "success" | "error";

export type ScanningSignal =
  | "INITIALIZING"
  | "STYLOMETRIC"
  | "STATISTICAL"
  | "READABILITY"
  | "FINGERPRINT"
  | "SIMILARITY"
  | "FINALIZING";

export function useAnalysis() {
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [scanningSignal, setScanningSignal] = useState<ScanningSignal>("INITIALIZING");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [engineOnline, setEngineOnline] = useState<boolean | null>(null);

  // Periodically check real engine health
  const refreshEngineHealth = useCallback(async () => {
    const isOnline = await checkEngineHealth();
    setEngineOnline(isOnline);
  }, []);

  useEffect(() => {
    refreshEngineHealth();
    const interval = setInterval(refreshEngineHealth, 15000);
    return () => clearInterval(interval);
  }, [refreshEngineHealth]);

  // Execute text analysis with scanning sequence animation
  const runAnalysis = useCallback(async (textToAnalyze?: string) => {
    const targetText = textToAnalyze !== undefined ? textToAnalyze : text;
    const trimmed = targetText.trim();

    if (!trimmed) {
      setError("Please input or paste text before running analysis.");
      setStatus("error");
      return;
    }

    setStatus("scanning");
    setError(null);
    setResult(null);

    // Sequence of signals to cycle through visually during scanning
    const signals: ScanningSignal[] = [
      "INITIALIZING",
      "STYLOMETRIC",
      "STATISTICAL",
      "READABILITY",
      "FINGERPRINT",
      "SIMILARITY",
      "FINALIZING",
    ];

    let currentSignalIndex = 0;
    setScanningSignal(signals[0]);

    const signalInterval = setInterval(() => {
      currentSignalIndex = (currentSignalIndex + 1) % (signals.length - 1);
      setScanningSignal(signals[currentSignalIndex + 1]);
    }, 450);

    try {
      const response = await analyzeText(trimmed);

      // Ensure scanning animation completes at least 1 full sweep
      setTimeout(() => {
        clearInterval(signalInterval);
        setResult(response);
        setStatus("success");
        setEngineOnline(true);
      }, 1600);

    } catch (err: any) {
      clearInterval(signalInterval);
      const errorMessage = err.message || "An unknown error occurred during analysis.";
      setError(errorMessage);
      setStatus("error");
      
      // Re-verify engine online status if it failed with connection error
      refreshEngineHealth();
    }
  }, [text, refreshEngineHealth]);

  // Execute document file analysis (.txt, .pdf, .docx)
  const runFileAnalysis = useCallback(async (file: File) => {
    if (!file) {
      setError("Please select a valid document file.");
      setStatus("error");
      return;
    }

    setStatus("scanning");
    setError(null);
    setResult(null);

    const signals: ScanningSignal[] = [
      "INITIALIZING",
      "STYLOMETRIC",
      "STATISTICAL",
      "READABILITY",
      "FINGERPRINT",
      "SIMILARITY",
      "FINALIZING",
    ];

    let currentSignalIndex = 0;
    setScanningSignal(signals[0]);

    const signalInterval = setInterval(() => {
      currentSignalIndex = (currentSignalIndex + 1) % (signals.length - 1);
      setScanningSignal(signals[currentSignalIndex + 1]);
    }, 450);

    try {
      const response = await analyzeFile(file);

      setTimeout(() => {
        clearInterval(signalInterval);
        setResult(response);
        setStatus("success");
        setEngineOnline(true);
      }, 1600);

    } catch (err: any) {
      clearInterval(signalInterval);
      const errorMessage = err.message || "An unknown error occurred during file analysis.";
      setError(errorMessage);
      setStatus("error");
      refreshEngineHealth();
    }
  }, [refreshEngineHealth]);

  const clearConsole = useCallback(() => {
    setText("");
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  const prefillSample = useCallback((sample: string) => {
    setText(sample);
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  return {
    text,
    setText,
    status,
    scanningSignal,
    result,
    error,
    engineOnline,
    runAnalysis,
    runFileAnalysis,
    clearConsole,
    prefillSample,
    refreshEngineHealth,
  };
}

