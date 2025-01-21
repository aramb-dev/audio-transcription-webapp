import config from '../config/index.js';

export const errorHandler = (err, req, res, next) => {
  // Log the error
  console.error('Error:', err);

  // Determine if we're in development mode
  const isDev = config.isDevelopment;

  // Define error response
  const errorResponse = {
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
      timestamp: config.getCurrentTimestamp()
    }
  };

  // Add stack trace in development mode
  if (isDev) {
    errorResponse.error.stack = err.stack;
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    errorResponse.error.status = 400;
  } else if (err.name === 'UnauthorizedError') {
    errorResponse.error.status = 401;
  }

  res.status(errorResponse.error.status).json(errorResponse);
};

// Handle unhandled rejections and exceptions
export const setupErrorHandling = (app) => {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });
};