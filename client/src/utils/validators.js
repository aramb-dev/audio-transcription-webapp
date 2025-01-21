export const validateFileType = (file) => {
    const allowedTypes = ['audio/mp3', 'audio/mp4', 'audio/x-m4a', 'video/mp4'];
    return allowedTypes.includes(file.type);
  };
  
  export const validateFileSize = (file, maxSizeMB = 100) => {
    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
    return file.size <= maxSize;
  };
  
  export const validateYoutubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/;
    return youtubeRegex.test(url);
  };
  
  export const validateDriveUrl = (url) => {
    const driveRegex = /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view(\?usp=sharing)?$/;
    return driveRegex.test(url);
  };
  
  export const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  };