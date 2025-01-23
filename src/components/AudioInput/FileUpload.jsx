import React from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

const ACCEPTED_AUDIO_TYPES = {
  "audio/mpeg": [".mp3"],
  "audio/mp4": [".m4a", ".mp4"],
  "video/mp4": [".mp4"],
};

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const FileUpload = ({ onFileSelect, disabled }) => {
  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ errors }) => {
        errors.forEach((error) => {
          switch (error.code) {
            case "file-too-large":
              toast.error("File is too large. Maximum size is 100MB");
              break;
            case "file-invalid-type":
              toast.error(
                "Invalid file type. Please upload MP3, MP4, or M4A files"
              );
              break;
            default:
              toast.error("Error uploading file");
          }
        });
      });
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_AUDIO_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        transition-colors duration-200
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-blue-500 hover:bg-blue-50"
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M24 14v6m0 0v6m0-6h6m-6 0h-6"
          />
        </svg>

        <div className="text-sm text-gray-600">
          {isDragActive ? (
            <p>Drop the audio file here...</p>
          ) : (
            <p>
              Drag and drop an audio file, or click to select
              <br />
              <span className="text-xs text-gray-500">
                Supports MP3, MP4, and M4A (max 100MB)
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
