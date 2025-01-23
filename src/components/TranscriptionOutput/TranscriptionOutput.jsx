import React from "react";
import TranscriptionControls from "./TranscriptionControls";

const TranscriptionOutput = ({
  transcription,
  isLoading,
  error,
  audioSource,
}) => {
  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center text-red-600 p-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium">Transcription Error</h3>
          <p className="mt-1 text-sm text-red-500">{error.message}</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="text-center text-gray-500 p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
          <p className="mt-4 text-sm">Transcribing audio...</p>
        </div>
      );
    }

    if (!transcription) {
      return (
        <div className="text-center text-gray-500 p-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No transcription yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload an audio file or provide a URL to get started
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <TranscriptionControls
          transcription={transcription}
          audioSource={audioSource}
        />

        <div className="relative">
          <div
            className="prose prose-sm max-w-none p-4 bg-gray-50 rounded-lg
                     max-h-[60vh] overflow-y-auto"
          >
            <p className="whitespace-pre-wrap">{transcription}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-lg">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900">Transcription</h2>
        <p className="text-sm text-gray-500">
          Your transcribed text will appear here
        </p>
      </div>

      {renderContent()}
    </div>
  );
};

export default TranscriptionOutput;
