'use client';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ClaimOrderDetailResp, ClaimType } from 'type/api/claim';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@ui/stores';
import { useGetClaimDetail } from 'hooks/query/claimQuery';
import { MYPAGE_CLAIM_SORT_CODES } from 'type/claims';

import * as S from './ClaimDetail.style';
import { useHeader } from '@ui/hooks';
import { Separator } from '@ui/commons';
import ClaimDetailReason from './components/ClaimDetailReason';
import ClaimDetailPriceInfo from './components/ClaimDetailPriceInfo';
import ClaimDetailSectionItem from './components/ClaimDetailSectionItem';

type Props = { data: ClaimOrderDetailResp; refetch: () => void };
const ClaimDetailClient = ({ data, refetch }: Props) => {
  const [title, setTitle] = useState('');
  const { showModal, hideAllModals } = useModalStore();

  const router = useRouter();

  useEffect(() => {
    if (data.data) {
      const claimType = data?.data.claim.claimTypeEnum.code;
      if (claimType === MYPAGE_CLAIM_SORT_CODES.CANCEL) {
        setTitle('취소 신청내역');
      } else if (claimType === MYPAGE_CLAIM_SORT_CODES.EXCHANGE) {
        setTitle('교환 신청내역');
      } else {
        setTitle('반품 신청내역');
      }
    }
  }, [data]);

  useHeader(title, { showHeader: true });

  useEffect(() => {
    if (data?.success === false) {
      const id = showModal.text(data.error.message, '', {
        rightonClick: () => {
          router.back();
          hideAllModals();
        },
      });
    }
  }, [data]);

  const updateList = () => {
    refetch();
  };

  const getClaimType = () => {
    const claimType = data?.data.claim.claimTypeEnum.code;
    if (claimType === MYPAGE_CLAIM_SORT_CODES.CANCEL) {
      return '취소';
    } else if (claimType === MYPAGE_CLAIM_SORT_CODES.EXCHANGE) {
      return '교환';
    } else {
      return '반품';
    }
  };

  if (!data?.data) return <></>;
  return (
    <S.Container>
      <ClaimDetailSectionItem
        claimInfo={data?.data}
        updateList={updateList}
      />
      <Separator $height={8} />
      <ClaimDetailReason
        claimInfo={data.data}
        title={getClaimType()}
      />
      <Separator $height={8} />
      <ClaimDetailPriceInfo
        claimInfo={data.data}
        title={getClaimType()}
      />
      <Separator $height={8} />
    </S.Container>
  );
};

export default ClaimDetailClient;
