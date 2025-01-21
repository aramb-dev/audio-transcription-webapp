import { useState, useCallback } from 'react';
import { processAudioInput } from '../services/audioService';
import { getGradioService } from '../services/gradioService';
import { validateFileType, validateFileSize } from '../utils/validators';
import { formatTranscriptionResult } from '../utils/formatters';

export const useAudioProcessing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const processAudio = useCallback(async (inputData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Validate file if it's a local upload
      if (inputData.type === 'file') {
        if (!validateFileType(inputData.data)) {
          throw new Error('Invalid file type. Please upload MP3, MP4, or M4A files only.');
        }
        if (!validateFileSize(inputData.data)) {
          throw new Error('File size exceeds 100MB limit.');
        }
      }

      // Process the audio input
      const audioBlob = await processAudioInput(inputData);

      // Get Gradio service instance
      const gradioService = await getGradioService();

      // Perform transcription
      const transcriptionResult = await gradioService.transcribe(audioBlob);

      // Format the result
      const formattedResult = formatTranscriptionResult(transcriptionResult);
      setResult(formattedResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    result,
    processAudio
  };
};