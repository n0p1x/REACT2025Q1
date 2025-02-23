import { useState } from 'react';
import Search from './Search';
import useSearchState from '../hooks/useSearchState';
import useFetchPeople from '../hooks/useFetchPeople';
import { Outlet, useSearchParams } from 'react-router';
import Pagination from './Pagination';
import CardList from './CardList';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [searchTerm, setSearchTerm] = useSearchState('searchTerm');
  const { items, loading, error, totalPages } = useFetchPeople(
    searchTerm,
    currentPage
  );
  const [hasError, setHasError] = useState(false);

  const handleSearch = (newTerm: string): void => {
    const processedTerm = newTerm.trim();
    setSearchTerm(processedTerm);
    setSearchParams({ page: '1' });
  };

  const triggerError = (): void => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test error');
  }

  return (
    <div className="mx-auto h-svh max-w-screen-lg border border-teal-500 bg-teal-50 p-1">
      <div className="flex flex-row items-stretch gap-1 border border-cyan-500 bg-cyan-50 p-1">
        <button className="cursor-pointer rounded border border-pink-600 px-4 py-2 text-pink-600 transition hover:bg-pink-600 hover:text-white">
          Reset
        </button>
        <Search initialTerm={searchTerm} onSearch={handleSearch} />
      </div>

      <div className="mt-1 grid h-10/12 auto-cols-fr grid-flow-col gap-1">
        <CardList items={items} loading={loading} error={error} />

        <Outlet />
      </div>

      {totalPages && (
        <div className="mx-auto mt-1 w-min">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}

      <button
        onClick={triggerError}
        className="absolute right-1 bottom-1 cursor-pointer rounded border border-red-600 bg-white px-4 py-2 text-red-600 transition hover:bg-red-600 hover:text-white"
      >
        Throw Error
      </button>
    </div>
  );
};

export default App;
