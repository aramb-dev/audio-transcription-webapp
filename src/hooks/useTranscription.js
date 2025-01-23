import { useState, useCallback } from "react";
import { transcribeAudio } from "../services/replicate";

export const useTranscription = () => {
  const [transcription, setTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startTranscription = useCallback(async (audioUrl) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await transcribeAudio(audioUrl);
      setTranscription(result.text);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetTranscription = useCallback(() => {
    setTranscription("");
    setError(null);
  }, []);

  return {
    transcription,
    isLoading,
    error,
    startTranscription,
    resetTranscription,
  };
};
