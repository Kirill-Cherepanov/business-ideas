'use client';

import { deleteIdea } from '@/functions/todoFunctions';

type IdeaItemProps = {
  id: string;
  title: string;
  creator: string;
  text: string;
  tag: string;
};

export function IdeaItem({ id, title, creator, text, tag }: IdeaItemProps) {
  return (
    <li>
      {/* <button onClick={() => editIdea(id, !complete)}>Edit</button> */}
      <button onClick={() => deleteIdea(id)}>Delete</button>
      {title}
    </li>
  );
}
