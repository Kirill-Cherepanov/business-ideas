'use client';

import { useEffect, useState } from 'react';

import { getIdeas, searchIdeas } from '@/utils';
import { IdeaCard } from './IdeaCard';
import { FormattedIdea } from '@/types/custom';
import { useRerender } from '@/hooks';
import Masonry from '@mui/lab/Masonry';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const DEBOUNCE_TIME = 500;

export function Feed() {
  const [fetchCounter, refetch] = useRerender();
  const [ideas, setIdeas] = useState<FormattedIdea[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const fetchIdeas = async () => setIdeas(await getIdeas());
    fetchIdeas();
  }, [fetchCounter]);

  const handleSearch = (query: string) => {
    clearTimeout(searchTimeout);
    setSearchText(query);

    setSearchTimeout(
      setTimeout(async () => {
        const searchResult = await searchIdeas(query);
        setIdeas(searchResult);
      }, DEBOUNCE_TIME)
    );
  };

  const handleTagSearch = (tagName: string) => handleSearch(tagName);

  return (
    <>
      <Box
        component="form"
        marginBottom={8}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="query"
          label="Query"
          placeholder="Search for a tag or for text contents"
          // variant="outlined"
          value={searchText}
          onChange={(e) => handleSearch(e.currentTarget.value)}
          required
          sx={{ width: 450 }}
        />
      </Box>

      <Masonry spacing={3} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} sx={{ margin: 0 }}>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} refetch={refetch} handleTagSearch={handleTagSearch} {...idea} />
        ))}
      </Masonry>
    </>
  );
}
