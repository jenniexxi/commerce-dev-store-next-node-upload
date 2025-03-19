'use client';

import { useEffect } from 'react';
import styled from 'styled-components'; // 또는 다른 스타일링 방식 사용

// 스타일 컴포넌트
const OAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

type Props = {
  snsId: string;
  decryptedToken: string;
  fallbackUrl: string;
};

const OAuthRedirectClient = ({ snsId, decryptedToken, fallbackUrl }: Props) => {
  // 앱 스킴 URL 생성
  const createScheme = () => {
    return `rround://onboarding/${snsId}?accessToken=${decryptedToken}`;
  };

  // 단순히 앱 스킴 열기
  const openAppScheme = () => {
    try {
      const scheme = createScheme();

      window.location.href = scheme;
    } catch (error) {
      console.error('Error opening app scheme:', error);
    }
  };

  // 폴백 URL이 있는 경우 앱 스킴 열기
  const openAppSchemeWithFallback = () => {
    const triggerTime = new Date().getTime();
    const fallbackTimeout = 5000; // 5초 후 폴백 URL로 이동

    // 앱 스킴 실행 시도
    window.location.href = createScheme();

    // 타임아웃 설정하여 폴백 URL로 이동
    setTimeout(() => {
      const now = new Date().getTime();
      if (now - triggerTime > fallbackTimeout + 100) {
        // 앱이 실행되었으므로 아무것도 하지 않음
        return;
      }
      // 앱이 실행되지 않았으므로 폴백 URL로 이동
      // 실제 요구사항에 따라 주석 해제
      // if (fallbackUrl) {
      //   window.location.href = fallbackUrl;
      // }
    }, fallbackTimeout);
  };

  // 컴포넌트가 마운트될 때 자동으로 앱 스킴 실행
  useEffect(() => {
    // 토큰이 없으면 처리하지 않음
    if (!decryptedToken) {
      console.error('No token available');
      return;
    }

    // 짧은 지연 후 앱 스킴 열기 (UI가 렌더링될 시간을 주기 위해)
    const timer = setTimeout(() => {
      if (fallbackUrl) {
        openAppSchemeWithFallback();
      } else {
        openAppScheme();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [decryptedToken, fallbackUrl]);

  return <OAuthContainer></OAuthContainer>;
};

export default OAuthRedirectClient;
