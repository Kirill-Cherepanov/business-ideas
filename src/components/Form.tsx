'use client';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { TIdea } from '@/types/custom';
import { useState } from 'react';

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
  initIdea?: TIdea | null;
  handleSubmit: handleSubmitType;
  handleDelete?: () => void;
};

export function Form({ type, initIdea, handleSubmit, handleDelete }: FormProps) {
  const [submitting, setSubmitting] = useState(false);
  const toggleSubmitting = () => setSubmitting((submitting) => !submitting);

  return (
    <form action={(data) => validateForm(data, handleSubmit, toggleSubmitting)}>
      <label>
        <span>Title</span>
        <input type="text" name="title" id="title" defaultValue={initIdea?.title} />
      </label>

      <label>
        <span>Your idea</span>
        <textarea
          defaultValue={initIdea?.text}
          placeholder="Write your idea here"
          name="text"
          id="text"
          required
        />
      </label>

      <label>
        <span>Tag</span>
        <input type="text" name="tag" id="tag" defaultValue={initIdea?.tag} />
      </label>

      <div>
        <Link href="/">Cancel</Link>
        {handleDelete && <button onClick={handleDelete}>Delete</button>}
        <button type="submit" disabled={submitting}>
          {type}
        </button>
      </div>
    </form>
  );
}
