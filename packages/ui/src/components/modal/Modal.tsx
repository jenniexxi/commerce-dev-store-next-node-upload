'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { T } from '@ui/commons';
//import SvgIcon from '@ui/commons/SvgIcon';
import CloseButton from '@ui/components/button/CloseButton';
import useWindowDimensions from '@ui/hooks/useWindowDimensions';
// import R from '@ui/utils/resourceMapper';
import * as S from './Modal.style';
import { ModalTypes } from './Modal.type';

interface Props {
  onClickBackDrop?: () => void;
  children?: React.ReactNode;
  type?: ModalTypes;
  isAnimation?: boolean;
  showCloseBtn?: boolean;
  isEnableBackDropHide?: boolean;
  backDropAnimation?: boolean;
  closeBtnPosition?: { top: number; right: number; size: number };
  radius?: number;
  onHide: () => void;
  backDropColor?: string;
  zIndex?: number;
  bottomTitle?: string;
}

export type ModalProps = Props & {};

const Modal = ({
  children = <></>,
  onClickBackDrop,
  type = 'center',
  isAnimation = true,
  showCloseBtn = true,
  isEnableBackDropHide = true,
  backDropAnimation = false,
  radius = 20,
  closeBtnPosition = { top: 5, right: 10, size: 32 },
  backDropColor,
  onHide,
  zIndex = 100,
  bottomTitle,
}: Props) => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      isEnableBackDropHide && onHide();
      onClickBackDrop && onClickBackDrop();
    }
  };

  const handleClose = () => {
    onHide();
  };

  return createPortal(
    <S.BackDrop
      onClick={handleBackdropClick}
      $isAnimation={backDropAnimation}
      $backDropColor={backDropColor}
      $zIndex={zIndex}
    >
      <S.ModalView
        type={type}
        $isAnimated={isAnimation}
      >
        <S.ChildView
          $width={width}
          type={type}
          $radius={radius}
        >
          {type === 'bottomSheet' && (
            <S.BottomHeader>
              <T.Headline2B>{bottomTitle}</T.Headline2B>
              {showCloseBtn && (
                <button onClick={handleClose}>
                  {/* <SvgIcon
                    width={24}
                    height={24}
                    name={R.svg.icoClose}
                  /> */}
                </button>
              )}
            </S.BottomHeader>
          )}
          {children}
        </S.ChildView>
        {type !== 'bottomSheet' && showCloseBtn && (
          <S.CloseBtn $closeBtnPosition={closeBtnPosition}>
            <CloseButton
              onClick={handleClose}
              size={closeBtnPosition.size}
            />
          </S.CloseBtn>
        )}
      </S.ModalView>
    </S.BackDrop>,
    document.body,
  );
};

export default Modal;
