import { Client } from '@gradio/client';
import config from '../config/index.js';

export const transcriptionController = {
  async transcribe(req, res, next) {
    try {
      const audioFile = req.file || req.audio;
      if (!audioFile) {
        return res.status(400).json({ error: 'No audio file provided' });
      }

      // Initialize Gradio client
      const client = await Client.connect("aramb-dev/arabic-transcription");

      // Process transcription
      const result = await client.predict("/predict", { 
        param_0: audioFile,
      });

      res.status(200).json({
        message: 'Transcription completed successfully',
        transcription: result.data,
        timestamp: config.getCurrentTimestamp(),
        processedBy: 'aramb-dev'
      });
    } catch (error) {
      next(error);
    }
  },

  async getTranscriptionStatus(req, res, next) {
    try {
      const { jobId } = req.params;
      // Implementation for checking transcription status
      // This would be useful for long-running transcriptions
      res.status(200).json({
        jobId,
        status: 'completed', // or 'processing', 'failed'
        progress: 100
      });
    } catch (error) {
      next(error);
    }
  }
};