'use client';

import { deleteIdea } from '@/utils/ideasFunctions';

type IdeaCardProps = {
  id: string;
  title: string;
  creator: string;
  text: string;
  tag: string;
  refetch: () => void;
};

export function IdeaCard({ id, title, creator, text, tag, refetch }: IdeaCardProps) {
  const deleteAndRefetch = () => {
    deleteIdea(id);
    refetch();
  };

  return (
    <li>
      {/* <button onClick={() => editIdea(id, !complete)}>Edit</button> */}
      <button onClick={() => deleteAndRefetch()}>Delete</button>
      {title}
    </li>
  );
}
