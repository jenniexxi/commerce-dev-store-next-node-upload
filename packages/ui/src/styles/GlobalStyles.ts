import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  .svg {
    * {
      fill: currentcolor;
      stroke: currentcolor;
    }
  }
`;

export default GlobalStyles;
