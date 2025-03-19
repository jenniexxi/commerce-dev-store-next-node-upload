import styled, { css } from 'styled-components';
import { neutral } from '@ui/styles/theme';

export const TipContainer = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 0.4rem;
`;

export const TipTrigger = styled.div`
  display: inline-flex;
  width: 1.6rem;
  height: 1.6rem;
  color: #838383;
  font-weight: 500;
  font-size: 1.6rem;
  align-items: center;
`;

export const TipTarget = styled.div<{ $position: 'center' | 'right' | 'left' }>`
  position: absolute;
  z-index: 2;
  width: 28rem;
  margin-top: 8px;
  padding: 1.6rem;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ $position }) => {
    switch ($position) {
      case 'left':
        return css`
          left: 0;
        `;
      case 'right':
        return css`
          right: 0;
        `;
      case 'center':
      default:
        return css`
          left: calc((100% - 280px) / 2);
        `;
    }
  }}

  transition: all 0.3s;

  box-shadow: 0 0 8px rgb(15 15 15 / 10%);
`;
export const TitleWrap = styled.div`
  height: 2.2rem;
  margin-bottom: 1.2rem;

  p {
    height: 2.2rem;
    line-height: 2.2rem;
  }
`;
export const Dot = styled.i`
  width: 0.4rem;
  height: 0.4rem;
  margin-top: 0.45rem;
  margin-right: 0.8rem;
  border-radius: 0.2rem;
  background-color: ${neutral[20]};
  flex-shrink: 0;
`;
export const TipTargetInner = styled.div`
  display: flex;
  margin-top: 4px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`;
