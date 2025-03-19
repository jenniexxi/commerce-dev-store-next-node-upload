import crypto from 'utils/crypto';
import OAuthRedirectClient from './components/OAuthRedirectClient';
import { Suspense } from 'react';

// 메타데이터 함수
export async function generateMetadata({ params }: { params: { snsId: string } }) {
  const resolvedParams = await Promise.resolve(params);
  return { title: `${resolvedParams.snsId} 인증` };
}

// 페이지 컴포넌트
const AuthRedirect = async ({
  params,
  searchParams,
}: {
  params: { snsId: string };
  searchParams: { accessToken?: string };
}) => {
  // params와 searchParams를 await로 처리
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const snsId = resolvedParams.snsId || 'google';
  const encryptedToken = resolvedSearchParams.accessToken?.replaceAll(' ', '+') || '';

  let decryptedToken = '';

  try {
    // 서버 측에서 암호화된 토큰 복호화
    decryptedToken = (await crypto.decryptWithExtractedIV(encryptedToken)) as string;
  } catch (error) {
    console.error('서버에서 토큰 복호화 중 오류:', error);
  }

  // 클라이언트 컴포넌트로 값 전달
  return (
    <Suspense fallback={<div>{snsId} 인증중...</div>}>
      <OAuthRedirectClient
        snsId={snsId}
        decryptedToken={decryptedToken}
        fallbackUrl='https://www.balso.io/#sec07'
      />
    </Suspense>
  );
};

export default AuthRedirect;
