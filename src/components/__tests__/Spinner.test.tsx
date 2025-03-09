import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../__tests__/utils';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('renders default spinner', () => {
    renderWithProviders(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders full screen spinner', () => {
    renderWithProviders(<Spinner fullScreen />);
    expect(screen.getByRole('status').closest('.h-screen')).toBeInTheDocument();
  });
});
