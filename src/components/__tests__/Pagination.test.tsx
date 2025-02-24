import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../__tests__/utils';
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('renders pagination controls', () => {
    renderWithProviders(
      <Pagination currentPage={1} totalPages={10} disabled={false} />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('handles page changes', async () => {
    renderWithProviders(
      <Pagination currentPage={1} totalPages={10} disabled={false} />
    );

    await userEvent.click(screen.getByText('>'));

    const searchParams = new URLSearchParams(window.location.search);
    expect(searchParams.get('page')).toBe('2');
  });

  it('disables previous button on first page', () => {
    renderWithProviders(
      <Pagination currentPage={1} totalPages={10} disabled={false} />
    );
    expect(screen.getByText('<')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    renderWithProviders(
      <Pagination currentPage={10} totalPages={10} disabled={false} />
    );
    expect(screen.getByText('>')).toBeDisabled();
  });

  it('disables all controls when disabled prop is true', () => {
    renderWithProviders(
      <Pagination currentPage={5} totalPages={10} disabled={true} />
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
