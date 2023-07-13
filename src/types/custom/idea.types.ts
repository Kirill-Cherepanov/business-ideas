import { Document, ObjectId } from 'mongoose';

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

export type FormattedIdea = TIdea & {
  id: string;
};
