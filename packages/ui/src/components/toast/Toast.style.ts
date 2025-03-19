import styled, { keyframes } from 'styled-components';
import { pxToRem } from '@ui/utils/display';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

export const ToastWrapper = styled.div<{ $isClosing: boolean; $bottom: number }>`
  width: 100%;
  margin-bottom: ${({ $bottom }) => pxToRem($bottom)};
  padding: 12px 20px;
  border-radius: 4px;
  background-color: #333;
  color: white;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
`;

export const ToastContainerWrapper = styled.div`
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 20px;
  left: 20px;
  z-index: 300;
  flex-direction: column;
  align-items: flex-end;
`;
