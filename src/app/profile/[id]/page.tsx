'use client';

import { useEffect, useState } from 'react';

import { Profile } from '@/components';
import { useRerender } from '@/hooks';
import { getUserIdeas } from '@/utils';
import { FormattedIdea } from '@/types/custom';
import { useSearchParams } from 'next/navigation';

const UserProfile = () => {
  const userId = useSearchParams().get('id');
  const [fetchCounter, refetch] = useRerender();
  const [ideas, setIdeas] = useState<FormattedIdea[]>([]);
  const username = ideas[0] ? ideas[0].creator.username : '';

  useEffect(() => {
    const fetchIdeas = async () => {
      if (userId) setIdeas(await getUserIdeas(userId));
    };
    fetchIdeas();
  }, [fetchCounter, userId]);

  if (!userId) return null;

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      ideas={ideas}
      refetch={refetch}
    />
  );
};

export default UserProfile;
