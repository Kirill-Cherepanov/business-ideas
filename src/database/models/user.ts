import { Model, Schema, model, models } from 'mongoose';

import { User as UserInterface } from '@/types/custom';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  picture: {
    type: String,
  },
});

export const User: Model<UserInterface> = models.User || model('User', UserSchema);
