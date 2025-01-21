import request from 'supertest';
import app from '../../../server/src/app';
import { FILE_CONSTRAINTS } from '../../../shared/constants';

describe('Audio API Integration Tests', () => {
  describe('POST /api/audio/upload', () => {
    test('should upload audio file successfully', async () => {
      const response = await request(app)
        .post('/api/audio/upload')
        .attach('audio', 'tests/fixtures/test-audio.mp3');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'File uploaded successfully');
    });

    test('should reject invalid file type', async () => {
      const response = await request(app)
        .post('/api/audio/upload')
        .attach('audio', 'tests/fixtures/invalid.txt');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', FILE_CONSTRAINTS.ERROR_MESSAGES.FILE_TYPE);
    });
  });

  describe('POST /api/audio/youtube', () => {
    test('should process valid YouTube URL', async () => {
      const response = await request(app)
        .post('/api/audio/youtube')
        .send({ url: 'https://youtube.com/watch?v=dQw4w9WgXcQ' });

      expect(response.status).toBe(200);
    });
  });
});