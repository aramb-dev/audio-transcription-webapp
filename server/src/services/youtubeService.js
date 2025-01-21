import ytdl from 'ytdl-core';
import config from '../config/index.js';

class YouTubeService {
  async validateUrl(url) {
    try {
      return await ytdl.validateURL(url);
    } catch (error) {
      throw new Error('Invalid YouTube URL');
    }
  }

  async getVideoInfo(url) {
    try {
      const info = await ytdl.getInfo(url);
      
      // Check video duration
      const duration = parseInt(info.videoDetails.lengthSeconds);
      if (duration > config.services.youtube.maxDuration) {
        throw new Error('Video duration exceeds 1 hour limit');
      }

      return info;
    } catch (error) {
      throw new Error(`Failed to get video info: ${error.message}`);
    }
  }

  async getAudioStream(url) {
    try {
      const info = await this.getVideoInfo(url);
      
      return ytdl(url, {
        filter: 'audioonly',
        quality: config.services.youtube.quality,
        format: 'mp3',
      });
    } catch (error) {
      throw new Error(`Failed to get audio stream: ${error.message}`);
    }
  }
}

export default new YouTubeService();