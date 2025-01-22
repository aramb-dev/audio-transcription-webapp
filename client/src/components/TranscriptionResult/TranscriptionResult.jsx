// TranscriptionResult/TranscriptionResult.jsx
import React from "react";

const TranscriptionResult = ({ result, error }) => {
  if (!result && !error) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Transcription Result:</h2>
      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded">
          <pre className="whitespace-pre-wrap font-mono text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default TranscriptionResult;
