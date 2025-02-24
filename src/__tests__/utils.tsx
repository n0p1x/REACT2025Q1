import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { ThemeProvider } from '../contexts/ThemeContext';
import { store as defaultStore } from '../store';

interface RenderOptions {
  store?: typeof defaultStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { store = defaultStore }: RenderOptions = {}
) {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export const mockPerson = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};
