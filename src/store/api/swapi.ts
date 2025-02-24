import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Person } from '../../lib/types';

interface SWAPIResponse {
  count: number;
  results: Person[];
}

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<SWAPIResponse, { search: string; page: number }>({
      query: ({ search, page }) => `people/?search=${search}&page=${page}`,
    }),
    getPerson: builder.query<Person, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = swapiApi;
