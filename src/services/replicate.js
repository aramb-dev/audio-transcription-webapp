import Replicate from "replicate";

const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN,
});

const MODEL_VERSION = import.meta.env.VITE_APP_REPLICATE_MODEL_VERSION;

export const transcribeAudio = async (audioUrl) => {
  try {
    const output = await replicate.run(
      "vaibhavs10/incredibly-fast-whisper:" + MODEL_VERSION,
      {
        input: {
          audio: audioUrl,
          batch_size: 64,
          language: null, // auto-detect language
          timestamp: false, // disable timestamps in output
          return_tokens: false,
        },
      }
    );

    return {
      text: output.text,
      language: output.detected_language,
    };
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error(error.message || "Failed to transcribe audio");
  }
};

// For handling local file uploads
export const getUploadUrl = async (file) => {
  try {
    // In a production environment, this would call your backend to get a secure upload URL
    // For now, we'll use a mock implementation
    const formData = new FormData();
    formData.append("file", file);

    // This would be your backend endpoint for getting a signed URL
    const response = await fetch("/api/upload-url", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to get upload URL");
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error("Upload URL error:", error);
    throw new Error("Failed to get upload URL");
  }
};

export const checkTranscriptionStatus = async (predictionId) => {
  try {
    const prediction = await replicate.predictions.get(predictionId);
    return {
      status: prediction.status,
      output: prediction.output,
      error: prediction.error,
    };
  } catch (error) {
    console.error("Status check error:", error);
    throw new Error("Failed to check transcription status");
  }
};
