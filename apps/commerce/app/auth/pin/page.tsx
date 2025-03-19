import { ActionType } from '@ui/hooks/useRRoundPay';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import RequestPin from './components/RequestPin';

const AuthPinRequest = async ({
  searchParams,
}: {
  searchParams: { userActionType?: ActionType; encDeviceSerial?: string; encUserId?: string };
}) => {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const headersList = await headers();
  const token = headersList.get('authorization');
  const headersObject = Object.fromEntries(headersList.entries());

  // 클라이언트 컴포넌트로 값 전달
  return (
    <Suspense>
      <RequestPin
        userActionType={resolvedSearchParams.userActionType || 'requestSetPin'}
        encDeviceSerial={resolvedSearchParams.encDeviceSerial || ''}
        encUserId={resolvedSearchParams.encUserId || ''}
        token={token || ''}
        headersList={headersObject}
      />
    </Suspense>
  );
};

export default AuthPinRequest;
