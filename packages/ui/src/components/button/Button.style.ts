import styled, { css } from 'styled-components';
import { fonts } from '@ui/styles/theme';
import { pxToRem } from '@ui/utils/display';
import { BtnSize, BtnType } from './Button';

export const Button = styled.button<{
  $btnType: BtnType;
  $size: BtnSize;
  $width?: number | '100%';
  disabled?: boolean;
  $align?: 'center';
  $textHighLight?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 0 2.4rem;
  min-width: auto;

  ${({ $align }) =>
    $align &&
    css`
      justify-content: ${$align};
    `}

  ${({ $width }) =>
    $width && typeof $width === 'number'
      ? css`
          width: ${pxToRem($width)};
        `
      : css`
          width: ${$width};
        `}
  ${({ $btnType, $size, disabled, theme }) => {
    switch ($btnType) {
      case 'tertiary':
        return css`
          border: 1px solid ${theme.colors?.line3};
          background-color: ${theme.colors?.background1};
          color: ${disabled ? theme.colors?.status_disabled : theme.colors?.text3};
        `;
      case 'secondary':
        return css`
          background-color: ${disabled ? theme.colors?.status_disabled : theme.colors?.background2};
          color: ${disabled ? theme.colors?.text1 : theme.colors?.text3};
        `;
      case 'text':
        return css`
          color: ${theme.colors?.text5};
        `;
      case 'highlight':
        return css`
          background-color: ${theme.colors?.primary1};
          color: ${theme.colors?.text3};
        `;
      case 'primary':
      default:
        return css`
          background-color: ${disabled ? theme.colors?.status_disabled : theme.colors?.text3};
          color: ${$size === 'lg' ? theme.colors?.primary1 : theme.colors?.text1};
          ${disabled &&
          css`
            color: ${theme.colors?.white};
          `};
        `;
    }
  }}
  ${({ $size }) => {
    switch ($size) {
      case 'md':
        return css`
          height: 4.8rem;
          border-radius: 1.2rem;
          ${fonts.body1_normalb};
        `;
      case 'sm':
        return css`
          height: 4.4rem;
          padding: 0 2rem;
          border-radius: 1.2rem;
          ${fonts.body2_normalb};
        `;
      case 'xsm':
        return css`
          height: 3.4rem;
          padding: 0 1.2rem;
          border-radius: 0.8rem;
          ${fonts.body3_normalm};
        `;
      case 'lg':
      default:
        return css`
          height: 5.6rem;
          border-radius: 1.6rem;
          ${fonts.body1_normalb};
        `;
    }
  }}
    ${({ $textHighLight, theme, disabled }) =>
    $textHighLight &&
    css`
      color: ${disabled ? theme.colors?.white : theme.colors?.primary1};
    `}
`;
export const IconDivider = styled.span`
  width: 0.4rem;
`;

export const IconButton = styled.button<{ $size: number }>`
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
  `}
  display:flex;
  align-items: center;
  justify-content: center;
`;

//#region  Two button
export const TwoButtonContainer = styled.div<{ $direction: 'column' | 'row' }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
`;
//#endregion

//close button wrap
export const CloseButton = styled.button<{
  $closeBtnPosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}>`
  ${({ $closeBtnPosition }) => {
    if ($closeBtnPosition) {
      return css`
        position: absolute;
        ${$closeBtnPosition.top !== undefined && `top:${$closeBtnPosition.top}px;`}
        ${$closeBtnPosition.right !== undefined && `right:${$closeBtnPosition.right}px;`}
        ${$closeBtnPosition.bottom !== undefined && `bottom:${$closeBtnPosition.bottom}px;`}
        ${$closeBtnPosition.left !== undefined && `left:${$closeBtnPosition.left}px;`}
      `;
    }
  }}
`;
