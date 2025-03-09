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
    const { router } = renderWithProviders(
      <Pagination currentPage={1} totalPages={10} disabled={false} />,
      {
        router: {
          query: { page: '1' },
          isReady: true,
        },
      }
    );

    await userEvent.click(screen.getByText('2'));
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '2' },
    });
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

  it('handles invalid page number clicks', async () => {
    const { router } = renderWithProviders(
      <Pagination currentPage={15} totalPages={10} disabled={false} />
    );

    const lastPageButton = screen.getByText('10');
    await userEvent.click(lastPageButton);
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '10' },
    });
  });

  it('handles current page out of bounds', () => {
    renderWithProviders(
      <Pagination currentPage={15} totalPages={10} disabled={false} />
    );
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
