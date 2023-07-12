import { Document, ObjectId } from 'mongoose';

export type TUser = {
  email: string;
  username: string;
  picture: string;
};

export interface User extends Document, TUser {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  _doc: TUser & {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };
}
