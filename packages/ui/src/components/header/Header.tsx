'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import CloseButton from '@ui/components/button/CloseButton';
import { useHeaderStore } from '@ui/stores/headerStore';
import webviewbridge from '@ui/utils/webviewbridge';
import IconPageBack from '@ui/svg/ico_page_back.svg';
import * as S from './Header.style';

/**
 * 헤더 컴포넌트 속성 인터페이스
 */
type HeaderProps = {
  showHeader?: boolean;
  showLeftButton?: boolean;
  showTitle?: boolean;
  showRightButton?: boolean;
  title?: string | ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  isStick?: boolean;
  backColor?: string;
};
/**
 * 헤더 컴포넌트
 * 상단에 표시되는 헤더 렌더링
 */

export default function Header({
  showHeader = true,
  showLeftButton = true,
  showTitle = true,
  showRightButton = true,
  title = '',
  leftElement,
  rightElement,
  onLeftClick,
  onRightClick,
  isStick = true,
  backColor,
}: HeaderProps) {
  const { isReady } = useHeaderStore((state) => state);
  const router = useRouter();

  /** 뒤로 가기 핸들러 */
  const handleBack = () => router.back();

  // TODO: 사용 확인 후 처리 필요
  /* const navType = useNavigationType();
  const [_, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(navType === 'PUSH');
  }, [navType]); */

  /** 닫기 핸들러 */
  const handleClose = () => {
    if (window.history.length > 1) {
      // 이전 페이지가 있는 경우
      router.back();
    } else {
      // 이전 페이지가 없는 경우 웹뷰 닫기
      webviewbridge.close();
    }
  };

  /** 왼쪽 엘리먼트 렌더링 함수 */
  const renderLeftElement = () => {
    if (showLeftButton) {
      if (leftElement) {
        return leftElement;
      }
      return (
        <S.BackButton onClick={onLeftClick || handleBack}>
          <IconPageBack
            className='svg'
            width={24}
            height={24}
          />
        </S.BackButton>
      );
    }
    return null;
  };

  /** 오른쪽 엘리먼트 렌더링 함수 */
  const renderRightElement = () => {
    if (!showRightButton) {
      return null;
    }

    // rightElement가 있으면 그것만 렌더링
    return rightElement || <CloseButton onClick={onRightClick || handleClose} />;
  };

  if (!showHeader || !isReady) return null;

  return (
    <S.HeaderContainer
      $isStick={isStick}
      $backColor={backColor}
      $isWebView={webviewbridge.isWebView()}
    >
      <S.LeftSection>{renderLeftElement()}</S.LeftSection>
      <S.TitleWrapper>{showTitle && <S.Title>{title}</S.Title>}</S.TitleWrapper>
      <S.RightSection>{renderRightElement()}</S.RightSection>
    </S.HeaderContainer>
  );
}
