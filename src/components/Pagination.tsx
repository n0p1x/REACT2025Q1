import React from 'react';
import { useSearchParams } from 'react-router';

import { cn } from '../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  disabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  disabled,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  return (
    <div className="flex items-center justify-center gap-1 border border-green-500 bg-green-50 p-1 [.dark_&]:bg-green-900">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1 || disabled}
        className="rounded border border-black px-3 py-1 not-disabled:cursor-pointer hover:not-disabled:bg-blue-600 hover:not-disabled:text-white disabled:opacity-50 [.dark_&]:border-white [.dark_&]:not-disabled:hover:bg-blue-600 [.dark_&]:not-disabled:hover:text-white"
      >
        {'<'}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={cn(
            `rounded px-3 py-1 not-disabled:cursor-pointer`,
            currentPage === page
              ? 'border border-blue-600 text-blue-600 [.dark_&]:border-blue-400 [.dark_&]:text-blue-400'
              : 'border border-black not-disabled:hover:bg-blue-600 not-disabled:hover:text-white [.dark_&]:border-white [.dark_&]:not-disabled:hover:bg-blue-400 [.dark_&]:not-disabled:hover:text-white',
            disabled && 'opacity-50'
          )}
          disabled={disabled}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || disabled}
        className="rounded border border-black px-3 py-1 not-disabled:cursor-pointer hover:not-disabled:bg-blue-600 hover:not-disabled:text-white disabled:opacity-50 [.dark_&]:border-white [.dark_&]:not-disabled:hover:bg-blue-600 [.dark_&]:not-disabled:hover:text-white"
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
