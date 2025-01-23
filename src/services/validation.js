import {
  MAX_FILE_SIZE,
  SUPPORTED_AUDIO_TYPES,
  isYouTubeUrl,
  isGoogleDriveUrl,
} from "./audioUtils";

export const validateAudioFile = (file) => {
  const errors = [];

  // Check if file exists
  if (!file) {
    errors.push("No file provided");
    return errors;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
  }

  // Check file type
  if (!SUPPORTED_AUDIO_TYPES.includes(file.type)) {
    errors.push(
      "Unsupported file type. Please upload MP3, MP4, M4A, WAV, OGG, or WebM files"
    );
  }

  return errors;
};

export const validateAudioUrl = (url) => {
  const errors = [];

  if (!url) {
    errors.push("No URL provided");
    return errors;
  }

  try {
    new URL(url);
  } catch (e) {
    errors.push("Invalid URL format");
    return errors;
  }

  // Check if it's a YouTube URL
  if (isYouTubeUrl(url)) {
    return errors; // YouTube URLs are valid
  }

  // Check if it's a Google Drive URL
  if (isGoogleDriveUrl(url)) {
    return errors; // Google Drive URLs are valid
  }

  // For direct audio file URLs, check the file extension
  const validExtensions = [".mp3", ".mp4", ".m4a", ".wav", ".ogg", ".webm"];
  const hasValidExtension = validExtensions.some((ext) =>
    url.toLowerCase().endsWith(ext)
  );

  if (!hasValidExtension) {
    errors.push(
      "URL must point to a supported audio file (MP3, MP4, M4A, WAV, OGG, or WebM)"
    );
  }

  return errors;
};

export const validateTranscriptionRequest = (input) => {
  const errors = [];

  if (!input) {
    errors.push("No input provided");
    return errors;
  }

  if (input instanceof File) {
    return validateAudioFile(input);
  }

  if (typeof input === "string") {
    return validateAudioUrl(input);
  }

  errors.push("Invalid input type. Must be a file or URL");
  return errors;
};

export const sanitizeFileName = (fileName) => {
  // Remove any path traversal characters
  const sanitized = fileName.replace(/[/\\?%*:|"<>]/g, "-");

  // Ensure the filename isn't too long
  const maxLength = 255;
  if (sanitized.length > maxLength) {
    const extension = sanitized.split(".").pop();
    const nameWithoutExtension = sanitized.slice(0, -(extension.length + 1));
    return `${nameWithoutExtension.slice(
      0,
      maxLength - extension.length - 1
    )}.${extension}`;
  }

  return sanitized;
};

export const validateLanguageCode = (languageCode) => {
  // ISO 639-1 language codes are typically 2 letters
  const languageCodeRegex = /^[a-z]{2}$/i;
  return languageCodeRegex.test(languageCode);
};
