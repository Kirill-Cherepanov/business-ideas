import { Document, ObjectId } from 'mongoose';
import { FormattedUser, User } from './user.types';

export type TIdea = {
  title: string;
  creator: string;
  text: string;
  tag: string;
};

export interface Idea extends Document, TIdea {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  _doc: TIdea & {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface PopulatedIdea extends Omit<Idea, 'creator'> {
  creator: User;
}

export type FormattedIdea = {
  id: string;
  title: string;
  creator: FormattedUser;
  text: string;
  tag: string;
};
