/* eslint-disable */
import React, { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 1000500) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, [value, delay]);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}
