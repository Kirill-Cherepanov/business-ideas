'use client';

import { useEffect, useState } from 'react';

import { getIdeas } from '@/utils';
import { IdeaCard } from './IdeaCard';
import { FormattedIdea } from '@/types/custom';

export function Feed() {
  const [fetchCounter, setFetchCounter] = useState(1);
  const [ideas, setIdeas] = useState<FormattedIdea[]>([]);
  const refetch = () => setFetchCounter((counter) => counter + 1);

  useEffect(() => {
    const fetchIdeas = async () => setIdeas(await getIdeas());
    fetchIdeas();
  }, [fetchCounter]);

  console.log(ideas);
  return (
    <>
      <ul>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} refetch={refetch} {...idea} />
        ))}
      </ul>
    </>
  );
}
