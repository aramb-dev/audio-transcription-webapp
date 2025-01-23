import React from "react";
import { toast } from "react-hot-toast";

const TranscriptionControls = ({ transcription, onDownload, audioSource }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcription);
      toast.success("Transcription copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      console.error("Copy failed:", error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([transcription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcription.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onDownload?.();
  };

  if (!transcription) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleCopy}
        className="inline-flex items-center px-3 py-1.5 border border-transparent
                 text-xs font-medium rounded shadow-sm text-white bg-blue-600
                 hover:bg-blue-700 focus:outline-none focus:ring-2
                 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg
          className="h-4 w-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
        Copy
      </button>

      <button
        onClick={handleDownload}
        className="inline-flex items-center px-3 py-1.5 border border-transparent
                 text-xs font-medium rounded shadow-sm text-white bg-green-600
                 hover:bg-green-700 focus:outline-none focus:ring-2
                 focus:ring-offset-2 focus:ring-green-500"
      >
        <svg
          className="h-4 w-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download
      </button>

      {audioSource?.type === "url" && (
        <a
          href={audioSource.data}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1.5 border border-transparent
                   text-xs font-medium rounded shadow-sm text-white bg-purple-600
                   hover:bg-purple-700 focus:outline-none focus:ring-2
                   focus:ring-offset-2 focus:ring-purple-500"
        >
          <svg
            className="h-4 w-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Open Source
        </a>
      )}
    </div>
  );
};

export default TranscriptionControls;
