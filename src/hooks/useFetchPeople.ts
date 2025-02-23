import { useState, useCallback, useEffect } from 'react';
import { Person } from '../lib/types';

const ITEMS_PER_PAGE = 10;

interface SWAPIResponse {
  count: number;
  results: Person[];
}

function useFetchPeople(searchTerm: string, page: number = 1) {
  const [items, setItems] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>();

  const fetchData = useCallback(
    async (term?: string) => {
      const effectiveTerm = term !== undefined ? term : searchTerm;
      const processedTerm = effectiveTerm.trim();
      const encodedTerm = encodeURIComponent(processedTerm);
      const url = `https://swapi.dev/api/people/?search=${encodedTerm}&page=${page}`;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SWAPIResponse = await response.json();
        setItems(data.results);
        setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
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
    [searchTerm, page]
  );

  useEffect(() => {
    fetchData(searchTerm);
  }, [fetchData, searchTerm, page]);

  return { items, loading, error, totalPages };
}

export default useFetchPeople;
