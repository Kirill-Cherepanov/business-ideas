'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Form } from '@/components';
import { TIdea } from '@/types/custom';
import { editIdea, getIdea } from '@/utils';

const UpdatePrompt = () => {
  const ideaId = useSearchParams().get('id');

  const [idea, setIdea] = useState<TIdea | null>(null);

  const formSumbitHandler = (idea: Omit<TIdea, 'creator'>) => editIdea(ideaId || '', idea);

  useEffect(() => {
    async function getIdeaDetails() {
      if (!ideaId) return;
      const idea = await getIdea(ideaId);
      setIdea(idea);
    }
    getIdeaDetails();
  }, [ideaId]);

  return <Form type="Edit" initIdea={idea} handleSubmit={formSumbitHandler} />;
};

export default UpdatePrompt;
