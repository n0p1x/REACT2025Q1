import { useState, useEffect, useCallback } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { Person } from './lib/types';
import useStickyState from './hooks/useStickyState';

const App = () => {
  const [searchTerm, setSearchTerm] = useStickyState('', 'searchTerm');
  const [items, setItems] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const fetchData = useCallback(
    (term?: string) => {
      const effectiveTerm = term !== undefined ? term : searchTerm;
      const processedTerm = effectiveTerm.trim();
      const url = `https://swapi.dev/api/people/?search=${processedTerm}`;

      setLoading(true);
      setError(null);

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setItems(data.results);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    },
    [searchTerm]
  );

  useEffect(() => {
    fetchData(searchTerm);
  }, [fetchData, searchTerm]);

  const handleSearch = (newTerm: string): void => {
    const processedTerm = newTerm.trim();
    setSearchTerm(processedTerm);
    fetchData(processedTerm);
  };

  const triggerError = (): void => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test error');
  }

  return (
    <div className="relative mx-auto min-h-screen max-w-screen-lg border border-gray-300 bg-[#f4f3ee] p-8 pb-24">
      <Search initialTerm={searchTerm} onSearch={handleSearch} />
      <Results items={items} loading={loading} error={error} />
      <button
        onClick={triggerError}
        className="absolute right-8 bottom-8 rounded border border-red-600 px-4 py-2 text-red-600 transition hover:bg-red-600 hover:text-white"
      >
        Throw Error
      </button>
    </div>
  );
};

export default App;
