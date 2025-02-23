import { useState, useCallback, useEffect } from 'react';
import { Person } from '../lib/types';

function useFetchPerson(searchTerm: string) {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (personId: string) => {
    const url = `https://swapi.dev/api/people/${personId}`;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Person = await response.json();
      setPerson(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(searchTerm);
  }, [fetchData, searchTerm]);

  return { person, loading, error };
}

export default useFetchPerson;
