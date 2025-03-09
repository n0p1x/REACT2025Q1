import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../__tests__/utils';
import { ThemeProvider } from '../../contexts/ThemeContext';
import ThemeSelector from '../ThemeSelector';

describe('ThemeSelector', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return renderWithProviders(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders theme options', () => {
    renderWithTheme(<ThemeSelector />);
    expect(screen.getByLabelText('Light')).toBeChecked();
    expect(screen.getByLabelText('Dark')).not.toBeChecked();
  });

  it('changes theme on selection', async () => {
    renderWithTheme(<ThemeSelector />);
    const darkRadio = screen.getByLabelText('Dark');
    await userEvent.click(darkRadio);
    expect(darkRadio).toBeChecked();
  });

  it('persists theme selection across renders', async () => {
    const { rerender } = renderWithTheme(<ThemeSelector />);
    const darkRadio = screen.getByLabelText('Dark');
    await userEvent.click(darkRadio);

    rerender(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );
    expect(darkRadio).toBeChecked();
  });
});
