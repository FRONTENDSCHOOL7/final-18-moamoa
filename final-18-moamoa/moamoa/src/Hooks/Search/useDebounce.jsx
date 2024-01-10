import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 3000) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, [value, delay]);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debounceValue;
}