'use client';
import { useState } from 'react';

import * as S from './ManageAddress.style';

import { useHeader } from '@ui/hooks';
import { useDeliveryStore } from 'stores/deliveryStore';
import { DeliveryAddress, Encrypt } from 'type/api/buyer';
import { useGetMyAddresses } from 'hooks/query/buyerQuery';
import { Separator, T } from '@ui/commons';
import { Button, Selector } from '@ui/components';
import { DELIVERY_REQUEST } from 'type/shopping';
import { colors } from '@ui/styles/theme';
import SvgIcon from '@ui/commons/SvgIcon';
import AddAddressModal from 'components/modal/AddAddressModal';
import { AddressItem } from './components';

type Props = {
  changeDeliveryRequest?: boolean;
  isExist?: boolean;
  isExchange?: boolean;
};

const ManageAddress = ({ changeDeliveryRequest, isExist, isExchange }: Props) => {
  const [showNewModal, setShowNewModal] = useState(false);

  const { setDeliveryRequest, deliveryRequest, deliveryRequestReason, setDeliveryRequestReason } = useDeliveryStore();

  useHeader('배송지 목록', { showHeader: true });

  // Query
  const { data: addressesData, refetch } = useGetMyAddresses();

  const sortedAddresses = addressesData?.data
    ?.slice()
    .sort((a: Encrypt & DeliveryAddress, b: Encrypt & DeliveryAddress) => {
      if (a.defaultYn === b.defaultYn) return 0;
      return a.defaultYn ? -1 : 1;
    });

  return (
    <S.Container>
      {changeDeliveryRequest ? (
        <>
          <S.DeliveryRequestWrap>
            <T.Body1_NormalB $mb={16}>배송요청사항 변경</T.Body1_NormalB>
            <Selector
              options={DELIVERY_REQUEST}
              onChange={(value) => setDeliveryRequest(value)}
              placeholder='배송요청사항을 선택해주세요'
            />
            {typeof deliveryRequest === 'object' && deliveryRequest.code === 'ORDER.SHIPPING_REQUEST.DIRECT' && (
              <S.DeliveryInputWrap>
                <S.DeliveryRequestInput
                  name='reason'
                  maxLength={30}
                  value={deliveryRequestReason}
                  placeholder={`배송요청사항을입력해주세요.\n(30자 이내)`}
                  onChange={(e) => setDeliveryRequestReason(e.target.value)}
                />
                <T.Caption1_Normal $color={colors.icon4}>
                  {deliveryRequestReason.length} <span>/</span> 30
                </T.Caption1_Normal>
              </S.DeliveryInputWrap>
            )}
          </S.DeliveryRequestWrap>
          <Separator $height={8} />
          <S.DeliveryRequestTitleWrap>
            <T.Body1_NormalB
              $mb={16}
              $ml={16}
            >
              배송지 변경
            </T.Body1_NormalB>
            <Button
              width='100%'
              align='center'
              title='배송지 신규 등록'
              btnType='tertiary'
              leftIcon={
                <SvgIcon
                  path={'/ui/svg/ico_plus.svg'}
                  width={20}
                  height={20}
                />
              }
              onClick={() => {
                setShowNewModal(true);
              }}
            />
          </S.DeliveryRequestTitleWrap>
        </>
      ) : (
        <>
          <S.AddAddrWrap>
            <Button
              width='100%'
              align='center'
              title='배송지 신규 등록'
              btnType='tertiary'
              leftIcon={
                <SvgIcon
                  path={'/ui/svg/ico_plus.svg'}
                  width={20}
                  height={20}
                />
              }
              onClick={() => {
                setShowNewModal(true);
              }}
            />
          </S.AddAddrWrap>
          <Separator $height={8} />
        </>
      )}

      {sortedAddresses?.length === 0 ? (
        <S.NonContsWrapper>
          <S.TopContsSec>
            <SvgIcon
              path={'/ui/svg/ico_exclamation_circle_fill.svg'}
              width={80}
              height={80}
              tintColor={colors.status_disabled}
            />
            <T.Headline2B $mt={8}>등록된 배송지가 없습니다.</T.Headline2B>
          </S.TopContsSec>
        </S.NonContsWrapper>
      ) : (
        <S.AddrListWrap>
          {sortedAddresses?.map((item) => (
            <AddressItem
              key={item.buyerAddressIdEncrypt}
              item={item}
              refetch={refetch}
              isExist={isExist}
              isExchange={isExchange}
            />
          ))}
        </S.AddrListWrap>
      )}
      <AddAddressModal
        isVisible={showNewModal}
        onHide={() => setShowNewModal(false)}
        refetch={refetch}
      />
    </S.Container>
  );
};

export default ManageAddress;
