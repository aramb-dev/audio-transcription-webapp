import { processYouTubeUrl, processDriveUrl } from '../services/audioService.js';
import config from '../config/index.js';

export const audioController = {
  async downloadFromYoutube(req, res, next) {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: 'YouTube URL is required' });
      }

      const audioStream = await processYouTubeUrl(url);
      res.setHeader('Content-Type', 'audio/mpeg');
      audioStream.pipe(res);
    } catch (error) {
      next(error);
    }
  },

  async downloadFromDrive(req, res, next) {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: 'Google Drive URL is required' });
      }

      const audioStream = await processDriveUrl(url);
      res.setHeader('Content-Type', 'audio/mpeg');
      audioStream.pipe(res);
    } catch (error) {
      next(error);
    }
  },

  async uploadAudio(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No audio file uploaded' });
      }

      // File validation is handled by middleware
      res.status(200).json({
        message: 'File uploaded successfully',
        file: {
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype
        }
      });
    } catch (error) {
      next(error);
    }
  }
};