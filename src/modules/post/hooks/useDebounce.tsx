import { useEffect, useState } from 'react';

const useDebounce = (searchVal: string, delay = 500) => {
  const [debounceVal, setDebounceVal] = useState(searchVal);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceVal(searchVal);
    }, delay);
    return () => clearTimeout(timeout);
  }, [searchVal, delay]);

  return debounceVal;
};
export default useDebounce;
