import { useEffect, useState } from 'react';

export default function useSearchState(
  key: string,
  defaultValue = ''
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
