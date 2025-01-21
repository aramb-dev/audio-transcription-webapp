// LoadingSpinner/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2">Processing audio...</span>
    </div>
  );
};

export default LoadingSpinner;

// LoadingSpinner/index.js
export { default } from './LoadingSpinner';