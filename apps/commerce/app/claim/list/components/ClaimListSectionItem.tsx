'use client';

import { forwardRef } from 'react';

import * as S from './ClaimListComponents.style';
import { ClaimListContent } from 'type/api/claim';

import { AllOrderStates, MYPAGE_CLAIM_SORT_CODES } from 'type/claims';
import { Button } from '@ui/components';
import IcoChevronRight from '@ui/svg/ico_chevron_right.svg';
import { useCancelClaim } from 'hooks/mutate/claimMutation';
import ClaimListSectionGoods from './ClaimListSectionGoods';
import navigate from 'utils/navigate';

type Props = {
  content: ClaimListContent;
  updateList: () => void;
};

const ClaimListSectionItem = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { content, updateList } = props;

  const { mutate } = useCancelClaim(() => updateList());

  const requestCancelCancel = () => {
    mutate({ type: 'Cancel', orderClaimIdEncrypt: content.orderClaimIdEncrypt });
  };

  const requestCancelExchange = () => {
    mutate({ type: 'Exchange', orderClaimIdEncrypt: content.orderClaimIdEncrypt });
  };

  const requestCancelReturn = () => {
    mutate({ type: 'Return', orderClaimIdEncrypt: content.orderClaimIdEncrypt });
  };

  const getClaimType = () => {
    const claimType = content?.goodsList[0]?.claimTypeEnum.code;
    if (claimType === MYPAGE_CLAIM_SORT_CODES.CANCEL) {
      return 'Cancel';
    } else if (claimType === MYPAGE_CLAIM_SORT_CODES.EXCHANGE) {
      return 'Exchange';
    } else {
      return 'Return';
    }
  };
  const renderCalimCancleButton = () => {
    const itemState = content.goodsList
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
              width={'100%'}
              align='center'
              onClick={requestCancelCancel}
            />
          );
        case AllOrderStates.Claim.EA:
          return (
            <Button
              title='교환철회'
              size='xsm'
              btnType='tertiary'
              width={'100%'}
              align='center'
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
              width={'100%'}
              align='center'
              onClick={requestCancelReturn}
            />
          );
      }
    }
  };

  return (
    <S.ClaimHistorySectionContainer ref={ref}>
      <S.ClaimHistorySectionHeader href={navigate.claimDetail(content.ordersIdEncrypt)}>
        <div>
          <span>{content.claimRequestDate}</span>
          <span>{content.orderNumber}</span>
        </div>
        <IcoChevronRight
          className='svg'
          width={20}
          height={20}
        />
      </S.ClaimHistorySectionHeader>
      {content.goodsList.map((item) => (
        <ClaimListSectionGoods
          key={item.orderItemIdEncrypt}
          goodsInfo={item}
        />
      ))}
      {renderCalimCancleButton()}
    </S.ClaimHistorySectionContainer>
  );
});

export default ClaimListSectionItem;
