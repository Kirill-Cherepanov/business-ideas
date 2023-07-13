'use client';

import { getIdeas } from '@/utils';
import { IdeaCard } from './IdeaCard';
import { useEffect, useState } from 'react';
import { FormattedIdea, Idea } from '@/types/custom';

export function Feed() {
  const [ideas, setIdeas] = useState<FormattedIdea[]>([]);

  useEffect(() => {
    async function fetchIdeas() {
      const ideas = await getIdeas();
      setIdeas(ideas);
      console.log(ideas);
    }
    fetchIdeas();
  }, []);

  return (
    <>
      <ul>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} {...idea} />
        ))}
      </ul>
    </>
  );
}
