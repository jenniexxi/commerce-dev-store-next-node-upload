import { Suspense } from 'react';
import { ClaimType } from 'type/api/claim';
import ClaimRequest from './ClaimRequest';

// 메타데이터 함수
export async function generateMetadata({ params }: { params: { snsId: string } }) {
  const resolvedParams = await Promise.resolve(params);
  return { title: `${resolvedParams.snsId} 인증` };
}

type ClaimRequestParam = {
  type?: ClaimType;
  orderShippingPriceIdEncrypt: string;
  orderItemIdEncrypt: string[];
  isSelectOrder: boolean;
};
// 페이지 컴포넌트

const ClaimRequestPage = async ({
  params,
  searchParams,
}: {
  params: { ordersIdEncrypt: string };
  searchParams: ClaimRequestParam;
}) => {
  // params와 searchParams를 await로 처리
  const resolvedParams = await Promise.resolve(params);

  const resolvedSearchParams = await Promise.resolve(searchParams);

  const type = resolvedSearchParams.type || 'Cancel';
  const orderShippingPriceIdEncrypt = resolvedSearchParams.orderShippingPriceIdEncrypt || '';
  const orderItemIdEncrypt = resolvedSearchParams.orderItemIdEncrypt || [];
  const isSelectOrder = resolvedSearchParams.isSelectOrder || false;
  const ordersIdEncrypt = resolvedParams.ordersIdEncrypt || '';

  // 클라이언트 컴포넌트로 값 전달
  return (
    <Suspense>
      <ClaimRequest
        type={type}
        orderShippingPriceIdEncrypt={orderShippingPriceIdEncrypt}
        orderItemIdEncrypt={orderItemIdEncrypt}
        isSelectOrder={isSelectOrder}
        ordersIdEncrypt={ordersIdEncrypt}
      />
    </Suspense>
  );
};

export default ClaimRequestPage;
