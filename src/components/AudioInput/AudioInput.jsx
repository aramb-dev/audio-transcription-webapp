import React, { useState } from "react";
import FileUpload from "./FileUpload";
import URLInput from "./URLInput";

const AudioInput = ({ onSubmit, isLoading }) => {
  const [inputMethod, setInputMethod] = useState("file"); // 'file' or 'url'

  const handleFileSelect = (file) => {
    onSubmit({
      type: "file",
      data: file,
    });
  };

  const handleUrlSubmit = (url) => {
    onSubmit({
      type: "url",
      data: url,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          className={`
            pb-2 px-1 text-sm font-medium
            ${
              inputMethod === "file"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
          onClick={() => setInputMethod("file")}
        >
          Upload File
        </button>
        <button
          className={`
            pb-2 px-1 text-sm font-medium
            ${
              inputMethod === "url"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
          onClick={() => setInputMethod("url")}
        >
          Enter URL
        </button>
      </div>

      <div>
        {inputMethod === "file" ? (
          <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />
        ) : (
          <URLInput onUrlSubmit={handleUrlSubmit} disabled={isLoading} />
        )}
      </div>

      {isLoading && (
        <div className="text-center text-sm text-gray-500">
          <div className="inline-block animate-spin mr-2">⚡</div>
          Processing your audio...
        </div>
      )}
    </div>
  );
};

export default AudioInput;
