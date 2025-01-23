import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-12 h-12 rounded-full border-4 border-blue-200"></div>
        {/* Inner animated circle */}
        <div className="absolute top-0 left-0 w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
      </div>
      {message && (
        <p className="mt-4 text-gray-600 text-center font-medium">{message}</p>
      )}
    </div>
  );
};

export default Loading;
