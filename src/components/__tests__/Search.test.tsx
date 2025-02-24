import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '../../__tests__/utils';
import Search from '../Search';

describe('Search', () => {
  it('renders with initial term', () => {
    renderWithProviders(<Search initialTerm="luke" onSearch={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('luke');
  });

  it('calls onSearch with trimmed value', async () => {
    const onSearch = vi.fn();
    renderWithProviders(<Search initialTerm="" onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, '  luke  ');
    await userEvent.click(screen.getByRole('button'));

    expect(onSearch).toHaveBeenCalledWith('luke');
  });

  it('updates input value when initialTerm changes', () => {
    const { rerender } = renderWithProviders(
      <Search initialTerm="luke" onSearch={() => {}} />
    );

    rerender(<Search initialTerm="leia" onSearch={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('leia');
  });
});
