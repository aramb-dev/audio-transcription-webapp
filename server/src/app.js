import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler, setupErrorHandling } from './middleware/errorHandler.js';
import config from './config/index.js';

const app = express();

// Middleware
app.use(morgan(config.logging.format));
app.use(cors(config.server.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);
setupErrorHandling(app);

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${config.server.env}`);
  console.log(`Last updated: ${config.getCurrentTimestamp()}`);
  console.log(`Maintained by: ${process.env.CURRENT_USER || 'aramb-dev'}`);
});

export default app;