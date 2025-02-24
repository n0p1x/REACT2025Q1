import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

import { useGetPersonQuery } from '../store/api/swapi';
import Spinner from './Spinner';

const Details: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { personId = '' } = useParams<{ personId: string }>();
  const { data, isLoading, isFetching } = useGetPersonQuery(personId);

  const handleClose = () => {
    navigate({ pathname: '/', search: searchParams.toString() });
  };

  return (
    <div className="relative border border-blue-500 bg-blue-50 p-1 [.dark_&]:bg-blue-900">
      <button
        onClick={handleClose}
        className="absolute top-1 right-1 grid size-5 cursor-pointer content-center p-1 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      {isLoading ? (
        <Spinner fullScreen />
      ) : data ? (
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            {data.name} {isFetching && '🔍'}
          </h2>
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
      ) : null}
    </div>
  );
};

export default Details;
