import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Person } from '../lib/types';
import { cn } from '../lib/utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleItem } from '../store/slices/selectedItems';

interface CardProps {
  person: Person;
}

const extractIdFromUrl = (url: string) => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : '1';
};

const Card: React.FC<CardProps> = ({ person }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const id = person.url.split('/').filter(Boolean).pop() || '';
  const isSelected = Boolean(selectedItems[id]);
  const currentPage = router.query.page || '1';
  const personId = extractIdFromUrl(person.url);

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
        href={{
          pathname: `/${personId}`,
          query: { page: currentPage },
        }}
        className="text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default Card;
