import React from 'react';

import { Person } from '../lib/types';
import Card from './Card';
import Spinner from './Spinner';

interface CardListProps {
  items: Person[];
  loading: boolean;
}

const CardList: React.FC<CardListProps> = ({ items, loading }) => {
  return (
    <div className="border border-yellow-500 bg-yellow-50 [.dark_&]:bg-yellow-900">
      {loading ? (
        <Spinner fullScreen />
      ) : items.length > 0 ? (
        <div className="flex flex-col gap-1 p-1">
          {items.map((item) => (
            <Card key={item.url} person={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1 p-1">
          <p>No items found</p>
        </div>
      )}
    </div>
  );
};

export default CardList;
