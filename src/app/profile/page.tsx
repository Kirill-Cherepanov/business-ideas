'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Profile } from '@/components';
import { useRerender } from '@/hooks';
import { getUserIdeas } from '@/utils';
import { FormattedIdea } from '@/types/custom';

const MyProfile = () => {
  const session = useSession().data;
  const [fetchCounter, refetch] = useRerender();
  const [ideas, setIdeas] = useState<FormattedIdea[]>([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      if (session?.user.id) setIdeas(await getUserIdeas(session?.user.id));
    };
    fetchIdeas();
  }, [fetchCounter, session?.user.id]);

  if (!session?.user) return null;

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional 
            ideas and inspire others with the power of your imagination"
      picture={session.user.image}
      ideas={ideas}
      refetch={refetch}
    />
  );
};

export default MyProfile;
