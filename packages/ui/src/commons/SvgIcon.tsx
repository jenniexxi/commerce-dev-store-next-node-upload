'use client';
import React from 'react';

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  path: string;
  tintColor?: string;
  width?: number;
  height?: number;
};

const SvgIcon = ({ path, tintColor, width = 16, height = 16, style, ...props }: Props) => {
  // 기본 스타일 설정
  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    width: `${width}px`,
    height: `${height}px`,
    backgroundSize: `${width}px ${height}px`,
    backgroundRepeat: 'no-repeat',
    flexShrink: 0,
    ...style,
  };

  // tintColor가 있으면 마스크 이미지로 처리, 없으면 배경 이미지로 처리
  const finalStyle = tintColor
    ? {
        ...baseStyle,
        backgroundColor: tintColor,
        WebkitMaskImage: `url(${path})`,
        maskImage: `url(${path})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        maskSize: '100% 100%',
      }
    : {
        ...baseStyle,
        backgroundImage: `url(${path})`,
      };

  return (
    <i
      style={finalStyle}
      {...props}
    />
  );
};

export default SvgIcon;
