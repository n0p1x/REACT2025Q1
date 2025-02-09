import React from 'react';

interface CardProps {
  name: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ name, description }) => {
  return (
    <div className="rounded border-t border-b border-gray-300 bg-white p-4">
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
