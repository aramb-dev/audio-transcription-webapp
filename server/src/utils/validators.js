export const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  export const isYoutubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/;
    return youtubeRegex.test(url);
  };
  
  export const isDriveUrl = (url) => {
    const driveRegex = /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view(\?usp=sharing)?$/;
    return driveRegex.test(url);
  };
  
  export const isValidAudioType = (mimetype) => {
    const validTypes = [
      'audio/mpeg',
      'audio/mp4',
      'audio/x-m4a',
      'video/mp4'
    ];
    return validTypes.includes(mimetype);
  };
  
  export const isValidFileSize = (size, maxSize) => {
    return size <= maxSize;
  };