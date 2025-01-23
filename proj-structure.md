````audio-transcription-app/
├── .env                    # Environment variables (REPLICATE_API_TOKEN)
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
├── public/
│   ├── index.html         # HTML entry point
│   └── favicon.ico        # App favicon
├── src/
│   ├── App.jsx           # Main application component
│   ├── index.jsx         # Application entry point
│   ├── components/       # Reusable UI components
│   │   ├── AudioInput/   # Audio input handling components
│   │   │   ├── AudioInput.jsx          # Main audio input component
│   │   │   ├── FileUpload.jsx          # Local file upload component
│   │   │   ├── URLInput.jsx            # URL/Drive/YouTube input component
│   │   │   └── index.js                # Barrel export file
│   │   ├── TranscriptionOutput/  # Output display components
│   │   │   ├── TranscriptionOutput.jsx # Transcription display component
│   │   │   ├── TranscriptionControls.jsx # Playback/copy controls
│   │   │   └── index.js                # Barrel export file
│   │   └── common/       # Common UI components
│   │       ├── Button.jsx
│   │       ├── Loading.jsx
│   │       └── ErrorMessage.jsx
│   ├── services/        # Business logic and API calls
│   │   ├── replicate.js # Replicate API integration
│   │   ├── audioUtils.js # Audio file handling utilities
│   │   └── validation.js # Input validation functions
│   ├── hooks/          # Custom React hooks
│   │   ├── useTranscription.js    # Transcription logic hook
│   │   └── useAudioInput.js       # Audio input handling hook
│   ├── constants/      # Application constants
│   │   ├── api.js     # API endpoints and constants
│   │   └── config.js  # App configuration
│   ├── styles/        # Styling files
│   │   ├── index.css  # Global styles
│   │   └── components/ # Component-specific styles
│   └── utils/         # Utility functions
│       ├── formatters.js # Text formatting utilities
│       └── validators.js # Input validation utilities
└── tests/             # Test files
    ├── components/    # Component tests
    ├── hooks/        # Hook tests
    └── utils/        # Utility function tests
    ```
````
