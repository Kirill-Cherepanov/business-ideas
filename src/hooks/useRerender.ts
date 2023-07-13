import { useState } from 'react';

export function useRerender(initState: number = 0): [number, () => void] {
  const [rerenderCounter, setRerenderCounter] = useState(initState);
  const rerender = () => setRerenderCounter((counter) => counter + 1);
  return [rerenderCounter, rerender];
}
