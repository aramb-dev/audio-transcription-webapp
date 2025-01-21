export const FILE_TYPES = {
    ALLOWED: ['audio/mp3', 'audio/mp4', 'audio/x-m4a', 'video/mp4'],
    EXTENSIONS: ['.mp3', '.mp4', '.m4a']
  };
  
  export const MAX_FILE_SIZE_MB = 100;
  
  export const API_ENDPOINTS = {
    DOWNLOAD: '/api/download',
    TRANSCRIBE: '/api/transcribe'
  };
  
  export const ERROR_MESSAGES = {
    FILE_TYPE: 'Invalid file type. Please upload MP3, MP4, or M4A files only.',
    FILE_SIZE: `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`,
    YOUTUBE_URL: 'Invalid YouTube URL.',
    DRIVE_URL: 'Invalid Google Drive URL.',
    NETWORK: 'Network error. Please check your connection and try again.',
    TRANSCRIPTION: 'Failed to transcribe audio. Please try again.'
  };
  
  export const SOURCE_TYPES = {
    FILE: 'file',
    YOUTUBE: 'youtube',
    DRIVE: 'drive'
  };