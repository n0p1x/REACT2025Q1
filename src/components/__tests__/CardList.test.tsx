import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockPerson } from '../../__tests__/utils';
import { renderWithProviders } from '../../__tests__/utils';
import CardList from '../CardList';

describe('CardList', () => {
  it('renders loading state', () => {
    renderWithProviders(<CardList items={[]} loading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    renderWithProviders(<CardList items={[]} loading={false} />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('renders list of cards', () => {
    const items = [mockPerson, { ...mockPerson, url: '2' }];
    renderWithProviders(<CardList items={items} loading={false} />);
    expect(screen.getAllByRole('heading')).toHaveLength(2);
  });
});
