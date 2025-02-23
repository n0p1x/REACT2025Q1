import React from 'react';
import { Link, useSearchParams } from 'react-router';

interface CardProps {
  name: string;
  url: string;
}

const Card: React.FC<CardProps> = ({ name, url }) => {
  const [search] = useSearchParams();

  const personId = url.split('/').filter(Boolean).pop();

  return (
    <Link
      to={`/${personId}/?${search}`}
      className="cursor-pointer border border-orange-500 bg-orange-50 p-1 transition hover:bg-orange-100"
    >
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
    </Link>
  );
};

export default Card;
