import React, { useState } from "react";
import AudioInput from "./components/AudioInput";
import TranscriptionOutput from "./components/TranscriptionOutput";
import useTranscription from "./hooks/useTranscription";

function App() {
  const [audioSource, setAudioSource] = useState(null);
  const { transcription, isTranscribing, error, startTranscription } =
    useTranscription();

  const handleAudioSubmit = async (audioData) => {
    setAudioSource(audioData);
    await startTranscription(audioData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Audio Transcription
          </h1>
          <p className="mt-2 text-gray-600">
            Upload an audio file or provide a URL to get started
          </p>
        </header>

        <main>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow p-6">
              <AudioInput
                onSubmit={handleAudioSubmit}
                isLoading={isTranscribing}
              />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <TranscriptionOutput
                transcription={transcription}
                isLoading={isTranscribing}
                error={error}
                audioSource={audioSource}
              />
            </div>
          </div>
        </main>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Powered by Replicate API and Incredibly Fast Whisper</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
