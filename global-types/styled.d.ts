import 'styled-components';
import { type Theme } from '../packages/ui/src/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
