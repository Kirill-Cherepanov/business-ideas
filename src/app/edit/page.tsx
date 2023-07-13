'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Form } from '@/components';
import { TIdea } from '@/types/custom';
import { editIdea, getIdea } from '@/utils';
import { getSession } from 'next-auth/react';

const formSumbitHandler = (id: string) => async (idea: Omit<TIdea, 'creator'>) => {
  const session = await getSession();
  editIdea(id, idea, session);
};

const UpdatePrompt = () => {
  const ideaId = useSearchParams().get('id');

  const [idea, setIdea] = useState<TIdea | null>(null);

  useEffect(() => {
    async function getIdeaDetails() {
      if (!ideaId) return;
      const idea = await getIdea(ideaId);
      setIdea(idea);
    }
    getIdeaDetails();
  }, [ideaId]);

  return <Form type="Edit" initIdea={idea} handleSubmit={formSumbitHandler(ideaId || '')} />;
};

export default UpdatePrompt;
