import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

class GoogleDriveConfig {
  constructor() {
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    this.drive = google.drive({
      version: 'v3',
      auth: this.auth,
    });
  }

  async getFileStream(fileId) {
    try {
      // Verify file metadata first
      const file = await this.drive.files.get({
        fileId,
        fields: 'mimeType, size',
      });

      // Check if file is an audio file
      const allowedMimeTypes = [
        'audio/mpeg',
        'audio/mp4',
        'audio/x-m4a',
        'video/mp4'
      ];

      if (!allowedMimeTypes.includes(file.data.mimeType)) {
        throw new Error('Invalid file type. Only audio files are allowed.');
      }

      // Check file size (100MB limit)
      const maxSize = 100 * 1024 * 1024; // 100MB in bytes
      if (parseInt(file.data.size) > maxSize) {
        throw new Error('File size exceeds 100MB limit.');
      }

      // Get the file stream
      const response = await this.drive.files.get(
        {
          fileId,
          alt: 'media',
        },
        { responseType: 'stream' }
      );

      return response.data;
    } catch (error) {
      if (error.code === 404) {
        throw new Error('File not found or not accessible.');
      }
      throw new Error(`Failed to access Google Drive file: ${error.message}`);
    }
  }

  extractFileId(url) {
    try {
      const regex = /[-\w]{25,}/;
      const match = url.match(regex);
      return match ? match[0] : null;
    } catch (error) {
      throw new Error('Invalid Google Drive URL format.');
    }
  }
}

export default new GoogleDriveConfig();