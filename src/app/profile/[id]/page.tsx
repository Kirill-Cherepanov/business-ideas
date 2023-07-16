'use client';

import { useEffect, useState } from 'react';

import { Profile } from '@/components';
import { useRerender } from '@/hooks';
import { getUserIdeas } from '@/utils';
import { FormattedIdea } from '@/types/custom';

type UserProfileProps = { params: { id: string } };

const UserProfile = ({ params: { id } }: UserProfileProps) => {
  const [fetchCounter, refetch] = useRerender();
  const [ideas, setIdeas] = useState<FormattedIdea[]>([]);
  const username = ideas[0] ? ideas[0].creator.username : '';

  useEffect(() => {
    const fetchIdeas = async () => {
      if (id) setIdeas(await getUserIdeas(id));
    };
    fetchIdeas();
  }, [fetchCounter, id]);

  if (!id) return null;

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional ideas and be inspired by the power of their imagination`}
      ideas={ideas}
      refetch={refetch}
      picture={ideas[0]?.creator.picture || ''}
    />
  );
};

export default UserProfile;
