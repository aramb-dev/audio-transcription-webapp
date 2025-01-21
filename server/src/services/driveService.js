import googleDrive from '../config/googleDrive.js';
import config from '../config/index.js';

class DriveService {
  async getFileStream(url) {
    try {
      const fileId = googleDrive.extractFileId(url);
      if (!fileId) {
        throw new Error('Invalid Google Drive URL');
      }

      return await googleDrive.getFileStream(fileId);
    } catch (error) {
      throw new Error(`Drive service error: ${error.message}`);
    }
  }

  async validateFile(fileId) {
    try {
      const file = await googleDrive.drive.files.get({
        fileId,
        fields: 'size, mimeType',
      });

      const { size, mimeType } = file.data;

      // Validate file size
      if (parseInt(size) > config.upload.maxFileSize) {
        throw new Error(`File size exceeds ${config.upload.maxFileSize / (1024 * 1024)}MB limit`);
      }

      // Validate file type
      if (!config.upload.allowedMimeTypes.includes(mimeType)) {
        throw new Error('Invalid file type. Only audio files are allowed');
      }

      return true;
    } catch (error) {
      throw new Error(`File validation failed: ${error.message}`);
    }
  }
}

export default new DriveService();