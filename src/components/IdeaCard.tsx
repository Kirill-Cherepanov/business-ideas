'use client';

import Image from 'next/image';
import { deleteIdea } from '@/utils/serverFunctions';
import { FormattedIdea } from '@/types/custom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from './Link';

type IdeaCardProps = FormattedIdea & {
  refetch: () => void;
};

export function IdeaCard({ id, title, creator, text, tag, refetch }: IdeaCardProps) {
  const deleteAndRefetch = async () => {
    await deleteIdea(id);
    refetch();
  };

  return (
    <Card>
      <CardContent sx={{ padding: 1 }}>
        <Stack direction="row" spacing={1} alignItems={'center'} padding={0}>
          <Image src={creator.picture} width={30} height={30} alt="Profile picture" />
          <Button component={Link} href={`/profile?id=${creator.id}`}>
            @{creator.username}
          </Button>
        </Stack>

        <Typography gutterBottom variant="h5" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
        <Typography>{tag}</Typography>
      </CardContent>

      <CardActions>
        <Button component={Link} href={`/edit?id=${id}`}>
          Edit
        </Button>
        <Button onClick={deleteAndRefetch}>Delete</Button>
      </CardActions>
    </Card>
  );
}
