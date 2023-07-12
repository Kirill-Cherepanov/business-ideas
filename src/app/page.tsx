import Link from 'next/link';

import { IdeaItem } from '@/components';
import { getIdeas } from '@/functions';

export default async function Home() {
  const ideas = await getIdeas();

  return (
    <>
      <header>
        <h1>Ideas</h1>
      </header>
      <main>
        <Link href="/create">Create</Link>
        <ul>
          {ideas.map((idea) => (
            <IdeaItem key={String(idea._id)} id={idea._id} {...idea} />
          ))}
        </ul>
      </main>
    </>
  );
}
