import styled, { css } from 'styled-components';

export const TipContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

export const TipTrigger = styled.div`
  display: inline-flex;
  width: 1.6rem;
  color: #838383;
  font-weight: 500;
  font-size: 1.6rem;
  align-items: center;
`;

export const TipTarget = styled.div`
  display: none;
  position: absolute;
  top: 2.5rem;
  right: 0;
  left: 0;
  z-index: 2;
  opacity: 0;
  transition: all 0.3s;

  &.show {
    display: block;
    opacity: 1;
  }

  &.top {
    top: -4rem;

    i {
      transform: rotate(-180deg) translateX(-10px);
      top: auto;
      bottom: -4rem;
    }
  }
`;

export const TipTargetInner = styled.div`
  position: absolute;
  width: 28rem;
  padding: 1.6rem;
  border-radius: 1.2rem;
  text-align: left;
  background: #fff;
  box-shadow: 0 0 8px rgb(21 21 21 / 12%);
`;

export const TipArrow = styled.i<{ $arrowBorderColor?: string; $arrowBackgroundColor?: string }>`
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);

  &::before,
  &::after {
    display: inline-block;
    position: absolute;
    width: 0;
    height: 0;
    color: transparent;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    content: '';
  }

  &::before {
    left: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    ${({ $arrowBorderColor }) => css`
      border-bottom: 6px solid ${$arrowBorderColor || '#e7e7f0'};
    `}
  }

  &::after {
    top: 1px;
    left: 1px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    ${({ $arrowBackgroundColor }) => css`
      border-bottom: 5px solid ${$arrowBackgroundColor || '#fff'};
    `}
  }
`;
