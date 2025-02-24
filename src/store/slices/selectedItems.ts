import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Person } from '../../lib/types';

interface SelectedItemsState {
  items: Record<string, Person>;
}

const initialState: SelectedItemsState = {
  items: {},
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Person>) => {
      const id = action.payload.url.split('/').filter(Boolean).pop() || '';
      if (state.items[id]) {
        state.items = Object.fromEntries(
          Object.entries(state.items).filter(([key]) => key !== id)
        );
      } else {
        state.items[id] = action.payload;
      }
    },
    clearSelection: (state) => {
      state.items = {};
    },
  },
});

export const { toggleItem, clearSelection } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
