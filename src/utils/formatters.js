/**
 * Format timestamp in seconds to MM:SS format
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format text for display by cleaning up whitespace
 */
export const formatTranscriptionText = (text) => {
  return text.trim().replace(/\s+/g, " ").replace(/\n+/g, "\n");
};
