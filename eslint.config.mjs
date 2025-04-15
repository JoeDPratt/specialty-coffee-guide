// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import next from 'eslint-plugin-next'; // ✅ Add this

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            prettier,
            next,
        },
        rules: {
            'prettier/prettier': 'warn',

            ...next.configs.recommended.rules,

            // Custom TypeScript rules
            '@typescript-eslint/consistent-type-imports': [
                'warn',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: false,
                },
            ],
        },
    },
];
