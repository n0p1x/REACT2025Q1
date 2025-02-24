import { configureStore } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { mockPerson } from '../../__tests__/utils';
import { renderWithProviders } from '../../__tests__/utils';
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

  it('renders link to details', () => {
    renderWithProviders(<Card person={mockPerson} />);
    const link = screen.getByText('View Details');
    expect(link).toHaveAttribute('href', '/1/');
  });

  it('maintains selection state from redux store', () => {
    const store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
      preloadedState: {
        selectedItems: {
          items: { '1': mockPerson },
        },
      },
    });

    renderWithProviders(<Card person={mockPerson} />, { store });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
