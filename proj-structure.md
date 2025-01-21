audio-transcription-webapp/
├── README.md
├── package.json
├── .gitignore
├── .env.example
├── .env
│
├── client/                   # Frontend React application
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── AudioInput/
│   │   │   │   ├── AudioInput.jsx
│   │   │   │   └── index.js
│   │   │   ├── TranscriptionResult/
│   │   │   │   ├── TranscriptionResult.jsx
│   │   │   │   └── index.js
│   │   │   └── LoadingSpinner/
│   │   │       ├── LoadingSpinner.jsx
│   │   │       └── index.js
│   │   ├── services/
│   │   │   ├── audioService.js    # Audio processing functions
│   │   │   └── gradioService.js   # Gradio client integration
│   │   ├── utils/
│   │   │   ├── validators.js      # URL and file validation
│   │   │   └── formatters.js      # Response formatting
│   │   ├── hooks/
│   │   │   └── useAudioProcessing.js
│   │   ├── constants/
│   │   │   └── index.js           # App constants
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env
│   └── vite.config.js            # Using Vite for faster development
│
├── server/                  # Backend Node.js application
│   ├── package.json
│   ├── src/
│   │   ├── config/
│   │   │   ├── googleDrive.js    # Google Drive API configuration
│   │   │   └── index.js          # General configuration
│   │   ├── controllers/
│   │   │   ├── audioController.js
│   │   │   └── transcriptionController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   ├── validation.js
│   │   │   └── rateLimiter.js
│   │   ├── routes/
│   │   │   ├── audio.js          # Audio processing routes
│   │   │   └── index.js
│   │   ├── services/
│   │   │   ├── youtubeService.js
│   │   │   ├── driveService.js
│   │   │   └── audioService.js
│   │   ├── utils/
│   │   │   ├── asyncHandler.js
│   │   │   └── validators.js
│   │   └── app.js                # Express app entry point
│   ├── .env
│   └── nodemon.json
│
├── shared/                  # Shared code between frontend and backend
│   ├── constants/
│   │   └── index.js
│   └── types/              # If using TypeScript
│       └── index.d.ts
│
└── tests/                  # Test files
    ├── client/
    │   └── components/
    └── server/
        ├── integration/
        └── unit/