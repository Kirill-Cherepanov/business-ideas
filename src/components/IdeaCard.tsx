'use client';

import { deleteIdea } from '@/functions/ideasFunctions';

type IdeaCardProps = {
  id: string;
  title: string;
  creator: string;
  text: string;
  tag: string;
};

export function IdeaCard({ id, title, creator, text, tag }: IdeaCardProps) {
  return (
    <li>
      {/* <button onClick={() => editIdea(id, !complete)}>Edit</button> */}
      <button onClick={() => deleteIdea(id)}>Delete</button>
      {title}
    </li>
  );
}
