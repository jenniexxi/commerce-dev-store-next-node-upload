import { Suspense } from 'react';

import ClaimDetailClient from './ClaimDetailClient';
import { useGetClaimDetail } from 'hooks/query/claimQuery';

// 메타데이터 함수
export async function generateMetadata({ params }: { params: { snsId: string } }) {
  const resolvedParams = await Promise.resolve(params);
  return { title: `${resolvedParams.snsId} 인증` };
}

// 페이지 컴포넌트
const ClaimDetail = async ({ params }: { params: { ordersIdEncrypt: string } }) => {
  // params와 searchParams를 await로 처리
  const resolvedParams = await Promise.resolve(params);

  const ordersIdEncrypt = resolvedParams.ordersIdEncrypt || '';

  const { data, refetch } = await useGetClaimDetail(ordersIdEncrypt);

  // 클라이언트 컴포넌트로 값 전달
  if (!data) {
    return null;
  } else {
    return (
      <Suspense>
        <ClaimDetailClient
          data={data}
          refetch={refetch}
        />
      </Suspense>
    );
  }
};

export default ClaimDetail;
