'use client';
import { useState } from 'react';

import DaumPostcode from 'react-daum-postcode';

import * as S from '../ClaimRequest.style';
import { ShippingAddress } from 'type/api/claim';
import { useDeliveryStore } from 'stores/deliveryStore';
import { useModalStore } from '@ui/stores';
import { useRouter } from 'next/navigation';
import navigate from 'utils/navigate';
import { T } from '@ui/commons';
import { Button, Input, Modal, Selector } from '@ui/components';
import { colors } from '@ui/styles/theme';
import { DELIVERY_REQUEST } from 'type/shopping';

type RequestType = 'collect' | 'delivery'; // collect: 수거요청사항, delivery: 배송요청사항

type Props = {
  title: string;
  type: RequestType;
  userAddrInfo?: ShippingAddress;
  collectDesc?: boolean;
  deliveryDesc?: boolean;
  onChangeReason: (value: string) => void;
};

const ClaimAddr = ({ title, type, collectDesc, deliveryDesc, userAddrInfo, onChangeReason }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showModal } = useModalStore();
  const router = useRouter();
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { exchangeRequest, setExchangeRequest, exchangeRequestReason, setExchangeRequestReason } = useDeliveryStore();

  const handleAddressComplete = (data: any): void => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    handleModalClose();
  };

  const checkIslandShip = () => {
    showModal.text(
      '제주/도서산간 지역 배송 불가인 상품이 포함되어 있습니다. 교환 취소 또는 주소를 다시 입력해주세요.',
      '',
      {
        buttonType: 'multi',
        leftType: 'tertiary',
        leftTitle: '교환취소',
        rightTitle: '주소지 변경',
        leftonClick: () => router.push(navigate.orderList()),
        rightonClick: handleModalOpen,
      },
    );
  };

  const mangeAddress = () => {
    router.push(navigate.myPageManageAddress());
  };

  return (
    <>
      <S.ItemPart>
        <T.Body1_NormalB $mb={16}>{title}</T.Body1_NormalB>
        <S.ItemConts>
          <S.ItemBox>
            <div>
              <T.Body2_NormalB $mb={4}>{userAddrInfo?.name}</T.Body2_NormalB>
              <T.Body2_NormalM>{userAddrInfo?.contactNumber}</T.Body2_NormalM>
            </div>
            <Button
              onClick={mangeAddress}
              title='변경'
              size='xsm'
              btnType='tertiary'
            />
          </S.ItemBox>

          <T.Body2_Normal
            $color={colors.text4}
            $mt={8}
            $mb={16}
          >
            {userAddrInfo?.address} {userAddrInfo?.addressDetail}
          </T.Body2_Normal>

          {type === 'collect' ? (
            <div>
              <Input
                name='collectMessage'
                type='text'
                placeholder='수거요청사항을 입력해주세요. (30자 이내)'
                maxLength={30}
                value={userAddrInfo?.shippingMessage}
                height='md'
                onChange={(e) => onChangeReason(e.target.value)}
              />
              {collectDesc && (
                <T.Caption1_Normal
                  $color={colors.text5}
                  $mt={8}
                >
                  상품 수거지 주소지에 따라 별도의 배송비가 추가 청구될 수 있습니다. (ex. 제주 및 도서산간)
                </T.Caption1_Normal>
              )}
            </div>
          ) : (
            <div>
              <Selector
                placeholder='배송요청사항을 선택해 주세요.'
                defaultValue={exchangeRequest}
                options={DELIVERY_REQUEST}
                onChange={setExchangeRequest}
                isBottomPopup={true}
              />
              {typeof exchangeRequest === 'object' && exchangeRequest.code === 'ORDER.SHIPPING_REQUEST.DIRECT' && (
                <Input
                  name='reason'
                  value={exchangeRequestReason || ''}
                  onChange={(e) => setExchangeRequestReason(e.target.value)}
                />
              )}
              {deliveryDesc && (
                <T.Caption1_Normal
                  $color={colors.text5}
                  $mt={8}
                >
                  교환상품을 수령할 주소지에 따라 별도의 배송비가 추가 청구될 수 있습니다. (ex. 제주 및 도서산간)
                </T.Caption1_Normal>
              )}
            </div>
          )}
        </S.ItemConts>
      </S.ItemPart>
      {isModalOpen && (
        <Modal
          onHide={handleModalClose}
          type='center'
          showCloseBtn={false}
        >
          <DaumPostcode
            onComplete={handleAddressComplete}
            autoClose={false}
          />
        </Modal>
      )}
    </>
  );
};

export default ClaimAddr;
