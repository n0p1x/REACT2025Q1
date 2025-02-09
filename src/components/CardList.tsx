import React from 'react';
import Card from './Card';
import { Person } from '../lib/types';

interface CardListProps {
  items: Person[];
}

const CardList: React.FC<CardListProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <Card
          key={item.name}
          name={item.name}
          description={`Born in ${item.birth_year}`}
        />
      ))}
    </div>
  );
};

export default CardList;
