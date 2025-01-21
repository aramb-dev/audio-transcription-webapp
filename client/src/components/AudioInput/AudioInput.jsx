// AudioInput/AudioInput.jsx
import React, { useState } from 'react';

const AudioInput = ({ onSubmit, isLoading }) => {
  const [audioSource, setAudioSource] = useState('file');
  const [input, setInput] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let submitData;
    if (audioSource === 'file') {
      const file = e.target.audioFile.files[0];
      if (!file) {
        alert('Please select a file');
        return;
      }
      submitData = { type: 'file', data: file };
    } else {
      if (!input) {
        alert('Please enter a URL');
        return;
      }
      submitData = { type: audioSource, data: input };
    }
    
    onSubmit(submitData);
  };

  const isValidUrl = (url) => {
    if (audioSource === 'youtube') {
      return url.includes('youtube.com/') || url.includes('youtu.be/');
    }
    if (audioSource === 'drive') {
      return url.includes('drive.google.com/');
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 font-medium">Select Input Type:</label>
        <select 
          value={audioSource} 
          onChange={(e) => setAudioSource(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          <option value="file">Local File</option>
          <option value="drive">Google Drive Link</option>
          <option value="youtube">YouTube Link</option>
        </select>
      </div>

      {audioSource === 'file' ? (
        <div>
          <label className="block mb-2 font-medium">Upload Audio File:</label>
          <input 
            type="file" 
            name="audioFile"
            accept=".mp3,.mp4,.m4a"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <p className="text-sm text-gray-500 mt-1">
            Supported formats: MP3, MP4, M4A
          </p>
        </div>
      ) : (
        <div>
          <label className="block mb-2 font-medium">
            Enter {audioSource === 'drive' ? 'Google Drive' : 'YouTube'} URL:
          </label>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter ${audioSource === 'drive' ? 'Google Drive' : 'YouTube'} URL`}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          {input && !isValidUrl(input) && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid {audioSource === 'drive' ? 'Google Drive' : 'YouTube'} URL
            </p>
          )}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isLoading || (input && !isValidUrl(input))}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 
                 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Processing...' : 'Transcribe Audio'}
      </button>
    </form>
  );
};

export default AudioInput;

// AudioInput/index.js
export { default } from './AudioInput';