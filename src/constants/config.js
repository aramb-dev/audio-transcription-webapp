export const CONFIG = {
    MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
    SUPPORTED_FILE_TYPES: [
      'audio/mpeg',
      'audio/mp4',
      'audio/x-m4a',
      'video/mp4'
    ],
    SUPPORTED_LANGUAGES: [
      { value: 'ar', label: 'Arabic' },
      { value: 'en', label: 'English' }
    ],
    PROCESS_TYPES: {
      youtube: "YouTube",
      google_drive: "Google Drive",
      upload: "Upload File",
      direct_link: "Direct Link",
      curl: "cURL Command"
    },
    API_ENDPOINTS: {
      TRANSCRIBE: '/api/transcribe',
      UPLOAD: '/api/upload'
    },
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_PROCESS_TYPE: 'youtube'
  };