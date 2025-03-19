import styled, { css } from 'styled-components';
import { pxToRem } from '@ui/utils/display';
// import R from '@ui/utils/resourceMapper';

export const SelectContainer = styled.div<{ $width?: number; $disable: boolean }>`
  position: relative;
  ${({ $width }) =>
    $width
      ? css`
          width: ${pxToRem($width)};
        `
      : css`
          width: 100%;
        `};
  ${({ $disable }) => $disable && css``}
`;

export const Selector = styled.div<{
  $selectedOption: any;
  $isOpen: boolean;
  $disable: boolean;
}>`
  position: relative;
  padding: 0 5.2rem 0 1.6rem;
  min-height: 4.8rem;
  border: 1px solid ${({ theme }) => theme.colors.line3};
  border-radius: 1.2rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.background1};
  color: ${({ theme }) => theme.colors.text4};
  ${({ theme }) => theme.fonts.body1_normal};
  line-height: 4.6rem;

  &::after {
    display: inline-block;
    content: '';
    position: absolute;
    top: 1.5rem;
    right: 1.6rem;

    /* background-image: url(R.svg.icoChevronLeft); */
    ${({ $disable }) =>
      $disable &&
      css`
        filter: invert(69%) sepia(5%) saturate(0%) hue-rotate(0deg) brightness(85%) contrast(89%);
      `}
    background-repeat: no-repeat;
    background-size: 2rem 2rem;
    width: 2rem;
    height: 2rem;

    transform: rotate(270deg);
  }
  ${({ $isOpen, theme }) =>
    $isOpen &&
    css`
      border: 1px solid ${theme.colors.icon2};
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      &::after {
        transform: rotate(90deg);
      }
    `}
  ${({ $disable, theme }) =>
    $disable &&
    css`
      background-color: ${theme.colors.background2};
      color: ${theme.colors.icon4};
    `}
`;

export const OptionContainer = styled.ul`
  position: absolute;
  z-index: 1;
  width: 100%;
  margin-top: -1px;
  border: 1px solid ${({ theme }) => theme.colors.icon2};
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line3};
`;

export const Option = styled.li<{ $disabled?: boolean }>`
  padding: 1.6rem;
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1;
  ${({ $disabled, theme }) =>
    $disabled
      ? css`
          border: 1px solid ${theme.colors.line3};
          background-color: ${theme.colors.background2};
          color: ${theme.colors.grey400};
        `
      : css`
          color: ${theme.colors.black};
        `}
`;

export const OptionSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  span {
    width: 10rem;
  }
`;
