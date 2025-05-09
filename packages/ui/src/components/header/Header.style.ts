import styled from 'styled-components';
import { pxToRem } from '@ui/utils/display';

export const HEADER_HEIGHT = 64;
export const HeaderContainer = styled.header<{ $isStick: boolean; $isWebView: boolean; $backColor?: string }>`
  display: flex;
  position: ${({ $isStick }) => ($isStick ? 'sticky' : 'relative')};
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  height: ${pxToRem(HEADER_HEIGHT)};
  padding: 0 16px;
  background-color: #fff;
  background-color: ${({ $backColor, theme }) => $backColor || theme.colors.white};
  justify-content: space-between;
  align-items: center;
`;

export const LeftSection = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    position: relative;
    margin-left: 1.6rem;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const TitleWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text3};
  font-weight: 700;
  font-size: 1.6rem;
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: -0.32px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
`;

export const CloseButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;
