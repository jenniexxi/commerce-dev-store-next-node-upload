'use client';
import { useEffect, useState } from 'react';

import * as S from './_Order.style';
import { useRouter } from 'next/navigation';
import { useDeliveryStore } from 'stores/deliveryStore';
import { useOrderStore } from 'stores/orderStore';
import { useGetMyAddressCount, useGetMyAddresses } from 'hooks/query/buyerQuery';
import { DeliveryAddress, Encrypt } from 'type/api/buyer';
import navigate from 'utils/navigate';
import { T } from '@ui/commons';
import { Button, Input, Selector } from '@ui/components';
import { colors } from '@ui/styles/theme';
import { DELIVERY_REQUEST } from 'type/shopping';

type Props = {};

const DelivieryInfo = ({}: Props) => {
  const router = useRouter();
  const {
    deliveryRequestReason,
    setDeliveryRequestReason,
    deliveryRequest,
    setDeliveryRequest,
    selectedAddr,
    setSelectedAddr,
  } = useDeliveryStore();
  const { setAddress } = useOrderStore();
  // 쿼리
  const { data: addressCount } = useGetMyAddressCount();

  const { data: addressData } = useGetMyAddresses(addressCount?.data);

  useEffect(() => {
    if (!selectedAddr) {
      setSelectedAddr(
        addressData?.data?.filter((address: DeliveryAddress & Encrypt) => address.defaultYn === true)[0] ?? undefined,
      );
    }
  }, [addressData]);

  useEffect(() => {
    if (selectedAddr) {
      setAddress({
        name: selectedAddr.receiverName,
        contactNumber: selectedAddr.receiverCellPhone,
        zipCode: selectedAddr.zipCode,
        address: selectedAddr.receiverAddress,
        addressDetail: selectedAddr.receiverAddressDetail,
        shippingMessage:
          deliveryRequest?.code === 'ORDER.SHIPPING_REQUEST.DIRECT' ? deliveryRequestReason : deliveryRequest?.codeName,
        shippingName: selectedAddr.name,
        basicYn: selectedAddr.defaultYn,
      });
    }
  }, [selectedAddr]);

  const mangeAddress = () => {
    router.push(navigate.myPageManageAddress());
  };
  const hasNoAddress = addressCount?.data === 0;

  return (
    <>
      {hasNoAddress ? (
        <S.AddressContainer>
          <T.Body2_NormalM $mb={16}>배송지를 등록해 주세요.</T.Body2_NormalM>
          <Button
            title='배송지 등록'
            btnType='primary'
            size='xsm'
            onClick={mangeAddress}
          />
        </S.AddressContainer>
      ) : (
        <S.ExistingAddressCard key={selectedAddr?.buyerAddressIdEncrypt}>
          <S.AddressHeader>
            <S.AddressInfo>
              <T.Body1_NormalB $mr={8}>
                {selectedAddr?.receiverName}({selectedAddr?.name})
              </T.Body1_NormalB>

              {selectedAddr?.defaultYn && (
                <S.DefaultBadge>
                  <T.Caption2_NormalM $color={colors.text4}>기본배송지</T.Caption2_NormalM>
                </S.DefaultBadge>
              )}
            </S.AddressInfo>
            <Button
              onClick={mangeAddress}
              title='변경'
              size='xsm'
              btnType='tertiary'
            />
          </S.AddressHeader>
          <T.Body2_NormalM>{selectedAddr?.receiverCellPhone}</T.Body2_NormalM>
          <T.Body2_Normal
            $color={colors.text4}
            $mb={16}
          >
            {selectedAddr?.receiverAddress} {selectedAddr?.receiverAddressDetail}
          </T.Body2_Normal>

          <Selector
            placeholder='배송요청사항을 선택해 주세요.'
            defaultValue={deliveryRequest}
            options={DELIVERY_REQUEST}
            onChange={setDeliveryRequest}
            isBottomPopup={true}
          />
          {deliveryRequest?.code === 'ORDER.SHIPPING_REQUEST.DIRECT' && (
            <S.DirectInputWrapper>
              <Input
                name='directInput'
                value={deliveryRequestReason}
                onChange={(e) => setDeliveryRequestReason(e.target.value)}
                maxLength={30}
                placeholder='배송요청사항을 입력해주세요 (30자 이내)'
                height='md'
              />
            </S.DirectInputWrapper>
          )}
        </S.ExistingAddressCard>
      )}
    </>
  );
};

export default DelivieryInfo;
