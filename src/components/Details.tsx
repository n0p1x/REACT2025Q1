import React from 'react';
import { useNavigate, useParams } from 'react-router';
import Spinner from './Spinner';
import useFetchPerson from '../hooks/useFetchPerson';

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { personId } = useParams<{ personId: string }>();
  const { person, loading, error } = useFetchPerson(personId);

  const handleClose = () => {
    navigate({ pathname: '/' });
  };

  if (!person) {
    return null;
  }

  return (
    <div className="relative border border-blue-500 bg-blue-50 p-1">
      <button
        onClick={handleClose}
        className="absolute top-1 right-1 grid size-5 cursor-pointer content-center p-1 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      {loading ? (
        <Spinner fullScreen />
      ) : error ? (
        <div className="p-8 text-center text-red-600">{error}</div>
      ) : (
        <div>
          <h2 className="mb-4 text-2xl font-bold">{person.name}</h2>
          <dl className="[&_dd]:inline [&_dd]:text-gray-500 [&_dt]:font-semibold [&_dt]:text-gray-900">
            <dt>Gender:</dt>
            <dd>{person.gender}</dd>

            <dt>Birth Year:</dt>
            <dd>{person.birth_year}</dd>

            <dt>Height:</dt>
            <dd>{person.height}cm</dd>

            <dt>Mass:</dt>
            <dd>{person.mass}kg</dd>

            <dt>Hair Color:</dt>
            <dd>{person.hair_color}</dd>

            <dt>Eye Color:</dt>
            <dd>{person.eye_color}</dd>

            <dt>Skin Color:</dt>
            <dd>{person.skin_color}</dd>
          </dl>
        </div>
      )}
    </div>
  );
};

export default Details;
