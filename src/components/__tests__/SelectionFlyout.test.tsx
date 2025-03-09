import { configureStore } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { vi } from 'vitest';

import { mockPerson } from '../../__tests__/utils';
import { renderWithProviders } from '../../__tests__/utils';
import { swapiApi } from '../../store/api/swapi';
import selectedItemsReducer from '../../store/slices/selectedItems';
import SelectionFlyout from '../SelectionFlyout';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      [swapiApi.reducerPath]: swapiApi.reducer,
      selectedItems: selectedItemsReducer,
    },
    preloadedState: {
      selectedItems: {
        items: initialState,
      },
    },
  });
};

describe('SelectionFlyout', () => {
  it('renders selected items count', () => {
    const store = createTestStore({ [mockPerson.url]: mockPerson });
    renderWithProviders(<SelectionFlyout />, { store });
    expect(screen.getByText(/1.*items selected/)).toBeInTheDocument();
  });

  it('handles unselect all action', async () => {
    const store = createTestStore({ [mockPerson.url]: mockPerson });
    renderWithProviders(<SelectionFlyout />, { store });
    await userEvent.click(screen.getByText('Unselect all'));
    const state = store.getState();
    expect(Object.keys(state.selectedItems.items)).toHaveLength(0);
  });

  it('does not render when no items selected', () => {
    const store = createTestStore({});
    renderWithProviders(<SelectionFlyout />, { store });
    expect(screen.queryByText(/items? selected/)).not.toBeInTheDocument();
  });

  it('handles CSV download', async () => {
    const store = createTestStore({ [mockPerson.url]: mockPerson });
    const { router } = renderWithProviders(<SelectionFlyout />, {
      store,
      router: {
        isReady: true,
      },
    });

    const mockClick = vi.fn();
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
      mockClick
    );

    await userEvent.click(screen.getByText('Download'));

    expect(mockClick).toHaveBeenCalled();
    expect(router.replace).not.toHaveBeenCalled();
  });
});
