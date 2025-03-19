import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

const ResetStyles = styled.createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  form,
  label,
  table {
    margin: 0;
    padding: 0;
    border: 0;
    color: #151515;
    font-size: 10px;
    vertical-align: baseline;
  }

  body,
  input,
  textarea,
  textarea::placeholder {
    font-family:
      'Pretendard Variable', Pretendard, 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
    background-color: #fff;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    line-height: 1;
    background: transparent;
    cursor: pointer;
  }

  textarea {
    resize: none;
  }

  figure {
    margin: 0;
    padding: 0;
  }
`;

export default ResetStyles;
