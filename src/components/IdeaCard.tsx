'use client';

import { deleteIdea } from '@/utils/ideasFunctions';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

type IdeaCardProps = {
  id: string;
  title: string;
  creator: string;
  text: string;
  tag: string;
  refetch: () => void;
};

export function IdeaCard({ id, title, creator, text, tag, refetch }: IdeaCardProps) {
  const deleteAndRefetch = async () => {
    await deleteIdea(id);
    refetch();
  };

  return (
    <li>
      {/* <button onClick={() => editIdea(id, !complete)}>Edit</button> */}
      <Link href={`/edit?id=${id}`}>Edit</Link>
      <button onClick={deleteAndRefetch}>Delete</button>
      {title}
    </li>
  );
}
