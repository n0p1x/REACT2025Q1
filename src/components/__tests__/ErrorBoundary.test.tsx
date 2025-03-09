import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../__tests__/utils';
import ErrorBoundary from '../ErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders error message when child component throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    renderWithProviders(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    spy.mockRestore();
  });

  it('renders children when no error occurs', () => {
    renderWithProviders(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
