import type { Person } from '../../lib/types';
import type { BaseQueryResult } from '@reduxjs/toolkit/query';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { mockPerson } from '../../__tests__/utils';
import { renderWithProviders } from '../../__tests__/utils';
import { useGetPersonQuery } from '../../store/api/swapi';
import Details from '../Details';

const navigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: () => ({ personId: '1' }),
    useNavigate: () => navigate,
  };
});

vi.mock('../../store/api/swapi', () => ({
  swapiApi: {
    reducerPath: 'swapiApi',
    reducer: () => ({}),
    middleware: () => () => () => {},
  },
  useGetPersonQuery: vi.fn(),
}));

type QueryResult = BaseQueryResult<Person, { status: number; data: string }>;

describe('Details', () => {
  beforeEach(() => {
    vi.mocked(useGetPersonQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
    } as QueryResult);
    navigate.mockClear();
  });

  it('renders loading state', () => {
    vi.mocked(useGetPersonQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
    } as QueryResult);

    const { container } = renderWithProviders(<Details />);
    expect(container).toMatchSnapshot();
  });

  it('renders person details', () => {
    vi.mocked(useGetPersonQuery).mockReturnValue({
      data: mockPerson,
      isLoading: false,
      isFetching: false,
    } as QueryResult);

    renderWithProviders(<Details />);
    expect(screen.getByText(mockPerson.name)).toBeInTheDocument();
    expect(screen.getByText(mockPerson.gender)).toBeInTheDocument();
  });

  it('handles close button click', async () => {
    vi.mocked(useGetPersonQuery).mockReturnValue({
      data: mockPerson,
      isLoading: false,
      isFetching: false,
    } as QueryResult);

    renderWithProviders(<Details />);
    await userEvent.click(screen.getByRole('button'));
    expect(navigate).toHaveBeenCalled();
  });

  it('handles API error states', () => {
    vi.mocked(useGetPersonQuery).mockReturnValue({
      error: { status: 404, data: 'Not found' },
      isLoading: false,
      isFetching: false,
    } as QueryResult);

    renderWithProviders(<Details />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByRole('definition')).not.toBeInTheDocument();
  });
});
