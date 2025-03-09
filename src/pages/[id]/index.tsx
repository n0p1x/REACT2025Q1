import { useRouter } from 'next/router';
import React from 'react';

import Spinner from '@/components/Spinner';
import { useGetPersonQuery } from '@/store/api/swapi';

const Details: React.FC = () => {
  const router = useRouter();
  const { id, page } = router.query;
  const { data, isLoading, isError } = useGetPersonQuery(id as string);

  if (isLoading) return <Spinner fullScreen />;
  if (isError) return <div>Error loading character details</div>;

  const handleClose = () => {
    router.push({
      pathname: '/',
      query: { page },
    });
  };

  return (
    <div className="relative border border-blue-500 bg-blue-50 p-1 [.dark_&]:bg-blue-900">
      <button
        onClick={handleClose}
        className="absolute top-1 right-1 grid size-5 cursor-pointer content-center p-1 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      {data && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">{data.name}</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 [&_dd]:text-gray-500 [&_dt]:font-semibold [&_dt]:text-gray-900 [.dark_&]:[&_dd]:text-gray-400 [.dark_&]:[&_dt]:text-gray-100">
            <dt>Gender:</dt>
            <dd>{data.gender}</dd>

            <dt>Birth Year:</dt>
            <dd>{data.birth_year}</dd>

            <dt>Height:</dt>
            <dd>{data.height}cm</dd>

            <dt>Mass:</dt>
            <dd>{data.mass}kg</dd>

            <dt>Hair Color:</dt>
            <dd>{data.hair_color}</dd>

            <dt>Eye Color:</dt>
            <dd>{data.eye_color}</dd>

            <dt>Skin Color:</dt>
            <dd>{data.skin_color}</dd>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Details;
