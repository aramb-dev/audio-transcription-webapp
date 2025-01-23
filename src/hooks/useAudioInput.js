import { useState, useCallback } from "react";
import { validateAudioFile, validateAudioUrl } from "../services/validation";
import { getUploadUrl } from "../services/replicate";
import { isYouTubeUrl, isGoogleDriveUrl } from "../services/audioUtils";

export const useAudioInput = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = useCallback(async (file) => {
    try {
      setError(null);
      setIsProcessing(true);

      // Validate file
      const validationErrors = validateAudioFile(file);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]);
      }

      // Get upload URL and upload file
      const url = await getUploadUrl(file);
      setAudioUrl(url);
      return url;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleUrlInput = useCallback(async (url) => {
    try {
      setError(null);
      setIsProcessing(true);

      // Validate URL
      const validationErrors = validateAudioUrl(url);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]);
      }

      // Handle different URL types
      if (isYouTubeUrl(url) || isGoogleDriveUrl(url)) {
        setAudioUrl(url);
        return url;
      }

      setAudioUrl(url);
      return url;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setAudioUrl("");
    setError(null);
  }, []);

  return {
    audioUrl,
    isProcessing,
    error,
    handleFileUpload,
    handleUrlInput,
    reset,
  };
};
