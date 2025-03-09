import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useTheme } from '../ThemeContext';
import { ThemeProvider } from '../ThemeContext';

describe('ThemeContext', () => {
  it('provides default theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    expect(result.current.theme).toBe('light');
  });

  it('toggles theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
  });
});
