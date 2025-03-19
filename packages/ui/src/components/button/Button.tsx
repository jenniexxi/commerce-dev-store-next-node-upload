'use client';

import { type JSX } from 'react';
import * as S from './Button.style';

/**
 * 버튼의 스타일 타입을 정의하는 타입
 */
export type BtnType = 'primary' | 'secondary' | 'tertiary' | 'text' | 'highlight';

/**
 * 버튼의 크기를 정의하는 타입
 */
export type BtnSize = 'lg' | 'md' | 'sm' | 'xsm';

/**
 * 버튼 컴포넌트의 Props 타입
 */

interface Props {
  /** 버튼의 스타일 타입 */
  btnType?: BtnType;
  /** 클릭 이벤트 핸들러 */
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  /** 버튼에 표시될 텍스트 또는 엘리먼트 */
  title: string | JSX.Element;
  /** 버튼의 크기 */
  size?: BtnSize;
  /** 버튼의 너비 (px) */
  width?: number | '100%';
  /** 좌측 아이콘 */
  leftIcon?: JSX.Element;
  /** 우측 아이콘 */
  rightIcon?: JSX.Element;
  /** 정렬 */
  align?: 'center';
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  className?: string;
  textHighLight?: boolean;
}

/**
 * 공통으로 사용되는 버튼 컴포넌트
 * @param {BtnType} btnType - 버튼의 스타일 타입 (기본값: 'primary')
 * @param {() => void} onClick - 클릭 이벤트 핸들러
 * @param {string | JSX.Element} title - 버튼에 표시될 텍스트 또는 엘리먼트
 * @param {BtnSize} size - 버튼의 크기 (기본값: 'lg')
 * @param {number} width - 버튼의 너비 (px)
 * @param {JSX.Element} leftIcon - 좌측 아이콘
 * @param {JSX.Element} rightIcon - 우측 아이콘()
 * @param {'center'} align - 우측 아이콘()
 * @returns {JSX.Element} 스타일이 적용된 버튼 엘리먼트
 */
const Button = ({
  btnType = 'primary',
  onClick,
  title,
  size = 'lg',
  width,
  leftIcon,
  rightIcon,
  align,
  type = 'button',
  disabled,
  className,
  textHighLight = false,
}: Props) => {
  return (
    <S.Button
      $btnType={btnType}
      $size={size}
      onClick={onClick}
      $width={width}
      $align={align}
      type={type}
      className={className}
      disabled={disabled}
      $textHighLight={textHighLight}
    >
      {leftIcon && (
        <>
          {leftIcon}
          <S.IconDivider />
        </>
      )}
      {title}
      {rightIcon && (
        <>
          <S.IconDivider />
          {rightIcon}
        </>
      )}
    </S.Button>
  );
};

export default Button;
