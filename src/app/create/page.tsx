import { createIdea } from '@/utils';
import { Form } from '@/components';

export default function Page() {
  return (
    <main>
      <h1>Create a new idea!</h1>
      <Form type="Create" handleSubmit={createIdea} />
    </main>
  );
}
