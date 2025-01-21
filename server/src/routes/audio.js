import express from 'express';
import multer from 'multer';
import path from 'path';
import { audioController } from '../controllers/audioController.js';
import { transcriptionController } from '../controllers/transcriptionController.js';
import { validateAudioFile, validateYoutubeUrl, validateDriveUrl } from '../middleware/validation.js';
import { uploadLimiter } from '../middleware/rateLimiter.js';
import config from '../config/index.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.upload.tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: config.upload.maxFileSize
  }
});

// Routes
router.post('/upload', 
  uploadLimiter,
  upload.single('audio'),
  validateAudioFile,
  audioController.uploadAudio
);

router.post('/youtube',
  uploadLimiter,
  validateYoutubeUrl,
  audioController.downloadFromYoutube
);

router.post('/drive',
  uploadLimiter,
  validateDriveUrl,
  audioController.downloadFromDrive
);

router.post('/transcribe',
  upload.single('audio'),
  validateAudioFile,
  transcriptionController.transcribe
);

router.get('/transcribe/:jobId/status',
  transcriptionController.getTranscriptionStatus
);

export default router;