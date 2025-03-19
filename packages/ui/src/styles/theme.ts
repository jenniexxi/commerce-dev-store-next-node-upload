'use client';

import { css } from 'styled-components';

export const common = {
  0: '#ffffff',
  100: '#000000',
};

export const neutral = {
  5: '#f6f6f9',
  10: '#e5e5e8',
  20: '#d1d1d5',
  30: '#b0b0b3',
  40: '#888888',
  50: '#6d6d6d',
  60: '#5d5d5d',
  70: '#4f4f4f',
  80: '#454545',
  90: '#3d3d3d',
  95: '#151515',
};
// sample
// const redOrange = {
//   5: '#',
//   10: '#',
//   20: '#',
//   30: '#',
//   40: '#',
//   50: '#',
//   60: '#',
//   70: '#',
//   80: '#',
//   90: '#',
//   95: '#',
// };
export const redOrange = {
  5: '#fff6ed',
  10: '#ffead4',
  20: '#ffd2a8',
  30: '#ffb170',
  40: '#ff8537',
  50: '#ff6e20',
  60: '#f04806',
  70: '#c73307',
  80: '#9e290e',
  90: '#7f250f',
  95: '#450f05',
};
export const yellowGreen = {
  5: '#fcffe5',
  10: '#f7ffc7',
  20: '#eeff95',
  30: '#e0ff63',
  40: '#caf625',
  50: '#a0d70b',
  60: '#8bc104',
  70: '#7cac04',
  80: '#53730c',
  90: '#3f5710',
  95: '#203003',
};
export const red = {
  5: '#fff0f2',
  10: '#ffdde1',
  20: '#ffc1c9',
  30: '#ff95a3',
  40: '#ff596f',
  50: '#ff2643',
  60: '#fc0626',
  70: '#eb001f',
  80: '#af051b',
  90: '#900c1d',
  95: '#50000b',
};
export const green = {
  5: '#f0fdf4',
  10: '#ddfbe6',
  20: '#bdf5ce',
  30: '#89eca9',
  40: '#4eda7c',
  50: '#28c85d',
  60: '#1a9f46',
  70: '#187d3a',
  80: '#186332',
  90: '#16512b',
  95: '#062d15',
};
export const blue = {
  5: '#eef5ff',
  10: '#d9e7ff',
  20: '#bcd5ff',
  30: '#8ebcff',
  40: '#5996ff',
  50: '#2465ff',
  60: '#1b4df5',
  70: '#1439e1',
  80: '#172fb6',
  90: '#192d8f',
  95: '#141d57',
};
export const purple = {
  5: '#f9f5ff',
  10: '#f1e9fe',
  20: '#e5d7fd',
  30: '#d2b7fb',
  40: '#b688f8',
  50: '#9a5bf1',
  60: '#833ae3',
  70: '#6f28c8',
  80: '#5f26a3',
  90: '#562390',
  95: '#330a61',
};
// const blackOpacity = {
//   5: '#0000000D',
//   10: '#0000001A',
//   20: '#00000033',
//   30: '#0000004D',
//   40: '#00000066',
//   50: '#00000080',
//   60: '#00000099',
//   70: '#000000B3',
//   80: '#000000CC',
//   90: '#000000E6',
//   95: '#000000F2',
// };

const whiteOpacity = {
  5: '#ffffff0D',
  10: '#ffffff1A',
  20: '#ffffff33',
  30: '#ffffff4D',
  40: '#ffffff66',
  50: '#ffffff80',
  60: '#ffffff99',
  70: '#ffffffB3',
  80: '#ffffffCC',
  90: '#ffffffE6',
  95: '#ffffffF2',
};

export const colors = {
  primary: '#407df7',
  point_2: '#ff7b00',
  point_3: '#00bdb6',
  point_3_dark: '#006363',
  grey800: '#666666',
  grey600: '#888777',
  grey500: '#aaaaaa',
  grey400: '#cccccc',
  grey200: '#dddddd',
  grey100: '#e8e8e8',
  grey80: '#f2f2f2',
  grey50: '#f8f8f8',
  bg_orange: '#fff8f5',
  bg_mint: '#e7fcfc',
  bg_blue: '#e6f3ff',
  syt_red: '#ff2d21',
  syt_green: '#00c751',
  syt_blue: '#33a3ff',

  // design guide
  black: '#151515',
  white: '#ffffff',
  background1: common[0],
  background2: neutral[5],
  line1: common[0],
  line2: neutral[5],
  line3: neutral[10],
  secondary1: redOrange[60],
  primary1: yellowGreen[30],
  primary2: yellowGreen[50],
  primary_text1: yellowGreen[60],
  primary_text2: yellowGreen[70],
  status_positive: green[70],
  status_danger: red[60],
  status_disabled: neutral[20],
  icon1: common[0],
  icon2: neutral[95],
  icon3: neutral[40],
  icon4: neutral[30],
  text1: common[0],
  text2: whiteOpacity[80],
  text3: neutral[95],
  text4: neutral[80],
  text5: neutral[40],
  text6: neutral[30],
  gradient1: yellowGreen[20],
  gradient2: purple[70],
  gradient3: green[50],
};

export const gradients = {
  gradient_deco1: (angle = 'to right', startPosition = '14.5%', endPosition = '100%') =>
    `linear-gradient(${angle}, ${colors.gradient1} ${startPosition}, rgba(137, 236, 169, 0.8) ${endPosition})`,
  gradient_deco2: `linear-gradient(to right, ${colors.gradient2}, ${colors.gradient3})`,
  // gradient_deco3: `linear-gradient(to right, ${colors.gradient3}, ${colors.gradient2})`,
};

const FontWeight = {
  normal: 400,
  medium: 500,
  semobold: 600,
  bold: 700,
};

export const fonts = {
  body: "'Pretendard', sans-serif",
  display1sb: css`
    font-weight: ${FontWeight.semobold};
    font-size: 4.8rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  display1b: css`
    font-weight: ${FontWeight.bold};
    font-size: 4.8rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  display2sb: css`
    font-weight: ${FontWeight.semobold};
    font-size: 4rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  display2b: css`
    font-weight: ${FontWeight.bold};
    font-size: 4rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  heading1: css`
    font-weight: ${FontWeight.normal};
    font-size: 3.2rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  heading1m: css`
    font-weight: ${FontWeight.medium};
    font-size: 3.2rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  heading1b: css`
    font-weight: ${FontWeight.bold};
    font-size: 3.2rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  heading2: css`
    font-weight: ${FontWeight.normal};
    font-size: 2.4rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  heading2m: css`
    font-weight: ${FontWeight.medium};
    font-size: 2.4rem;
    line-height: 1.4;
    letter-spacing: 0.03rem;
  `,
  heading2b: css`
    font-weight: ${FontWeight.bold};
    font-size: 2.4rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  headline1: css`
    font-weight: ${FontWeight.normal};
    font-size: 2rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  headline1m: css`
    font-weight: ${FontWeight.medium};
    font-size: 2rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  headline1b: css`
    font-weight: ${FontWeight.bold};
    font-size: 2rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  headline2b: css`
    font-weight: ${FontWeight.bold};
    font-size: 1.8rem;
    line-height: 1.4;
    letter-spacing: -0.03rem;
  `,
  body1_normal: css`
    font-weight: ${FontWeight.normal};
    font-size: 1.6rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  body1_normalm: css`
    font-weight: ${FontWeight.medium};
    font-size: 1.6rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  body1_normalb: css`
    font-weight: ${FontWeight.bold};
    font-size: 1.6rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  body1_reading: css`
    font-weight: ${FontWeight.normal};
    font-size: 1.6rem;
    line-height: 1.6;
    letter-spacing: -0.02rem;
  `,
  body1_readingm: css`
    font-weight: ${FontWeight.medium};
    font-size: 1.6rem;
    line-height: 1.6;
    letter-spacing: -0.02rem;
  `,
  body1_readingb: css`
    font-weight: ${FontWeight.bold};
    font-size: 1.6rem;
    line-height: 1.6;
    letter-spacing: -0.02rem;
  `,
  body2_normal: css`
    font-weight: ${FontWeight.normal};
    font-size: 1.4rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  body2_normalm: css`
    font-weight: ${FontWeight.medium};
    font-size: 1.4rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  body2_normalb: css`
    font-weight: ${FontWeight.bold};
    font-size: 1.4rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  body2_reading: css`
    font-weight: ${FontWeight.normal};
    font-size: 1.4rem;
    line-height: 1.6;
    letter-spacing: -0.02rem;
  `,
  body2_readingm: css`
    font-weight: ${FontWeight.medium};
    font-size: 1.4rem;
    line-height: 1.6;
    letter-spacing: -0.02rem;
  `,
  body2_readingb: css`
    font-weight: ${FontWeight.bold};
    font-size: 1.4rem;
    line-height: 1.6;
    letter-spacing: -0.02rem;
  `,
  body3_normal: css`
    font-weight: ${FontWeight.normal};
    font-size: 1.3rem;
    line-height: 1.4;
    letter-spacing: -0.0495rem;
  `,
  body3_normalm: css`
    font-weight: ${FontWeight.medium};
    font-size: 1.3rem;
    line-height: 1.4;
    letter-spacing: -0.0495rem;
  `,
  body3_normalb: css`
    font-weight: ${FontWeight.bold};
    font-size: 1.3rem;
    line-height: 1.4;
    letter-spacing: -0.0495rem;
  `,
  caption1_normal: css`
    font-weight: ${FontWeight.normal};
    font-size: 1.2rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  caption1_normalm: css`
    font-weight: ${FontWeight.medium};
    font-size: 1.2rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  caption1_normalb: css`
    font-weight: ${FontWeight.bold};
    font-size: 1.2rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  caption1_reading: css`
    font-weight: ${FontWeight.normal};
    font-size: 1.2rem;
    line-height: 1.6;
    letter-spacing: -0.02rem;
  `,
  caption1_readingm: css`
    font-weight: ${FontWeight.medium};
    font-size: 1.2rem;
    line-height: 1.6;
    letter-spacing: -0.02rem;
  `,
  caption1_readingb: css`
    font-weight: ${FontWeight.bold};
    font-size: 1.2rem;
    line-height: 1.6;
    letter-spacing: -0.02rem;
  `,
  caption2_normal: css`
    font-weight: ${FontWeight.normal};
    font-size: 1rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  caption2_normalm: css`
    font-weight: ${FontWeight.medium};
    font-size: 1rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
  caption2_normalb: css`
    font-weight: ${FontWeight.bold};
    font-size: 1rem;
    line-height: 1.4;
    letter-spacing: -0.02rem;
  `,
};

export const mixins = {
  ellipsis: (line = 1) => css`
    display: ${line > 1 ? '-webkit-box' : 'block'};
    overflow: hidden;
    white-space: ${line > 1 ? 'normal' : 'nowrap'};
    word-wrap: break-word;
    -webkit-line-clamp: ${line};
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  `,
};

const lightTheme = {
  colors,
  gradients,
  fonts,
  mixins,
};

const theme = {
  lightTheme,
};

export default theme;

export type Theme = typeof lightTheme;
