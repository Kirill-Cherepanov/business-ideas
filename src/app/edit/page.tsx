'use client';

import { useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Form } from '@/components';
import { FormattedIdea, TIdea } from '@/types/custom';
import { deleteIdea, editIdea, getIdea } from '@/utils';

const UpdatePrompt = () => {
  const ideaId = useSearchParams().get('id');

  const [idea, setIdea] = useState<FormattedIdea | null>(null);

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
    <>
      <Box marginTop={8} marginBottom={4}>
        <Typography
          component="h2"
          variant="h2"
          sx={{
            background: 'linear-gradient(to right,#f03070, #a60ca6)',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: '900',
          }}
        >
          Edit your idea
        </Typography>
      </Box>

      <Form
        type="Edit"
        initIdea={idea}
        handleSubmit={formSumbitHandler}
        handleDelete={deleteHandler}
      />
    </>
  );
};

export default UpdatePrompt;
