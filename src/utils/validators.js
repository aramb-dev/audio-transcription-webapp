import { CONFIG } from "../constants/config";

/**
 * Validate file size
 */
export const validateFileSize = (file) => {
  if (file.size > CONFIG.MAX_FILE_SIZE) {
    throw new Error(
      `File size must not exceed ${formatFileSize(CONFIG.MAX_FILE_SIZE)}`
    );
  }
  return true;
};

/**
 * Validate file type
 */
export const validateFileType = (file) => {
  if (!CONFIG.SUPPORTED_FILE_TYPES.includes(file.type)) {
    throw new Error(
      "Unsupported file type. Please upload an MP3, MP4, or M4A file."
    );
  }
  return true;
};

/**
 * Validate URL format
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    throw new Error("Invalid URL format");
  }
};
