import { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import useSearchState from './hooks/useSearchState';
import useFetchPeople from './hooks/useFetchPeople';

const App = () => {
  const [searchTerm, setSearchTerm] = useSearchState('searchTerm');
  const { items, loading, error } = useFetchPeople(searchTerm);
  const [hasError, setHasError] = useState(false);

  const handleSearch = (newTerm: string): void => {
    const processedTerm = newTerm.trim();
    setSearchTerm(processedTerm);
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
