# Audio Transcription App

A web application that transcribes audio files using the Replicate API and the Incredibly Fast Whisper model.

## Features

- Support for multiple audio formats (MP3, MP4, M4A)
- Multiple input methods:
  - Local file upload
  - URL input
  - Google Drive links
  - YouTube links
- Real-time transcription progress
- Copy and download transcription results

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Replicate API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/audio-transcription-app.git
cd audio-transcription-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Replicate API key:

```
REPLICATE_API_TOKEN=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

### Building for Production

To create a production build:

```bash
npm run build
```

## Usage

1. Open the application in your browser
2. Choose your input method:
   - Upload a local audio file
   - Paste a URL to an audio file
   - Paste a Google Drive link
   - Paste a YouTube URL
3. Click "Transcribe" to start the process
4. Wait for the transcription to complete
5. View, copy, or download the results

## Technologies Used

- React
- Vite
- Tailwind CSS
- Replicate API
- React Dropzone
- Axios

## License

This project is licensed under the MIT License - see the LICENSE file for details.
