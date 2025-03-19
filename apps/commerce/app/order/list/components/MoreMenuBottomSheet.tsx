'use client';
import { OrderListGoods } from 'type/api/order';
import * as S from './_OrderHistory.style';
import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { ClaimType } from 'type/api/claim';
import navigate from 'utils/navigate';
import { Button } from '@ui/components';
import { AllOrderStates } from 'type/claims';
import { useGetCheckClaimAvailable } from 'hooks/mutate/claimMutation';

type Props = {
  goodsInfo: OrderListGoods;
  ordersIdEncrypt: string;
  orderShippingPriceIdEncrypt: string;
  orderItemIdEncrypt: string;
};

const MoreMenuBottomSheet = ({
  goodsInfo,
  ordersIdEncrypt,
  orderShippingPriceIdEncrypt,
  orderItemIdEncrypt,
}: Props) => {
  const router = useRouter();
  let modalInfo: JSX.Element[] = [];

  const moveToClaimOrder = (type: ClaimType) => {
    router.push(
      navigate.claimRequest(ordersIdEncrypt, {
        type,
        orderShippingPriceIdEncrypt,
        orderItemIdEncrypt,
        isSelectOrder: true,
      }),
    );
  };

  const renderGoodsInfo = () => {
    return (
      <>
        <img
          src={goodsInfo.imageFilesUrl}
          alt={goodsInfo.displayGoodsName}
        />
        <div>{goodsInfo.displayGoodsName}</div>
        <div>{goodsInfo.goodsOption}</div>
      </>
    );
  };
  const gotoTrackingInfo = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='배송조회'
      />
    );
  };
  const gotoExchangeApply = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='교환신청'
        onClick={() => moveToClaimOrder('Exchange')}
      />
    );
  };
  const gotoReturnApply = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='반품신청'
        onClick={() => moveToClaimOrder('Return')}
      />
    );
  };
  const gotoConfrimItem = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='구매확정'
      />
    );
  };
  const gotoCustomerCenter = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='1:1 문의'
      />
    );
  };
  const gotoWriteReview = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        title='후기 작성'
      />
    );
  };
  const gotoCancelOrder = () => {
    return (
      <Button
        size='xsm'
        btnType='tertiary'
        width='100%'
        align='center'
        onClick={() => {
          router.push(navigate.home());
        }}
        title='주문취소'
      />
    );
  };

  switch (goodsInfo.itemStatusEnum.code) {
    // 결제완료
    case AllOrderStates.Order.DC:
    case AllOrderStates.Order.SD:
      modalInfo.push(renderGoodsInfo());
      modalInfo.push(gotoCancelOrder());
      modalInfo.push(gotoCustomerCenter());
      break;
    // 배송시작
    case AllOrderStates.Order.SS:
      modalInfo.push(renderGoodsInfo());
      modalInfo.push(gotoTrackingInfo());
      modalInfo.push(gotoCustomerCenter());
      break;
    // 배송중
    case AllOrderStates.Order.SI:
      modalInfo.push(renderGoodsInfo());
      modalInfo.push(gotoTrackingInfo());
      modalInfo.push(gotoCustomerCenter());
      break;
    // 배송완료
    case AllOrderStates.Order.SC:
      modalInfo.push(renderGoodsInfo());
      modalInfo.push(gotoTrackingInfo());
      modalInfo.push(gotoExchangeApply());
      modalInfo.push(gotoReturnApply());
      modalInfo.push(gotoConfrimItem());
      modalInfo.push(gotoCustomerCenter());
      break;
    // 구매확정
    case AllOrderStates.Order.BF:
      modalInfo.push(renderGoodsInfo());
      modalInfo.push(gotoWriteReview());
      modalInfo.push(gotoCustomerCenter());
      break;

    default:
      break;
  }

  return <S.ModalGoodsInfo>{modalInfo}</S.ModalGoodsInfo>;
};

export default MoreMenuBottomSheet;
