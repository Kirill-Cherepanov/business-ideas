'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Profile } from '@/components';
import { useRerender } from '@/hooks';
import { getIdeas } from '@/utils';
import { FormattedIdea } from '@/types/custom';

const MyProfile = () => {
  const session = useSession().data;
  const [fetchCounter, refetch] = useRerender();
  const [ideas, setIdeas] = useState<FormattedIdea[]>([]);

  useEffect(() => {
    const fetchIdeas = async () => setIdeas(await getIdeas());
    fetchIdeas();
  }, [fetchCounter]);

  if (!session?.user) return null;

  return (
    <Profile
      name={session.user.name}
      desc="Welcome to your personalized profile page. Share your exceptional 
            prompts and inspire others with the power of your imagination"
      ideas={ideas}
      refetch={refetch}
    />
  );
};

export default MyProfile;
