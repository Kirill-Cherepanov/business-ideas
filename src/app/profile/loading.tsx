import Box from '@mui/material/Box';
import Image from 'next/image';

const Loading = () => {
  return (
    <Box width="100vw" display="flex" alignItems="center" justifyContent="center">
      <Image
        src="/assets/icons/loader.svg"
        width={100}
        height={100}
        alt="loader"
        className="object-contain"
      />
    </Box>
  );
};

export default Loading;
