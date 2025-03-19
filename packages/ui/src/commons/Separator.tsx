'use client';
import { pxToRem } from '@ui/utils';
import styled, { css } from 'styled-components';

const Separator = styled.div<{ $height: number; $mv?: number }>`
  height: ${({ $height }) => pxToRem($height)};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.line2};
  ${({ $mv }) =>
    $mv &&
    css`
      margin: ${pxToRem($mv)} 0;
    `}
`;

export default Separator;
