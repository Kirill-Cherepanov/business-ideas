import mongoose from 'mongoose';

import { DB_URI } from '@/config';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(DB_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
};

export * from './models/idea';
export * from './models/user';
