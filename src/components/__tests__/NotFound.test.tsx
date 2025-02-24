import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../__tests__/utils';
import NotFound from '../NotFound';

describe('NotFound', () => {
  it('renders not found message', () => {
    renderWithProviders(<NotFound />);
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toHaveTextContent('404');
    expect(headings[1]).toHaveTextContent('Page Not Found');
  });
});
