// eslint.config.js (ESLint v9+ flat config for Next.js + Tailwind + Prettier)

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from 'eslint-plugin-next';
import tailwind from 'eslint-plugin-tailwindcss';
import prettier from 'eslint-plugin-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  next.configs.recommended,
  {
    plugins: {
      tailwind,
      prettier,
    },
    rules: {
      // TypeScript: prefer import type for types
      '@typescript-eslint/consistent-type-imports': ['warn', {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
      }],

      // Tailwind: catch typos, enforce config usage
      'tailwindcss/no-custom-classname': 'off', // can enable if you want strict naming
      'tailwindcss/classnames-order': 'warn',

      // Prettier formatting
      'prettier/prettier': ['warn'],
    },
  },
];