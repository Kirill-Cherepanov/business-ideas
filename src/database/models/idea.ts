import { Model, Schema, model, models } from 'mongoose';

import { Idea as IdeaInterface } from '@/types/custom';

const IdeaSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required.'],
  },
  text: {
    type: String,
    required: [true, 'Idea is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

export const Idea: Model<IdeaInterface> = models.Idea || model('Idea', IdeaSchema);
