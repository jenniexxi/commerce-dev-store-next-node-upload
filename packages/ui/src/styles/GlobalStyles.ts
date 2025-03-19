import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  .svg {
    vertical-align: text-top;

    * {
      fill: currentcolor;
      stroke: none;
    }
  }
`;

export default GlobalStyles;
