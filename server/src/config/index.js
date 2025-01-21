import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      credentials: true,
    },
  },

  // File upload configuration
  upload: {
    maxFileSize: 100 * 1024 * 1024, // 100MB in bytes
    allowedMimeTypes: [
      'audio/mpeg',
      'audio/mp4',
      'audio/x-m4a',
      'video/mp4'
    ],
    tempDir: path.join(__dirname, '../../temp'),
  },

  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },

  // API timeouts
  timeouts: {
    youtube: 30000, // 30 seconds
    drive: 30000,   // 30 seconds
    upload: 60000,  // 60 seconds
  },

  // External services configuration
  services: {
    youtube: {
      maxDuration: 3600, // 1 hour in seconds
      quality: 'highestaudio',
    },
    drive: {
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    },
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  },

  // Create a function to validate the configuration
  validate() {
    const requiredEnvVars = [
      'GOOGLE_CLIENT_EMAIL',
      'GOOGLE_PRIVATE_KEY',
      'GOOGLE_CLIENT_ID',
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    }

    return this;
  },

  // Get current timestamp in UTC
  getCurrentTimestamp() {
    return new Date().toISOString();
  },

  // Get formatted date for logging
  getFormattedDate() {
    return new Date().toISOString().split('T')[0];
  },

  // Development helpers
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};

// Create temp directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync(config.upload.tempDir)) {
  fs.mkdirSync(config.upload.tempDir, { recursive: true });
}

export default config.validate();