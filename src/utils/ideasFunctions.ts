'use server';

import { Idea, User, connectToDB } from '@/database';
import { FormattedIdea, Idea as IdeaInterface, TIdea } from '@/types/custom';
import { getServerSession } from 'next-auth';

export async function getUser() {
  const session = await getServerSession();

  if (!session?.user.email) return;
  const user = await User.findOne({ email: session.user.email });

  return user;
}

export async function createIdea(idea: Omit<TIdea, 'creator'>) {
  'use server';

  await connectToDB();

  const user = await getUser();
  if (!user) return;

  const newIdea = new Idea({ ...idea, creator: user._id });
  await newIdea.save();
}

export async function getIdea(id: string) {
  'use server';

  await connectToDB();

  const idea = await Idea.findById(id);
  if (!idea) return idea;
  return formatIdea(idea);
}

export async function getIdeas() {
  'use server';

  await connectToDB();

  const ideas = await Idea.find().limit(50);
  return ideas.map((idea) => formatIdea(idea));
}

export async function editIdea(id: string, edited: Omit<TIdea, 'creator'>) {
  'use server';

  await connectToDB();

  const user = await getUser();
  if (!user) return;

  const idea = await Idea.findOne({ _id: id, creator: user._id });
  if (!idea) return;

  idea.text = edited.text;
  idea.title = edited.title;
  idea.tag = edited.tag;

  await idea.save();
}

export async function deleteIdea(id: string) {
  'use server';

  await connectToDB();

  const user = await getUser();
  if (!user) return;

  const idea = await Idea.findOne({ _id: id, creator: user._id });
  if (!idea) return;

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
