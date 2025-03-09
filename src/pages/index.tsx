import { useRouter } from 'next/router';
import { useState } from 'react';

import CardList from '@/components/CardList';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import SelectionFlyout from '@/components/SelectionFlyout';
import ThemeSelector from '@/components/ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';
import useSearchState from '@/hooks/useSearchState';
import { cn } from '@/lib/utils';
import { useGetPeopleQuery } from '@/store/api/swapi';

const HomePage = () => {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  const [searchTerm, setSearchTerm] = useSearchState('searchTerm');
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();

  const { data, isLoading, isFetching } = useGetPeopleQuery({
    search: searchTerm,
    page: currentPage,
  });

  const handleSearch = (newTerm: string): void => {
    const processedTerm = newTerm.trim();
    setSearchTerm(processedTerm);
    router.replace({ query: { page: 1 } });
  };

  const triggerError = (): void => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test error');
  }

  return (
    <div
      className={cn(
        `relative min-h-svh`,
        theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-50'
      )}
    >
      <div className="mx-auto max-w-screen-lg pb-16">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={triggerError}
            className="cursor-pointer rounded border border-red-600 bg-white px-2 py-1 text-red-600 transition hover:bg-red-600 hover:text-white [.dark_&]:border-red-400 [.dark_&]:bg-gray-900 [.dark_&]:text-red-400 [.dark_&]:hover:bg-red-600 [.dark_&]:hover:text-white"
          >
            Throw Error
          </button>
          <ThemeSelector />
        </div>

        <Search initialTerm={searchTerm} onSearch={handleSearch} />

        <div className="mt-1 grid h-10/12 auto-cols-fr grid-flow-col gap-1">
          {data && <CardList items={data.results} loading={isLoading} />}

          {/* <Outlet /> */}
        </div>

        {data && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.count / 10)}
            disabled={isFetching}
          />
        )}
      </div>

      <SelectionFlyout />
    </div>
  );
};

export default HomePage;
