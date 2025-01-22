import { useState, useCallback } from 'react';
import { transcribeAudio, uploadFile } from '@/lib/replicate';
import { validateUrl, validateFileType, validateFileSize } from '@/lib/validators';
import { CONFIG } from '@/constants/config';

export const useTranscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const processTranscription = useCallback(async ({ url, file, language, processType }) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      let audioUrl = url;

      if (file) {
        if (!validateFileType(file)) {
          throw new Error('Unsupported file type');
        }
        if (!validateFileSize(file, CONFIG.MAX_FILE_SIZE)) {
          throw new Error('File size exceeds limit');
        }
        audioUrl = await uploadFile(file);
      } else if (url && !validateUrl(url)) {
        throw new Error('Invalid URL');
      }

      const transcription = await transcribeAudio(audioUrl, { language, processType });
      setResult(transcription);
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
    processTranscription
  };
};
