'use client';
import { ClaimOrderDetail } from 'type/api/claim';
import * as S from './ClaimDetail.style';
import { T } from '@ui/commons';

type Props = {
  claimInfo: ClaimOrderDetail;
  title: string;
};

const ClaimDetailReason = ({ claimInfo, title }: Props) => {
  return (
    <S.Container>
      <T.Body1_NormalB>{title}사유</T.Body1_NormalB>
      <T.Body1_Normal>{claimInfo.claim.claimReasonEnum.codeName}</T.Body1_Normal>
      <T.Body1_Normal>{claimInfo.claim.claimReasonDetail}</T.Body1_Normal>
    </S.Container>
  );
};

export default ClaimDetailReason;
