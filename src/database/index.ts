import mongoose from 'mongoose';

import { DB_URI } from '@/config';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  if (isConnected) {
    return console.log('MongoDB is already connected');
  }

  try {
    await mongoose.connect(DB_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

export * from './models/idea';
export * from './models/user';
