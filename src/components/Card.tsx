import React from 'react';
import { Link, useSearchParams } from 'react-router';

import { Person } from '../lib/types';
import { cn } from '../lib/utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleItem } from '../store/slices/selectedItems';

interface CardProps {
  person: Person;
}

const Card: React.FC<CardProps> = ({ person }) => {
  const dispatch = useAppDispatch();
  const [search] = useSearchParams();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const id = person.url.split('/').filter(Boolean).pop() || '';
  const isSelected = Boolean(selectedItems[id]);

  return (
    <div
      className={cn(
        `relative rounded border border-orange-500 bg-orange-50 p-1 transition hover:bg-orange-100 [.dark_&]:bg-orange-900 [.dark_&]:text-white`
      )}
    >
      <div className="absolute top-2 right-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => dispatch(toggleItem(person))}
          className="size-4 cursor-pointer"
        />
      </div>
      <h3 className="text-lg font-semibold">{person.name}</h3>
      <Link
        to={`/${id}/?${search}`}
        className="inline-block text-blue-400 hover:text-blue-500 [.dark_&]:text-blue-500 [.dark_&]:hover:text-blue-400"
      >
        View Details
      </Link>
    </div>
  );
};

export default Card;
