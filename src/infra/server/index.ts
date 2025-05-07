import 'reflect-metadata';
import { buildApp } from './app';
import dotenv from 'dotenv';

dotenv.config();

const app = buildApp();
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await app.listen({ port: Number(port), host: '0.0.0.0' });
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();