import { config as baseConfig } from './base.js';
import reactRefresh from 'eslint-plugin-react-refresh';

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config} */
export const config = [
  ...baseConfig,
  {
    ...reactRefresh.configs.recommended,
    rules: {
      'react-refresh/only-export-components': 'warn',
    },
  },
];
