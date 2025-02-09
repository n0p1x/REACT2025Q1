import { useState, useCallback, useEffect } from 'react';
import { Person } from '../lib/types';

function useFetchPeople(searchTerm: string) {
  const [items, setItems] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (term?: string) => {
      const effectiveTerm = term !== undefined ? term : searchTerm;
      const processedTerm = effectiveTerm.trim();
      const encodedTerm = encodeURIComponent(processedTerm);
      const url = `https://swapi.dev/api/people/?search=${encodedTerm}`;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data.results);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    fetchData(searchTerm);
    console.log('aaas');
  }, [fetchData, searchTerm]);

  return { items, loading, error };
}

export default useFetchPeople;
