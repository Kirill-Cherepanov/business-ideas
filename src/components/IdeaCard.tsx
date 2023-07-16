'use client';

import Image from 'next/image';
import { deleteIdea } from '@/utils/serverFunctions';
import { FormattedIdea } from '@/types/custom';
import { useSession } from 'next-auth/react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { darken, useTheme } from '@mui/material';
import Link from './Link';
import { usePathname } from 'next/navigation';

type IdeaCardProps = FormattedIdea & {
  refetch: () => void;
  handleTagSearch?: (text: string) => void;
};

export function IdeaCard({
  id,
  title,
  creator,
  text,
  tag,
  refetch,
  handleTagSearch,
}: IdeaCardProps) {
  const theme = useTheme();
  const session = useSession().data;
  const color = usePathname().split('/').includes('profile')
    ? theme.palette.custom.blue
    : theme.palette.custom.orange;

  const deleteAndRefetch = async () => {
    await deleteIdea(id);
    refetch();
  };

  return (
    <Card sx={{ padding: 3 }}>
      <CardContent sx={{ padding: '0!important', margin: 0 }}>
        <Stack
          component={Link}
          href={`/profile/${creator.id}`}
          direction="row"
          spacing={1.5}
          alignItems={'center'}
          marginBottom={2}
          sx={{
            textDecorationColor: color,
            '&:hover': { textDecorationColor: darken(color, 0.1) },
          }}
        >
          <Avatar sx={{ width: 30, height: 30 }}>
            <Image src={creator.picture} fill alt="Profile picture" />
          </Avatar>
          <Typography color={color}>@{creator.username}</Typography>
        </Stack>

        <Typography variant="h5" component="h3" fontWeight="600">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paddingY={1}>
          {text}
        </Typography>
        <Typography
          sx={{ cursor: 'pointer' }}
          component="span"
          onClick={(e) => handleTagSearch && handleTagSearch(e.currentTarget.textContent!)}
          color="secondary"
          variant="overline"
        >
          {tag
            .split(' ')
            .map((t) => `#${t}`)
            .join(' ')}
        </Typography>
      </CardContent>

      {session?.user.id && session?.user.id === creator.id && (
        <CardActions sx={{ padding: 0, paddingTop: 1, display: 'flex', justifyContent: 'center' }}>
          <Button component={Link} href={`/edit?id=${id}`} sx={{ color }}>
            Edit
          </Button>
          <Button onClick={deleteAndRefetch} sx={{ color }}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
