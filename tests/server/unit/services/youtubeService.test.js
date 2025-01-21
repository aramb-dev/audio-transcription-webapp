import youtubeService from '../../../../server/src/services/youtubeService';

describe('YouTube Service', () => {
  describe('validateUrl', () => {
    test('should validate correct YouTube URL', async () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      const result = await youtubeService.validateUrl(url);
      expect(result).toBe(true);
    });

    test('should reject invalid URL', async () => {
      const url = 'https://invalid-url.com';
      await expect(youtubeService.validateUrl(url)).rejects.toThrow('Invalid YouTube URL');
    });
  });

  describe('getVideoInfo', () => {
    test('should reject videos longer than 1 hour', async () => {
      const url = 'https://www.youtube.com/watch?v=very-long-video';
      await expect(youtubeService.getVideoInfo(url)).rejects.toThrow('Video duration exceeds 1 hour limit');
    });
  });
});