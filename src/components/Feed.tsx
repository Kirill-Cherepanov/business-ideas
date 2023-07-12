import { getIdeas } from '@/functions';
import { IdeaCard } from './IdeaCard';

export async function Feed() {
  const ideas = await getIdeas();

  return (
    <>
      <ul>
        {ideas.map((idea) => (
          <IdeaCard key={String(idea._id)} id={idea._id} {...idea} />
        ))}
      </ul>
    </>
  );
}
