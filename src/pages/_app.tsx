import type { AppProps } from 'next/app';

import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import ErrorBoundary from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { store } from '@/store';

import '@/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}
