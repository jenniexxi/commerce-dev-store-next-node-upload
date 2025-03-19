import styled from 'styled-components';
import { pxToRem } from '@ui/utils/display';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const ThumbnailList = styled.div`
  display: flex;
  height: 5rem;
  padding: 0.5rem;
  background-color: white;
  overflow-x: auto;
`;

export const Thumbnail = styled.div<{ $selected: boolean }>`
  width: 4rem;
  height: 4rem;
  padding: 0.2rem;
  background-color: ${({ $selected }) => ($selected ? 'red' : 'transparent')};

  img {
    object-fit: cover;
  }
`;
export const ImageViewArea = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  background-color: #f3f4f6;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ViewImage = styled.img<{ $scale: number; $translateX?: number; $translateY?: number }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.2s;
  touch-action: none;
  transform: translate(${(props) => pxToRem(props.$translateX)}, ${(props) => pxToRem(props.$translateY)})
    scale(${(props) => props.$scale});
`;
