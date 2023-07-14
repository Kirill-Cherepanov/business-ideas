import { useState } from 'react';

export const useMenuDisclosure = (initial: null | HTMLElement = null) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(initial);

  const open = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const close = () => setAnchor(null);

  return { anchor, open, close };
};
