import { render } from '@testing-library/react';
import { NextRouter } from 'next/router';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import { ThemeProvider } from '../contexts/ThemeContext';
import { store as defaultStore } from '../store';

const mockRouter: NextRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',
  isLocaleDomain: false,
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isPreview: false,
  isReady: true,
};

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

interface RenderOptions {
  store?: typeof defaultStore;
  router?: Partial<NextRouter>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { store = defaultStore, router }: RenderOptions = {}
) {
  if (router) {
    Object.assign(mockRouter, router);
  }

  const result = render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>
  );

  return {
    ...result,
    router: mockRouter,
  };
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

export function getMockRouter() {
  return mockRouter;
}
