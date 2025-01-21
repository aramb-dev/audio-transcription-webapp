// Handle different types of audio inputs (file, YouTube, Google Drive)
export const processAudioInput = async (inputData) => {
    const { type, data } = inputData;
  
    switch (type) {
      case 'file':
        return await processAudioFile(data);
      case 'youtube':
        return await processYoutubeUrl(data);
      case 'drive':
        return await processDriveUrl(data);
      default:
        throw new Error('Unsupported audio input type');
    }
  };
  
  const processAudioFile = async (file) => {
    if (!file) throw new Error('No file provided');
    
    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size exceeds 100MB limit');
    }
  
    return file;
  };
  
  const processYoutubeUrl = async (url) => {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        source: 'youtube'
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to process YouTube URL');
    }
  
    return await response.blob();
  };
  
  const processDriveUrl = async (url) => {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        source: 'drive'
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to process Google Drive URL');
    }
  
    return await response.blob();
  };