import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { vi } from 'vitest';

import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  key: vi.fn(),
};
globalThis.localStorage = localStorageMock;

globalThis.fetch = vi.fn();

globalThis.URL = {
  ...globalThis.URL,
  createObjectURL: vi.fn(),
  revokeObjectURL: vi.fn(),
} as Partial<typeof globalThis.URL> as typeof globalThis.URL;

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

beforeAll(() => {
  globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

afterAll(() => {
  vi.restoreAllMocks();
});
