import React from 'react';
import { useSearchParams } from 'react-router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  return (
    <div className="flex items-center justify-center gap-1 border border-green-500 bg-green-50 p-1">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded border border-gray-300 px-3 py-1 not-disabled:cursor-pointer hover:not-disabled:bg-blue-600 hover:not-disabled:text-white disabled:opacity-50"
      >
        {'<'}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`rounded px-3 py-1 not-disabled:cursor-pointer ${
            currentPage === page
              ? 'border border-blue-600 text-blue-600'
              : 'border border-gray-300 hover:bg-blue-600 hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded border border-gray-300 px-3 py-1 not-disabled:cursor-pointer hover:not-disabled:bg-blue-600 hover:not-disabled:text-white disabled:opacity-50"
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
