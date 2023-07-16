'use client';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FormattedIdea, TIdea } from '@/types/custom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTheme } from '@mui/material';

type handleSubmitType = (idea: Omit<TIdea, 'creator'>) => Promise<TIdea | void>;

async function validateForm(
  data: FormData,
  handleSubmit: handleSubmitType,
  toggleSubmitting: () => void
) {
  const title = data.get('title')?.valueOf();
  if (typeof title != 'string') return;

  const text = data.get('text')?.valueOf();
  if (typeof text != 'string') return;

  const tag = data.get('tag')?.valueOf();
  if (typeof tag != 'string') return;

  toggleSubmitting();
  await handleSubmit({ title, text, tag });
  toggleSubmitting();
  redirect('/');
}

type FormProps = {
  type: string;
  initIdea?: FormattedIdea | null;
  handleSubmit: handleSubmitType;
  handleDelete?: () => void;
};

export function Form({ type, initIdea, handleSubmit, handleDelete }: FormProps) {
  const [submitting, setSubmitting] = useState(false);
  const toggleSubmitting = () => setSubmitting((submitting) => !submitting);

  const theme = useTheme();

  return (
    <Box component="form" action={(data) => validateForm(data, handleSubmit, toggleSubmitting)}>
      <Stack spacing={2} marginBottom={2}>
        <TextField
          name="title"
          id="title"
          defaultValue={initIdea?.title}
          label="Title"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Your idea"
          multiline
          defaultValue={initIdea?.text}
          placeholder="Write your idea here"
          name="text"
          id="text"
          required
          minRows={4}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          name="tag"
          id="tag"
          defaultValue={initIdea?.tag}
          label="Tag"
          InputLabelProps={{ shrink: true }}
        />
      </Stack>

      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
        sx={{ width: 'max-content', justifyContent: 'center', display: 'flex', gap: 2 }}
      >
        {/* <Button>Buy</Button>
        <Button>Learn</Button> */}

        <Button component={Link} href="/" sx={{ color: theme.palette.custom.pink }}>
          Cancel
        </Button>
        {handleDelete && (
          <Button onClick={handleDelete} sx={{ color: theme.palette.custom.pink }}>
            Delete
          </Button>
        )}
        <Button type="submit" disabled={submitting} sx={{ color: theme.palette.custom.pink }}>
          {type}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
