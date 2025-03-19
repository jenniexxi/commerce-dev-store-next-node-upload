import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import onlyWarn from 'eslint-plugin-only-warn';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  jsxA11y.flatConfigs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        parser: tseslint,
        project: [
          '../../packages/ui/tsconfig.json',
          '../../apps/commerce/tsconfig.json',
          // '../../apps/car-life/tsconfig.json',
          // '../../apps/life/tsconfig.json',
        ],
        ignores: ['eslint.config.mjs'],
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
    },
  },
  {
    files: ['**/*.type.ts', '**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    // 외부 패키지에 대한 overrides
    files: ['**/node_modules/**/*.ts', '**/node_modules/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    plugins: { import: importPlugin },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            ' ./apps/*/tsconfig.json', // 모든 프로젝트의 tsconfig
            './packages/*/tsconfig.json', // 모든 패키지의 tsconfig
          ],
        },
      },
    },
    rules: {
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
      'import/order': [
        'error',
        {
          'groups': [
            'builtin', // Node.js 내장 모듈 (fs, path 등)
            'external', // npm 패키지 (react, lodash 등)
            'internal', // alias import (@/xxx)
            'parent', // 상위 경로 import (../)
            'sibling', // 동일한 경로 import (./)
            'index', // index 파일 import
            'object', // 객체 스타일 import
            'type', // TypeScript 타입 import
          ],
          'pathGroups': [
            {
              pattern: 'next',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next-*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@ui/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'components/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'stores/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'hooks/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'app/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'layouts/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'pages/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'router/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'services/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'styles/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'utils/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'providers/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'apis/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'commons/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'constants/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'type/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'ui/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'assets/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'public/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '^[./]',
              group: 'internal',
              position: 'after',
            },
          ],
          'pathGroupsExcludedImportTypes': [],
          'newlines-between': 'never',
          'alphabetize': { order: 'ignore', caseInsensitive: true },
        },
      ],
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/exports': 'error',
    },
  },
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: false,
        },
      ],
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    ignores: ['dist/**', 'ui/src/**', '.next/**', 'resourceMapper.ts'],
  },
];
