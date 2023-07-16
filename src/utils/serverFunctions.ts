'use server';

import { Idea, User, connectToDB } from '@/database';
import {
  FormattedIdea,
  User as UserInterface,
  TIdea,
  FormattedUser,
  PopulatedIdea,
} from '@/types/custom';
import { getServerSession } from 'next-auth';

export async function getUser() {
  const session = await getServerSession();

  if (!session?.user.email) return console.error('No session email: ', session);
  const user = await User.findOne({ email: session.user.email });

  return user;
}

export async function createIdea(idea: Omit<TIdea, 'creator'>) {
  await connectToDB();

  const user = await getUser();
  if (!user) return console.error('No user: ', user);

  const newIdea = new Idea({ ...idea, creator: user._id });
  await newIdea.save();
}

export async function getIdea(id: string) {
  await connectToDB();

  const idea = (await Idea.findById(id).populate('creator')) as PopulatedIdea;
  if (!idea) return idea;
  return formatIdea(idea);
}

export async function getIdeas() {
  await connectToDB();

  const ideas = (await Idea.find().limit(50).populate('creator')) as PopulatedIdea[];

  return ideas.map((idea) => formatIdea(idea));
}

export async function getUserIdeas(userId: string) {
  await connectToDB();

  const ideas = (await Idea.find({ creator: userId }).populate('creator')) as PopulatedIdea[];

  return ideas.map((idea) => formatIdea(idea));
}

export async function searchIdeas(searchText: string) {
  await connectToDB();

  const ideas = (await Idea.find({
    $or: [
      { title: { $regex: searchText, $options: 'i' } },
      { text: { $regex: searchText, $options: 'i' } },
      { tag: { $regex: searchText, $options: 'i' } },
    ],
  })
    .limit(50)
    .populate('creator')) as PopulatedIdea[];

  return ideas.map((idea) => formatIdea(idea));
}

export async function editIdea(id: string, edited: Omit<TIdea, 'creator'>) {
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
  await connectToDB();

  const user = await getUser();
  if (!user) return;

  const idea = await Idea.findOne({ _id: id, creator: user._id });
  if (!idea) return;

  await Idea.findByIdAndDelete(id);
}

const formatIdea = (idea: PopulatedIdea): FormattedIdea => ({
  id: String(idea._id),
  title: idea.title,
  creator: formatUser(idea.creator),
  text: idea.text,
  tag: idea.tag,
});

const formatUser = (user: UserInterface): FormattedUser => ({
  id: String(user._id),
  email: user.email,
  username: user.username,
  picture: user.picture,
});
