import { Feed } from '@/components';
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <main>
      <Box marginTop={8} marginBottom={4}>
        <Typography variant="h3" textAlign="center" fontWeight="900" component="h2">
          Discover & Share
        </Typography>
        <Typography
          variant="h3"
          sx={{
            background: 'linear-gradient(to right, #f59e0b, #d97706, #fde047)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            fontWeight: '900',
          }}
        >
          Multi-billion dollar ideas
        </Typography>
        <Typography
          marginTop={1}
          variant="subtitle1"
          sx={{
            opacity: 0.75,
          }}
          component="h4"
          textAlign="center"
          maxWidth={650}
          marginX="auto"
          textTransform="uppercase"
        >
          This is an open-source free-to-use platform to discover, create and share brilliant ideas
          with the world!
        </Typography>
      </Box>

      <Feed />
    </main>
  );
}
