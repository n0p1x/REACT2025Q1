import { configureStore } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { mockPerson } from '../../__tests__/utils';
import { renderWithProviders } from '../../__tests__/utils';
import { swapiApi } from '../../store/api/swapi';
import selectedItemsReducer from '../../store/slices/selectedItems';
import Card from '../Card';

describe('Card', () => {
  it('renders card data', () => {
    renderWithProviders(<Card person={mockPerson} />);
    expect(screen.getByText(mockPerson.name)).toBeInTheDocument();
  });

  it('handles selection', async () => {
    renderWithProviders(<Card person={mockPerson} />);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('renders link to details with query params', () => {
    renderWithProviders(<Card person={mockPerson} />, {
      router: {
        query: { page: '2' },
        isReady: true,
      },
    });
    const link = screen.getByText('View Details');
    expect(link).toHaveAttribute('href', '/1?page=2');
  });

  it('maintains selection state from redux store', () => {
    const store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
        [swapiApi.reducerPath]: swapiApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(swapiApi.middleware),
      preloadedState: {
        selectedItems: {
          items: {
            '1': mockPerson,
          },
        },
      },
    });

    renderWithProviders(<Card person={mockPerson} />, { store });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
