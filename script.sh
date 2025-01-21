#!/bin/bash

# Create root level files
touch README.md
touch .gitignore
touch .env.example
touch .env

# Create client directory structure
mkdir -p client/public
touch client/public/index.html
touch client/public/favicon.ico

# Create client source directories and files
mkdir -p client/src/components/{AudioInput,TranscriptionResult,LoadingSpinner}
mkdir -p client/src/{services,utils,hooks,constants,styles}

# Create component files
for component in AudioInput TranscriptionResult LoadingSpinner; do
    touch "client/src/components/$component/$component.jsx"
    touch "client/src/components/$component/index.js"
done

# Create client service files
touch client/src/services/audioService.js
touch client/src/services/gradioService.js

# Create client utility files
touch client/src/utils/validators.js
touch client/src/utils/formatters.js

# Create client hooks and other files
touch client/src/hooks/useAudioProcessing.js
touch client/src/constants/index.js
touch client/src/styles/index.css
touch client/src/App.jsx
touch client/src/index.js

# Create client config files
touch client/.env
touch client/vite.config.js

# Create server directory structure
mkdir -p server/src/{config,controllers,middleware,routes,services,utils}

# Create server config files
touch server/src/config/googleDrive.js
touch server/src/config/index.js

# Create server controller files
touch server/src/controllers/audioController.js
touch server/src/controllers/transcriptionController.js

# Create server middleware files
touch server/src/middleware/errorHandler.js
touch server/src/middleware/validation.js
touch server/src/middleware/rateLimiter.js

# Create server route files
touch server/src/routes/audio.js
touch server/src/routes/index.js

# Create server service files
touch server/src/services/youtubeService.js
touch server/src/services/driveService.js
touch server/src/services/audioService.js

# Create server utility files
touch server/src/utils/asyncHandler.js
touch server/src/utils/validators.js

# Create main server app file
touch server/src/app.js

# Create server config files
touch server/.env
touch server/nodemon.json

# Create shared directory structure
mkdir -p shared/{constants,types}
touch shared/constants/index.js
touch shared/types/index.d.ts

# Create test directory structure
mkdir -p tests/{client/components,server/{integration,unit}}

# Set execute permissions for the script
chmod +x setup.sh

echo "Directory structure and files created successfully!"
