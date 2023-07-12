import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createIdea } from '@/functions';

async function validateForm(data: FormData) {
  'use server';

  const creator = 'Kirill';

  const title = data.get('title')?.valueOf();
  if (typeof title != 'string') return;

  const text = data.get('text')?.valueOf();
  if (typeof text != 'string') return;

  const tag = data.get('tag')?.valueOf();
  if (typeof tag != 'string') return;

  await createIdea({ creator, title, text, tag });
  redirect('/');
}

export default function Page() {
  return (
    <main>
      <h1>Create a new idea!</h1>

      <form action={validateForm}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />

        <label htmlFor="title">Text</label>
        <input type="text" name="text" id="text" />

        <label htmlFor="title">Tag</label>
        <input type="text" name="tag" id="tag" />

        <div>
          <Link href="..">Cancel</Link>
          <button type="submit">Create</button>
        </div>
      </form>
    </main>
  );
}
