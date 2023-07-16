import { createIdea } from '@/utils';
import { Form } from '@/components';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Page() {
  return (
    <main>
      <Box marginTop={8} marginBottom={4}>
        <Typography
          component="h2"
          variant="h2"
          sx={{
            background: 'linear-gradient(to right,#f03070, #a60ca6)',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: '900',
          }}
        >
          Create a new idea!
        </Typography>
        <Typography
          marginTop={2}
          variant="h6"
          sx={{
            opacity: 0.75,
          }}
          component="h4"
          maxWidth={700}
        >
          Create and share amazing ideas with the world: let&apos;s improve the world together!
        </Typography>
      </Box>

      <Form type="Create" handleSubmit={createIdea} />
    </main>
  );
}
