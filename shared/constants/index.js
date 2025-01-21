export const APP_INFO = {
    LAST_UPDATED: "2025-01-21 23:33:54",
    MAINTAINER: "aramb-dev",
    VERSION: "1.0.0"
  };
  
  export const FILE_CONSTRAINTS = {
    MAX_SIZE_MB: 100,
    ALLOWED_TYPES: [
      'audio/mpeg',
      'audio/mp4',
      'audio/x-m4a',
      'video/mp4'
    ],
    ALLOWED_EXTENSIONS: ['.mp3', '.mp4', '.m4a'],
  };
  
  export const API_ENDPOINTS = {
    AUDIO: {
      UPLOAD: '/api/audio/upload',
      YOUTUBE: '/api/audio/youtube',
      DRIVE: '/api/audio/drive',
      TRANSCRIBE: '/api/audio/transcribe',
      STATUS: '/api/audio/transcribe/:jobId/status'
    },
    HEALTH: '/api/health'
  };
  
  export const ERROR_MESSAGES = {
    FILE_SIZE: `File size exceeds ${FILE_CONSTRAINTS.MAX_SIZE_MB}MB limit`,
    FILE_TYPE: 'Invalid file type. Only audio files (MP3, MP4, M4A) are allowed',
    YOUTUBE_URL: 'Invalid YouTube URL format',
    DRIVE_URL: 'Invalid Google Drive URL format',
    NETWORK: 'Network error. Please check your connection',
    SERVER: 'Server error occurred'
  };
  
  export const REGEX_PATTERNS = {
    YOUTUBE_URL: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/,
    DRIVE_URL: /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view(\?usp=sharing)?$/
  };