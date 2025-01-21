import config from '../config/index.js';

export const validateAudioFile = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const { mimetype, size } = req.file;

  // Check file type
  if (!config.upload.allowedMimeTypes.includes(mimetype)) {
    return res.status(400).json({
      error: 'Invalid file type. Only audio files (MP3, MP4, M4A) are allowed.'
    });
  }

  // Check file size
  if (size > config.upload.maxFileSize) {
    return res.status(400).json({
      error: `File size exceeds ${config.upload.maxFileSize / (1024 * 1024)}MB limit.`
    });
  }

  next();
};

export const validateYoutubeUrl = (req, res, next) => {
  const { url } = req.body;
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/;

  if (!url || !youtubeRegex.test(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  next();
};

export const validateDriveUrl = (req, res, next) => {
  const { url } = req.body;
  const driveRegex = /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view(\?usp=sharing)?$/;

  if (!url || !driveRegex.test(url)) {
    return res.status(400).json({ error: 'Invalid Google Drive URL' });
  }

  next();
};