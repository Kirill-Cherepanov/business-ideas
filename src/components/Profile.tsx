import { FormattedIdea } from '@/types/custom';
import { IdeaCard } from './IdeaCard';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

type ProfileProps = {
  name: string;
  desc: string;
  picture?: string;
  ideas: FormattedIdea[];
  refetch: () => void;
};

export function Profile({ name, desc, ideas, picture, refetch }: ProfileProps) {
  return (
    <Box component="section" marginTop={8}>
      <Stack spacing={4} direction="row" alignItems="center">
        <Avatar sx={{ width: 48, height: 48, position: 'relative', top: 3 }}>
          <Image src={picture || ''} alt="Profile picture" fill></Image>
        </Avatar>
        <Typography
          component="h2"
          variant="h2"
          sx={{
            background: 'linear-gradient(to right,#096a90, #0de6d4)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            fontWeight: '900',
          }}
        >
          {name} profile
        </Typography>
      </Stack>

      <Typography
        marginTop={2}
        marginBottom={8}
        variant="h6"
        sx={{
          opacity: 0.75,
        }}
        component="h4"
        maxWidth={700}
      >
        {desc}
      </Typography>

      <Stack spacing={2}>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} refetch={refetch} {...idea} />
        ))}
      </Stack>
    </Box>
  );
}
