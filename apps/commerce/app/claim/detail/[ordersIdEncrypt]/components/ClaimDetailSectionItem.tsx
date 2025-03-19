'use client';

import { Button } from '@ui/components';
import { useCancelClaim } from 'hooks/mutate/claimMutation';
import { ClaimOrderDetail } from 'type/api/claim';
import { AllOrderStates } from 'type/claims';

import * as S from './ClaimDetail.style';
import ClaimDetailSectionGoods from './ClaimDetailSectionGoods';

type Props = {
  claimInfo: ClaimOrderDetail;
  updateList: () => void;
};

const ClaimDetailSectionItem = ({ claimInfo, updateList }: Props) => {
  const { mutate } = useCancelClaim(updateList);

  const requestCancelCancel = () => {
    mutate({ type: 'Cancel', orderClaimIdEncrypt: claimInfo.claim.orderClaimIdEncrypt });
  };

  const requestCancelExchange = () => {
    mutate({ type: 'Exchange', orderClaimIdEncrypt: claimInfo.claim.orderClaimIdEncrypt });
  };

  const requestCancelReturn = () => {
    mutate({ type: 'Return', orderClaimIdEncrypt: claimInfo.claim.orderClaimIdEncrypt });
  };

  const renderCalimCancleButton = () => {
    const itemState = claimInfo.goodsList
      .filter(
        (item) =>
          item.itemStatusEnum.code === AllOrderStates.Claim.CA ||
          item.itemStatusEnum.code === AllOrderStates.Claim.EA ||
          item.itemStatusEnum.code === AllOrderStates.Claim.RA,
      )
      .map((item) => item.itemStatusEnum.code)[0];
    if (itemState) {
      switch (itemState) {
        case AllOrderStates.Claim.CA:
          return (
            <Button
              title='취소철회'
              size='xsm'
              btnType='tertiary'
              onClick={requestCancelCancel}
            />
          );
        case AllOrderStates.Claim.EA:
          return (
            <Button
              title='교환철회'
              size='xsm'
              btnType='tertiary'
              onClick={requestCancelExchange}
            />
          );
        case AllOrderStates.Claim.RA:
        default:
          return (
            <Button
              title='반품철회'
              size='xsm'
              btnType='tertiary'
              onClick={requestCancelReturn}
            />
          );
      }
    }
  };

  return (
    <S.ClaimHistorySectionContainer>
      <S.ClaimHistorySectionHeader>
        <div>
          <span>{claimInfo.order.claimRequestDate}</span>
          <span>{claimInfo.order.orderNumber}</span>
        </div>
        {renderCalimCancleButton()}
      </S.ClaimHistorySectionHeader>
      {claimInfo.goodsList.map((item) => (
        <ClaimDetailSectionGoods
          key={item.orderItemIdEncrypt}
          goodsInfo={item}
        />
      ))}
    </S.ClaimHistorySectionContainer>
  );
};

export default ClaimDetailSectionItem;
