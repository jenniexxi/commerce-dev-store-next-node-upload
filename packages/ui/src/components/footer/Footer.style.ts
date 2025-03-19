import styled from 'styled-components';

export const Footer = styled.footer`
  margin-top: auto;
  padding: 3.2rem 1.6rem 3rem;
  background-color: ${({ theme }) => theme.colors.background2};

  p {
    margin-top: 0.8rem;
    ${({ theme }) => theme.fonts.body2_normal};
    color: ${({ theme }) => theme.colors.text4};
  }
`;

export const FooterTitle = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text4};
`;

export const SvgIconArrow = styled.i`
  margin-left: 0.4rem;
  font-size: 0;
`;

export const FooterWrap = styled.div`
  &:first-child {
    margin-bottom: 3.2rem;
  }
`;

export const FooterList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  &:nth-child(2) {
    margin: 3.2rem auto 1.2rem;
  }

  li {
    margin-right: 1.5rem;
    ${({ theme }) => theme.fonts.caption1_normal};
    color: ${({ theme }) => theme.colors.text4};

    a {
      ${({ theme }) => theme.fonts.caption1_normal};
      color: ${({ theme }) => theme.colors.text4};
    }
  }
`;
