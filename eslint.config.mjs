import { FlatCompat } from "@eslint/eslintrc";
import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
	...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-compiler/react-compiler': 'error',
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          internalPattern: ['^@/.+'],
          groups: [
            ['type'],
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
            'unknown',
            ['side-effect', 'side-effect-style'],
          ],
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          groupKind: 'types-first',
        },
      ],
      'perfectionist/sort-named-exports': ['error'],
    },
  }
);
