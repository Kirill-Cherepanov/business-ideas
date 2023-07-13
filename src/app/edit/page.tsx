'use client';

import { useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';

import { Form } from '@/components';
import { TIdea } from '@/types/custom';
import { deleteIdea, editIdea, getIdea } from '@/utils';

const UpdatePrompt = () => {
  const ideaId = useSearchParams().get('id');

  const [idea, setIdea] = useState<TIdea | null>(null);

  const formSumbitHandler = (idea: Omit<TIdea, 'creator'>) => editIdea(ideaId || '', idea);
  const deleteHandler = () => {
    deleteIdea(ideaId!);
    redirect('..');
  };

  useEffect(() => {
    async function getIdeaDetails() {
      if (!ideaId) return;
      const idea = await getIdea(ideaId);
      setIdea(idea);
    }
    getIdeaDetails();
  }, [ideaId]);

  if (!ideaId) return null;

  return (
    <Form
      type="Edit"
      initIdea={idea}
      handleSubmit={formSumbitHandler}
      handleDelete={deleteHandler}
    />
  );
};

export default UpdatePrompt;
