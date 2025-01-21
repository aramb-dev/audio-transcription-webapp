export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };
  
  export const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  export const formatTranscriptionResult = (result) => {
    if (!result) return '';
    
    // Remove extra whitespace and normalize line endings
    return result
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n');
  };