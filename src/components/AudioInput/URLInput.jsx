import React, { useState } from "react";
import { toast } from "react-hot-toast";

const URLInput = ({ onUrlSubmit, disabled }) => {
  const [url, setUrl] = useState("");

  const validateUrl = (inputUrl) => {
    try {
      const parsedUrl = new URL(inputUrl);

      // Check for supported platforms
      const isYouTube =
        parsedUrl.hostname.includes("youtube.com") ||
        parsedUrl.hostname.includes("youtu.be");
      const isGoogleDrive = parsedUrl.hostname.includes("drive.google.com");
      const isDirectFile = /\.(mp3|mp4|m4a)$/i.test(parsedUrl.pathname);

      return isYouTube || isGoogleDrive || isDirectFile;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      toast.error(
        "Please enter a valid YouTube, Google Drive, or direct audio file URL"
      );
      return;
    }

    onUrlSubmit(url.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="audio-url"
          className="block text-sm font-medium text-gray-700"
        >
          Audio URL
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="audio-url"
            className={`
              block w-full rounded-md border-gray-300 shadow-sm
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm
              ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
            `}
            placeholder="Enter YouTube, Google Drive, or direct audio file URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled || !url.trim()}
        className={`
          w-full flex justify-center py-2 px-4 border border-transparent
          rounded-md shadow-sm text-sm font-medium text-white
          ${
            disabled || !url.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }
        `}
      >
        Submit URL
      </button>
    </form>
  );
};

export default URLInput;
