export const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    return [
      hours > 0 ? hours.toString().padStart(2, '0') : null,
      minutes.toString().padStart(2, '0'),
      remainingSeconds.toString().padStart(2, '0'),
    ].filter(Boolean).join(':');
  };
  
  export const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  };
  
  export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };