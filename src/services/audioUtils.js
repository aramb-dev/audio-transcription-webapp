// Maximum file size in bytes (100MB)
export const MAX_FILE_SIZE = 100 * 1024 * 1024;

// Supported file types
export const SUPPORTED_AUDIO_TYPES = [
  "audio/mpeg", // .mp3
  "audio/mp4", // .m4a
  "video/mp4", // .mp4
  "audio/wav", // .wav
  "audio/ogg", // .ogg
  "audio/webm", // .webm
];

export const isValidAudioFile = (file) => {
  return SUPPORTED_AUDIO_TYPES.includes(file.type);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const isYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
};

export const isGoogleDriveUrl = (url) => {
  const driveRegex = /^https:\/\/drive\.google\.com\/(file\/d\/|open\?id=).+/;
  return driveRegex.test(url);
};

export const extractFileIdFromDriveUrl = (url) => {
  const fileIdMatch = url.match(/\/file\/d\/([^/]+)/);
  if (fileIdMatch) {
    return fileIdMatch[1];
  }
  const idMatch = url.match(/[?&]id=([^&]+)/);
  return idMatch ? idMatch[1] : null;
};

export const convertDriveUrlToDirectDownload = (url) => {
  const fileId = extractFileIdFromDriveUrl(url);
  if (!fileId) return null;
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

export const getYouTubeVideoId = (url) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Audio preprocessing utilities
export const normalizeAudio = async (audioFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const audioData = await audioContext.decodeAudioData(e.target.result);

        // Create offline context for processing
        const offlineContext = new OfflineAudioContext(
          audioData.numberOfChannels,
          audioData.length,
          audioData.sampleRate
        );

        const source = offlineContext.createBufferSource();
        source.buffer = audioData;

        // Add gain node for normalization
        const gain = offlineContext.createGain();
        source.connect(gain);
        gain.connect(offlineContext.destination);

        // Calculate peak amplitude
        const peaks = Array.from(audioData.getChannelData(0)).map(Math.abs);
        const peak = Math.max(...peaks);

        // Set gain to normalize
        gain.gain.value = peak > 0 ? 1 / peak : 1;

        // Render and resolve
        source.start(0);
        const renderedBuffer = await offlineContext.startRendering();

        resolve(renderedBuffer);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(audioFile);
  });
};
