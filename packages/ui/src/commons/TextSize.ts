'use client';

import { pxToRem } from '@ui/utils';
import styled, { css } from 'styled-components';

const FontWeight = {
  normal: 400,
  medium: 500,
  semobold: 600,
  bold: 700,
} as const;

const DefaultText = styled.p<{
  $color?: string;
  $ml?: number;
  $mr?: number;
  $mt?: number;
  $mb?: number;
  $align?: 'center' | 'left' | 'right';
}>`
  color: ${({ theme, $color }) => ($color ? $color : theme.colors.text3)};
  ${({ $ml }) =>
    $ml &&
    css`
      margin-left: ${pxToRem($ml)};
    `}
  ${({ $mr }) =>
    $mr &&
    css`
      margin-right: ${pxToRem($mr)};
    `}
    ${({ $mt }) =>
    $mt &&
    css`
      margin-top: ${pxToRem($mt)};
    `}
    ${({ $mb }) =>
    $mb &&
    css`
      margin-bottom: ${pxToRem($mb)};
    `}
    ${({ $align }) => {
    switch ($align) {
      case 'center':
        return css`
          text-align: center;
        `;
      case 'right':
        return css`
          text-align: right;
        `;
      case 'left':
      default:
        return css`
          text-align: left;
        `;
    }
  }}
`;

const Display1SB = styled(DefaultText)`
  font-weight: ${FontWeight.semobold};
  font-size: 4.8rem;
`;

const Display1B = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 4.8rem;
`;

const Display2SB = styled(DefaultText)`
  font-weight: ${FontWeight.semobold};
  font-size: 4rem;
`;

const Display2B = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 4rem;
`;

const Heading1 = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 3.2rem;
`;

const Heading1M = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 3.2rem;
`;

const Heading1B = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 3.2rem;
`;

const Heading2 = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 2.4rem;
`;

const Heading2M = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 2.4rem;
`;

const Heading2B = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 2.4rem;
`;

const Headline1 = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 2rem;
`;

const Headline1M = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 2rem;
`;

const Headline1B = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 2rem;
`;

const Headline2 = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 1.8rem;
`;

const Headline2M = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 1.8rem;
`;

const Headline2B = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 1.8rem;
`;

const Body1_Normal = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 1.6rem;
  letter-spacing: -0.02em;
`;

const Body1_NormalM = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 1.6rem;
  letter-spacing: -0.02em;
`;

const Body1_NormalB = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 1.6rem;
  letter-spacing: -0.02em;
`;

const Body1_Reading = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 1.6rem;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const Body1_ReadingM = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 1.6rem;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const Body1_ReadingB = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 1.6rem;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const Body2_Normal = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 1.4rem;
  letter-spacing: -0.02em;
`;

const Body2_NormalM = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 1.4rem;
  letter-spacing: -0.02em;
`;

const Body2_NormalB = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 1.4rem;
  letter-spacing: -0.02em;
`;

const Body2_Reading = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 1.4rem;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const Body2_ReadingM = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 1.4rem;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const Body2_ReadingB = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 1.4rem;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const Body3_Normal = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 1.3rem;
  letter-spacing: -0.02em;
`;

const Body3_NormalM = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 1.3rem;
  letter-spacing: -0.02em;
`;

const Body3_NormalB = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 1.3rem;
  letter-spacing: -0.02em;
`;

const Caption1_Normal = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 1.2rem;
  letter-spacing: -0.02em;
`;

const Caption1_NormalM = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 1.2rem;
  letter-spacing: -0.02em;
`;

const Caption1_NormalB = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 1.2rem;
  letter-spacing: -0.02em;
`;

const Caption1_Reading = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 1.2rem;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const Caption1_ReadingM = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 1.2rem;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const Caption1_ReadingB = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 1.2rem;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const Caption2_Normal = styled(DefaultText)`
  font-weight: ${FontWeight.normal};
  font-size: 1rem;
  letter-spacing: -0.02em;
`;

const Caption2_NormalM = styled(DefaultText)`
  font-weight: ${FontWeight.medium};
  font-size: 1rem;
  letter-spacing: -0.02em;
`;

const Caption2_NormalB = styled(DefaultText)`
  font-weight: ${FontWeight.bold};
  font-size: 1rem;
  letter-spacing: -0.02em;
`;

const TextSize = {
  FontWeight,
  Display1SB,
  Display1B,
  Display2SB,
  Display2B,
  Heading1,
  Heading1M,
  Heading1B,
  Heading2,
  Heading2M,
  Heading2B,
  Headline1,
  Headline1M,
  Headline1B,
  Headline2,
  Headline2M,
  Headline2B,
  Body1_Normal,
  Body1_NormalM,
  Body1_NormalB,
  Body1_Reading,
  Body1_ReadingM,
  Body1_ReadingB,
  Body2_Normal,
  Body2_NormalM,
  Body2_NormalB,
  Body2_Reading,
  Body2_ReadingM,
  Body2_ReadingB,
  Body3_Normal,
  Body3_NormalM,
  Body3_NormalB,
  Caption1_Normal,
  Caption1_NormalM,
  Caption1_NormalB,
  Caption1_Reading,
  Caption1_ReadingM,
  Caption1_ReadingB,
  Caption2_Normal,
  Caption2_NormalM,
  Caption2_NormalB,
};

export default TextSize;
