import { defineConfig } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default defineConfig([
  {
    ignores: ['dist/', 'build/', 'node_modules/', '.husky/', '.git/'],
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
]);
