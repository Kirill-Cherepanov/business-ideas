'use client';

import { useEffect, useState } from 'react';

import { getIdeas } from '@/utils';
import { IdeaCard } from './IdeaCard';
import { FormattedIdea } from '@/types/custom';
import { useRerender } from '@/hooks';

export function Feed() {
  const [fetchCounter, refetch] = useRerender();
  const [ideas, setIdeas] = useState<FormattedIdea[]>([]);

  useEffect(() => {
    const fetchIdeas = async () => setIdeas(await getIdeas());
    fetchIdeas();
  }, [fetchCounter]);

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
