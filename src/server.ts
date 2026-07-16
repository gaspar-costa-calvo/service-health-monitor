import './config/env';
import express from 'express';
import { ENV } from './config/env';
import authRoutes from './modules/auth/auth.routes';
import servicesRoutes from './modules/services/services.routes';
import { errorHandler } from './middleware/errorHandler';
 
const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);

app.use('/api/services', servicesRoutes);

app.use(errorHandler);

app.listen(ENV.PORT, '127.0.0.1', () => console.log(`Server running on port ${ENV.PORT}`));