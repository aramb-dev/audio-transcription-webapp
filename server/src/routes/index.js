import express from 'express';
import audioRoutes from './audio.js';
import { rateLimiter } from '../middleware/rateLimiter.js';
import config from '../config/index.js';

const router = express.Router();

// Apply rate limiter to all routes
router.use(rateLimiter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: config.getCurrentTimestamp(),
    version: process.env.npm_package_version,
    environment: config.server.env
  });
});

// Mount routes
router.use('/audio', audioRoutes);

// 404 handler
router.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    timestamp: config.getCurrentTimestamp()
  });
});

export default router;