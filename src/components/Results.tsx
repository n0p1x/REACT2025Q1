import React from 'react';
import CardList from './CardList';
import { Person } from '../lib/types';

export interface ResultsProps {
  items: Person[];
  loading: boolean;
  error: string | null;
}

const Results: React.FC<ResultsProps> = ({ items, loading, error }) => {
  return (
    <div className="h-[calc(100vh-13rem)] overflow-y-auto border border-gray-300">
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      ) : error ? (
        <div className="p-8 text-center text-red-600">{error}</div>
      ) : (
        <CardList items={items} />
      )}
    </div>
  );
};

export default Results;
