import React, { useCallback, useEffect, useRef, useState } from 'react';
import { T } from '@ui/commons';
import SvgIcon from '@ui/commons/SvgIcon';
import { colors } from '@ui/styles/theme';
import R from '@ui/utils/resourceMapper';
import * as S from './NonModalTooltip.style';

export type TooltipItem = string | JSX.Element;

interface Props {
  items?: TooltipItem[];
  title?: string | JSX.Element;
  trigerColor?: string;
  trigerType?: '!' | '?' | 'i';
  className?: string;
  position?: 'left' | 'right' | 'center';
  shouldClose?: boolean;
  showCloseButton?: boolean;
  defaultShown?: boolean;
  withDot?: boolean;
  children?: JSX.Element;
}

const NonModalTooltip = ({
  items,
  title,
  trigerColor = colors.icon4,
  trigerType = 'i',
  className,
  position = 'center',
  shouldClose = true,
  showCloseButton = true,
  defaultShown = false,
  withDot = true,
  children,
}: Props) => {
  const [isShown, setIsShown] = useState(defaultShown);

  const triggerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const toggleTooltip = () => {
    setIsShown((prev) => {
      return !prev;
    });
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isShown || shouldClose) {
      toggleTooltip();
    }
  };

  const handleCloseClick = () => {
    setIsShown(false);
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        shouldClose &&
        isShown &&
        targetRef.current &&
        !targetRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsShown(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isShown, shouldClose, defaultShown]);

  const renderTriggerType = useCallback(() => {
    switch (trigerType) {
      case '!':
        return (
          <SvgIcon
            name={R.svg.icoExclamationCircle}
            tintColor={trigerColor}
          />
        );
      case 'i':
        return (
          <SvgIcon
            name={R.svg.icoInfoCircle}
            tintColor={trigerColor}
          />
        );
      case '?':
      default:
        return (
          <SvgIcon
            name={R.svg.icoQuestionCircle}
            tintColor={trigerColor}
          />
        );
    }
  }, [trigerType]);

  return (
    <S.TipContainer className={className}>
      <S.TipTrigger
        ref={triggerRef}
        onClick={handleTriggerClick}
      >
        {renderTriggerType()}
      </S.TipTrigger>
      {isShown && (
        <S.TipTarget
          ref={targetRef}
          $position={position}
        >
          {title && (
            <S.TitleWrap>
              <T.Body1_NormalB>{title}</T.Body1_NormalB>
            </S.TitleWrap>
          )}
          {items?.map((item, index) => (
            <S.TipTargetInner key={'tooltip' + index}>
              {withDot && <S.Dot />}
              <T.Body2_Normal>{item}</T.Body2_Normal>
            </S.TipTargetInner>
          ))}
          {children}

          {showCloseButton && (
            <S.CloseButton onClick={handleCloseClick}>
              <SvgIcon
                name={R.svg.icoClose}
                width={20}
                height={20}
                tintColor={colors.icon3}
              />
            </S.CloseButton>
          )}
        </S.TipTarget>
      )}
    </S.TipContainer>
  );
};

export default NonModalTooltip;
