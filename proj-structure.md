audio-transcription-app/
├── .env                    # Environment variables (REPLICATE_API_TOKEN)
├── .gitignore
├── package.json
├── README.md
│
├── public/                 # Public assets
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── app/               # App-level configurations
│   │   └── api/          # API route handlers
│   │       └── transcribe.js  # Transcription API endpoint
│   │
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   │   ├── alert.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   └── select.jsx
│   │   │
│   │   └── TranscriptionApp.jsx  # Main transcription component
│   │
│   ├── lib/              # Utility functions and services
│   │   ├── replicate.js  # Replicate API client setup
│   │   ├── validators.js # Input validation functions
│   │   └── helpers.js    # Helper functions
│   │
│   ├── styles/           # Styling files
│   │   └── globals.css   # Global styles
│   │
│   ├── types/           # TypeScript type definitions (if using TS)
│   │   └── index.d.ts
│   │
│   ├── constants/       # Constants and configuration
│   │   └── config.js    # App configuration
│   │
│   ├── hooks/          # Custom React hooks
│   │   └── useTranscription.js  # Transcription logic hook
│   │
│   ├── App.jsx         # Root App component
│   └── index.jsx       # Entry point
│
├── tests/              # Test files
│   └── TranscriptionApp.test.jsx
│
└── config/            # Configuration files
    ├── jest.config.js
    └── webpack.config.js