import { FormattedIdea } from '@/types/custom';
import { IdeaCard } from './IdeaCard';

type ProfileProps = {
  name: string;
  desc: string;
  ideas: FormattedIdea[];
  refetch: () => void;
};

export function Profile({ name, desc, ideas, refetch }: ProfileProps) {
  return (
    <section>
      <h1>
        <span>{name} Profile</span>
      </h1>
      <p>{desc}</p>

      <div>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} refetch={refetch} {...idea} />
        ))}
      </div>
    </section>
  );
}
