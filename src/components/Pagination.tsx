import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded border border-gray-300 px-3 py-1 not-disabled:cursor-pointer hover:not-disabled:bg-blue-600 hover:not-disabled:text-white disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded border border-gray-300 px-3 py-1 not-disabled:cursor-pointer hover:not-disabled:bg-blue-600 hover:not-disabled:text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
