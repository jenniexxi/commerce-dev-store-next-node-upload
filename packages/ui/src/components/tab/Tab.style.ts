'use client';

import styled, { css } from 'styled-components';
import { pxToRem } from '@ui/utils/display';

const selectedTab = css`
  /*  background-color: #fff; */
  color: #000;
  font-weight: 700;
  font-size: 1.6rem;
`;
const defaultTab = css`
  /*  background-color: #fff; */
  color: #777;
  font-weight: 400;
  font-size: 1.6rem;
`;

export const TabContainer = styled.div`
  width: 100%;
`;
export const TabItemView = styled.ul<{
  $height?: number;
  $isStickyTab: boolean;
  $tabStyle: 'basic' | 'chip';
}>`
  display: flex;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;

  align-items: center;

  overflow-x: auto; /* 가로 스크롤 허용 */
  white-space: nowrap; /* 내부 요소들이 줄바꿈되지 않도록 설정 */
  -webkit-overflow-scrolling: touch; /*  iOS에서 부드러운 스크롤 지원 */

  /* 스크롤바 숨기기 (선택적) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }

  ${({ $isStickyTab }) =>
    $isStickyTab &&
    css`
      position: fixed;
      top: 0;
    `}

  ${({ $height }) =>
    $height &&
    css`
      height: ${pxToRem($height)};
    `}

    ${({ $tabStyle }) =>
    $tabStyle === 'chip' &&
    css`
      height: 3.6rem;
      margin-bottom: 1.6rem;
    `}
`;

export const TabItem = styled.li<{
  $width?: number;
  $height: number;
  $isFixedWidth: boolean;
  $tabStyle: 'basic' | 'chip';
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $height }) => 'height:' + pxToRem($height - 1) + ';'}
  border-bottom: 1px solid ${({ theme }) => theme.colors.line3};
  ${({ $isFixedWidth, $width }) => {
    if ($isFixedWidth) {
      return css`
        width: ${pxToRem($width)};

        flex-shrink: 0;
      `;
    } else {
      return css`
        flex: 1;
      `;
    }
  }}
  ${({ $tabStyle }) =>
    $tabStyle === 'chip' &&
    css`
      overflow: hidden;
      height: 100%;
      margin-left: 0.4rem;
      border: 1px solid ${({ theme }) => theme.colors.line3};
      border-radius: 2.4rem;
      flex: 0 0 auto;

      &:first-child {
        margin-left: 0;
      }
    `}
`;

export const TabItemLabel = styled.div<{
  $isBottomLineStretch: boolean;
  $isSelected: boolean;
  $tabStyle: 'basic' | 'chip';
}>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 100%;

  ${({ $isBottomLineStretch }) =>
    $isBottomLineStretch &&
    css`
      width: 100%;
    `}
  span {
    ${({ $isSelected }) => ($isSelected ? selectedTab : defaultTab)}
    position: relative;
    margin-top: 0.3rem;
  }
  ${({ theme, $tabStyle }) =>
    $tabStyle === 'chip' &&
    css`
      min-width: 5.6rem;
      padding: 0 1.2rem;

      span {
        margin-top: 0;
        color: ${theme.colors.text3};
        ${theme.fonts.body2_normal}
      }
    `}

  ${({ theme, $tabStyle, $isSelected }) =>
    $tabStyle === 'chip' &&
    $isSelected &&
    css`
      background-color: ${theme.colors.black};

      span {
        color: ${theme.colors.text1};
      }
    `}
`;

export const SelectBorder = styled.div<{ $isSelected: boolean; $tabStyle: 'basic' | 'chip' }>`
  ${({ $tabStyle }) =>
    $tabStyle === 'chip' &&
    css`
      display: none;
    `}

  position: absolute;
  bottom: -0.1rem;
  width: 100%;
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      height: 0.2rem;
      background-color: #000;
    `}
`;
export const NewIcon = styled.div`
  position: absolute;
  top: -0.1rem;
  right: -0.7rem;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.status_danger};
`;

export const TabContent = styled.div<{
  $isStickyTab: boolean;
  $tabViewHeight?: number;
}>`
  overflow-y: auto;
  ${({ $isStickyTab, $tabViewHeight }) =>
    $isStickyTab &&
    css`
      margin-top: ${pxToRem($tabViewHeight)};
    `}
`;
