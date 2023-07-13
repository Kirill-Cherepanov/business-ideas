'use server';

import { Idea, connectToDB } from '@/database';
import { FormattedIdea, Idea as IdeaInterface, TIdea } from '@/types/custom';
import { Session } from 'next-auth';

export async function createIdea(idea: Omit<TIdea, 'creator'>, session: Session | null) {
  'use server';

  connectToDB();

  const newIdea = new Idea(idea);
  await newIdea.save();
}

export async function getIdea(id: string) {
  'use server';

  connectToDB();

  const idea = await Idea.findById(id);
  if (!idea) return idea;
  return formatIdea(idea);
}

export async function getIdeas() {
  'use server';

  connectToDB();

  const ideas = await Idea.find().limit(50);
  return ideas.map((idea) => formatIdea(idea));
}

export async function editIdea(
  id: string,
  edited: Omit<TIdea, 'creator'>,
  session: Session | null
) {
  'use server';

  connectToDB();

  const idea = await Idea.findById(id);
  if (!idea) return;

  idea.text = edited.text;
  idea.title = edited.title;
  idea.tag = edited.tag;

  await idea.save();
}

export async function deleteIdea(id: string) {
  'use server';

  connectToDB();

  await Idea.findByIdAndDelete(id);
}

function formatIdea(idea: IdeaInterface): FormattedIdea {
  return {
    id: String(idea._id),
    title: idea.title,
    creator: idea.creator,
    text: idea.text,
    tag: idea.tag,
  };
}
