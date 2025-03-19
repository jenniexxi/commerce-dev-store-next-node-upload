'use client';

import { JSX, ReactNode, useEffect } from 'react';
import { Footer, Header } from '@ui/components';
import { useHeaderStore } from '@ui/stores';
import * as S from './Layout.style';
import { usePathname } from 'next/navigation';

/**
 * 레이아웃 컴포넌트
 * 헤더, 본문 콘텐츠, 푸터를 포함하는 전체 레이아웃 관리
 * 헤더 설정의 상태 관리 및 페이지 간 이동 시 헤더 설정 초기화 처리
 * @returns {JSX.Element} 레이아웃 컴포넌트
 */

// Layout.tsx
export default function Layout({ children }: { children: ReactNode }): JSX.Element {
  const { headerConfig, resetHeader } = useHeaderStore();
  const pathname = usePathname();
  // 푸터를 표시하지 않을 경로 목록
  const noFooterPaths = ['/order/cart'];

  // 현재 경로가 noFooterPaths 배열에 있는지 확인
  const shouldShowFooter = !noFooterPaths.some((path) => pathname.startsWith(path));

  // // TODO: Next에선 제거 필요?
  // const pathname = usePathname();

  // // 페이지 변경 시 헤더 초기화
  // useEffect(() => {
  //   resetHeader();

  //   // 신규 페이지 접근시 스크롤 맨위로
  //   window.scrollTo(0, 0);
  // }, [pathname, resetHeader]);

  return (
    <S.LayoutView>
      <Header {...headerConfig} />
      <S.OutletPart>
        {children}
        {shouldShowFooter && <Footer />}
      </S.OutletPart>
    </S.LayoutView>
  );
}
