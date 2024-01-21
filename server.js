import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import cookieParser from 'cookie-parser';
import schedule from 'node-schedule';

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import mountainRouter from './routes/mountainRouter.js';
import updateRouter from './routes/updateRouter.js';
import authRouter from './routes/authRouter.js';
import userRoutes from './routes/userRoutes.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import { scrapeVail } from './scrappers/index.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import { endpoints } from './scrappers/data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(express.json()); //used for post routes for accepting data
app.use(cookieParser()); //103

app.use('/api/', mountainRouter);
app.use('/api/update', updateRouter);
app.use('/api/users', authenticateUser, userRoutes);
app.use('/api/auth', authRouter);

app.use(errorHandlerMiddleware);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
}); //directs user to front end

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

schedule.scheduleJob('24 * * * *', () => {
  endpoints.forEach((item, i) => {
    setTimeout(() => {
      scrapeVail(item);
    }, i * 2000);
  });
});

const port = 5002;

try {
  //new way in es6
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
