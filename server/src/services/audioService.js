import youtubeService from './youtubeService.js';
import driveService from './driveService.js';
import config from '../config/index.js';

export const processYouTubeUrl = async (url) => {
  try {
    if (!await youtubeService.validateUrl(url)) {
      throw new Error('Invalid YouTube URL');
    }

    return await youtubeService.getAudioStream(url);
  } catch (error) {
    throw new Error(`YouTube processing error: ${error.message}`);
  }
};

export const processDriveUrl = async (url) => {
  try {
    return await driveService.getFileStream(url);
  } catch (error) {
    throw new Error(`Drive processing error: ${error.message}`);
  }
};

export const processLocalFile = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // File validation is handled by middleware
    return file;
  } catch (error) {
    throw new Error(`File processing error: ${error.message}`);
  }
};