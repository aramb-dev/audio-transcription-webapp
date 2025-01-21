import React from 'react';
import AudioInput from './components/AudioInput';
import TranscriptionResult from './components/TranscriptionResult';
import LoadingSpinner from './components/LoadingSpinner';
import { useAudioProcessing } from './hooks/useAudioProcessing';

function App() {
  const { isLoading, error, result, processAudio } = useAudioProcessing();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Audio Transcription Service
          </h1>
          <p className="mt-2 text-gray-600">
            Upload audio files or provide YouTube/Drive links for transcription
          </p>
        </header>

        <main className="bg-white rounded-lg shadow-md p-6">
          <AudioInput onSubmit={processAudio} isLoading={isLoading} />
          
          <div className="mt-6">
            {isLoading && <LoadingSpinner />}
            <TranscriptionResult result={result} error={error} />
          </div>
        </main>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by Gradio • Created by aramb-dev</p>
          <p className="mt-1">Last updated: 2025-01-21</p>
        </footer>
      </div>
    </div>
  );
}

export default App;