import { configureStore } from '@reduxjs/toolkit';

import { swapiApi } from './api/swapi';
import selectedItemsReducer from './slices/selectedItems';

export const store = configureStore({
  reducer: {
    [swapiApi.reducerPath]: swapiApi.reducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
