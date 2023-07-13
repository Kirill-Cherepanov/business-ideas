import { createIdea } from '@/utils';
import { getSession } from 'next-auth/react';
import { Form } from '@/components';
import { TIdea } from '@/types/custom';

async function formSumbitHandler(idea: Omit<TIdea, 'creator'>) {
  'use server';

  const session = await getSession();
  createIdea(idea, session);
}

export default function Page() {
  return (
    <main>
      <h1>Create a new idea!</h1>
      <Form type="Create" handleSubmit={formSumbitHandler} />
    </main>
  );
}
