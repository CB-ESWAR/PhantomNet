import React, { useMemo, useState, useRef } from "react";

interface AnalysisConsoleProps {
  text: string;
  setText: (text: string) => void;
  onAnalyze: () => void;
  onAnalyzeFile: (file: File) => void;
  onClear: () => void;
  onPrefillSample: (sample: string) => void;
  isAnalyzing: boolean;
}

const SAMPLE_TEXT = `The rapid advancement of artificial intelligence models has fundamentally altered the landscape of automated text generation. Modern neural architectures employ self-attention mechanisms across billions of parameters to synthesize highly coherent linguistic sequences. Consequently, distinguishing between machine-generated prose and authentic human compositions requires multi-layered statistical, stylometric, and syntactic evaluation.`;

export const AnalysisConsole: React.FC<AnalysisConsoleProps> = ({
  text,
  setText,
  onAnalyze,
  onAnalyzeFile,
  onClear,
  onPrefillSample,
  isAnalyzing,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute word and character count
  const wordCount = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [text]);

  const charCount = text.length;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isAnalyzing && text.trim()) {
        onAnalyze();
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFile = (file: File) => {
    setFileError(null);
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["txt", "pdf", "docx"].includes(ext)) {
      setFileError("Unsupported file format. Please upload a .txt, .pdf, or .docx file.");
      return;
    }

    setSelectedFile(file);

    // For .txt files, preview and populate the editor text automatically
    if (ext === "txt") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          setText(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileAnalysisTrigger = () => {
    if (selectedFile && !isAnalyzing) {
      onAnalyzeFile(selectedFile);
    }
  };

  return (
    <section className="console-wrapper">
      {/* Hero Header */}
      <div className="console-hero">
        <h1 className="hero-title text-gradient">See the signals behind the text.</h1>
        <p className="hero-subtitle">
          An explainable linguistic intelligence engine that analyzes writing across multiple independent signals.
        </p>
      </div>

      {/* Editor Box */}
      <div className="forensic-card console-card">
        <div className="editor-top-bar">
          <div className="editor-label font-mono">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
              <rect x="4" y="4" width="16" height="16" rx="2"/>
              <line x1="8" y1="9" x2="16" y2="9"/>
              <line x1="8" y1="13" x2="16" y2="13"/>
              <line x1="8" y1="17" x2="12" y2="17"/>
            </svg>
            INPUT CONSOLE
          </div>
          
          <div className="editor-actions">
            <button
              type="button"
              className="btn-secondary text-btn font-mono"
              onClick={() => {
                handleRemoveFile();
                onPrefillSample(SAMPLE_TEXT);
              }}
              disabled={isAnalyzing}
            >
              PREFILL SAMPLE
            </button>

            {(text || selectedFile) && (
              <button
                type="button"
                className="btn-secondary text-btn font-mono"
                onClick={() => {
                  handleRemoveFile();
                  onClear();
                }}
                disabled={isAnalyzing}
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Drag & Drop File Upload Bar */}
        <div
          className={`file-dropzone font-mono ${isDragging ? "dropzone-active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !selectedFile && fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept=".txt,.pdf,.docx"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />

          {selectedFile ? (
            <div className="file-badge-container">
              <div className="file-badge-info">
                <span className="file-ext-tag">{selectedFile.name.split(".").pop()?.toUpperCase()}</span>
                <span className="file-name">{selectedFile.name}</span>
                <span className="file-size">({formatFileSize(selectedFile.size)})</span>
              </div>
              <div className="file-badge-actions">
                <button
                  type="button"
                  className="btn-primary file-run-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileAnalysisTrigger();
                  }}
                  disabled={isAnalyzing}
                >
                  ANALYZE FILE
                </button>
                <button
                  type="button"
                  className="btn-secondary text-btn remove-file-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  disabled={isAnalyzing}
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <div className="dropzone-placeholder">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-primary)" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span>Drag & drop document (<strong>.txt</strong>, <strong>.pdf</strong>, <strong>.docx</strong>) or click to browse</span>
            </div>
          )}
        </div>

        {fileError && (
          <div className="file-error-bar font-mono">
            ⚠️ {fileError}
          </div>
        )}

        {/* Main Textarea */}
        <div className="textarea-container">
          <textarea
            className="main-textarea font-mono"
            placeholder="Paste or type text here, or upload a document (.txt, .pdf, .docx) above for forensic linguistic analysis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isAnalyzing}
            rows={7}
            aria-label="Input text for forensic analysis"
          />
        </div>

        {/* Bottom Status & CTA */}
        <div className="editor-bottom-bar">
          <div className="stats-counters font-mono">
            <span className="counter-item">
              <strong className="counter-val">{wordCount.toLocaleString()}</strong> WORDS
            </span>
            <span className="counter-divider">•</span>
            <span className="counter-item">
              <strong className="counter-val">{charCount.toLocaleString()}</strong> CHARACTERS
            </span>
          </div>

          <div className="cta-area">
            <span className="shortcut-hint font-mono">Press Ctrl + Enter to run</span>
            <button
              type="button"
              className="btn-primary"
              onClick={selectedFile ? handleFileAnalysisTrigger : onAnalyze}
              disabled={isAnalyzing || (!text.trim() && !selectedFile)}
              aria-label="Run Analysis"
            >
              {isAnalyzing ? (
                <>
                  <span className="spinner-icon font-mono">⚡</span>
                  ANALYZING...
                </>
              ) : selectedFile ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  ANALYZE FILE
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  RUN ANALYSIS
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .console-wrapper {
          width: 100%;
          margin-bottom: 32px;
        }

        .console-hero {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 28px auto;
        }

        .hero-title {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 10px;
        }

        .hero-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          font-weight: 400;
          line-height: 1.5;
        }

        .console-card {
          padding: 0;
          background: rgba(18, 22, 36, 0.7);
          border: 1px solid var(--border-medium);
        }

        .editor-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(10, 13, 20, 0.4);
        }

        .editor-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--cyan-primary);
        }

        .editor-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .text-btn {
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 4px;
        }

        .file-dropzone {
          margin: 12px 20px 0 20px;
          padding: 12px 16px;
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-md);
          background: rgba(10, 13, 20, 0.3);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .file-dropzone:hover, .dropzone-active {
          border-color: var(--cyan-primary);
          background: rgba(0, 240, 255, 0.05);
        }

        .dropzone-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .file-badge-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .file-badge-info {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;
        }

        .file-ext-tag {
          background: rgba(0, 240, 255, 0.15);
          color: var(--cyan-primary);
          border: 1px solid var(--cyan-primary);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
        }

        .file-name {
          font-size: 13px;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .file-size {
          font-size: 11px;
          color: var(--text-muted);
        }

        .file-badge-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .file-run-btn {
          padding: 4px 12px;
          font-size: 11px;
        }

        .remove-file-btn {
          color: var(--crimson-danger);
          padding: 4px 8px;
        }

        .file-error-bar {
          margin: 8px 20px 0 20px;
          padding: 8px 12px;
          background: rgba(255, 51, 102, 0.1);
          border: 1px solid var(--crimson-danger);
          border-radius: var(--radius-sm);
          color: var(--crimson-danger);
          font-size: 12px;
        }

        .textarea-container {
          padding: 16px 20px;
          position: relative;
        }

        .main-textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 14px;
          line-height: 1.7;
          resize: vertical;
          min-height: 140px;
        }

        .main-textarea::placeholder {
          color: var(--text-muted);
          opacity: 0.7;
        }

        .editor-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-top: 1px solid var(--border-subtle);
          background: rgba(10, 13, 20, 0.6);
          gap: 16px;
        }

        .stats-counters {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          color: var(--text-muted);
        }

        .counter-val {
          color: var(--text-primary);
        }

        .counter-divider {
          opacity: 0.4;
        }

        .cta-area {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .shortcut-hint {
          font-size: 11px;
          color: var(--text-muted);
          opacity: 0.8;
        }

        .spinner-icon {
          display: inline-block;
          animation: pulseCyan 0.6s infinite alternate;
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 28px;
          }
          .editor-bottom-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .stats-counters {
            justify-content: center;
          }
          .cta-area {
            flex-direction: column;
            width: 100%;
          }
          .shortcut-hint {
            display: none;
          }
          .btn-primary {
            width: 100%;
          }
          .file-badge-container {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};
