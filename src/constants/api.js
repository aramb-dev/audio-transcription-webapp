export const API = {
  REPLICATE: {
    BASE_URL: "https://api.replicate.com/v1",
    ENDPOINTS: {
      PREDICTIONS: "/predictions",
    },
    MODEL_VERSION:
      "3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c",
  },

  UPLOAD: {
    MAX_SIZE: 100 * 1024 * 1024, // 100MB
    ACCEPTED_TYPES: ["audio/mpeg", "audio/mp4", "audio/x-m4a", "video/mp4"],
  },
};
