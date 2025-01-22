# Audio Transcription App

A web application that transcribes audio from various sources using the Replicate API's Whisper model. The app supports transcription from YouTube videos, Google Drive files, direct links, and local file uploads.

## Features

- Multiple input sources:
  - YouTube videos
  - Google Drive files (mp3, mp4, m4a)
  - Direct file upload (mp3, mp4, m4a)
  - Direct URL links
- Real-time transcription status
- Support for multiple languages (Arabic and English)
- Drag and drop file upload
- Modern UI with Tailwind CSS

## Prerequisites

Before you begin, ensure you have:
- Node.js 16.x or later
- npm or yarn package manager
- A Replicate API token

## Setup

1. Clone the repository:
```bash
git clone https://github.com/aramb-dev/audio-transcription-app.git
cd audio-transcription-app