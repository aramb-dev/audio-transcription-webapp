import rateLimit from 'express-rate-limit';
import config from '../config/index.js';

export const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: Math.ceil(config.rateLimit.windowMs / 1000 / 60), // minutes
    timestamp: config.getCurrentTimestamp()
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Store configuration could be added here for production
  // store: new RedisStore({...})
});

// Specific limiter for file uploads
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 uploads per hour
  message: {
    error: 'Upload limit exceeded. Please try again later.',
    retryAfter: 60, // minutes
    timestamp: config.getCurrentTimestamp()
  }
});