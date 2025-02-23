import React from 'react';
import Card from './Card';
import { Person } from '../lib/types';
import Spinner from './Spinner';

interface CardListProps {
  items: Person[];
  loading: boolean;
  error: string | null;
}

const CardList: React.FC<CardListProps> = ({ items, loading, error }) => {
  return (
    <div className="rounded border border-yellow-500 bg-yellow-50">
      {loading ? (
        <Spinner fullScreen />
      ) : error ? (
        <div className="p-8 text-center text-red-600">{error}</div>
      ) : (
        <div className="flex flex-col gap-1 p-1">
          {items.map((item) => (
            <Card key={item.url} name={item.name} url={item.url} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
