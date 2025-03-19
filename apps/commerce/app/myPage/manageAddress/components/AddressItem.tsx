'use client';
import { useEffect, useState } from 'react';

import * as S from './_Buyers.style';
import { DeliveryAddress, Encrypt } from 'type/api/buyer';
import { useDeliveryStore } from 'stores/deliveryStore';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@ui/stores';
import { T } from '@ui/commons';
import { colors } from '@ui/styles/theme';
import IcoCheckCircleFillOn from '@ui/svg/ico_check_circle_fill_on.svg';
import IcoCheckCircleFillOff from '@ui/svg/ico_check_circle_fill_off.svg';
import { useDeleteBuyerAddress } from 'hooks/mutate/buyerMutation';
import ModifyAddressModal from 'components/modal/ModifyAddressModal';

type Props = {
  item: Encrypt & DeliveryAddress;
  refetch: () => void;
  isExist?: boolean;
  isExchange?: boolean;
};
const AddressItem = ({ item, refetch, isExist, isExchange }: Props) => {
  const [showModifyAddress, setShowModifyAddress] = useState(false);

  const { selectedAddr, setSelectedAddr, exchangeAddress, setExistingAddress, existingAddress, setExchangeAddress } =
    useDeliveryStore();
  const { mutate: deleteMutation } = useDeleteBuyerAddress(refetch);
  const { showModal } = useModalStore();
  const router = useRouter();

  useEffect(() => {
    if (item.defaultYn) {
      setSelectedAddr(item);
    }
  }, [item]);

  const handleDelClick = (buyerAddressIdEncrypt: string) => {
    showModal.text('배송지를 삭제하시겠어요?', '', {
      content: '기본배송지로 자동 선택됩니다',
      buttonType: 'multi',
      leftTitle: '취소',
      rightTitle: '삭제하기',
      rightonClick: () => {
        deleteMutation(buyerAddressIdEncrypt);
      },
    });
  };
  return (
    <S.AddressItemContainer
      onClick={() => {
        router.back();
        setSelectedAddr(item);
        if (isExist) {
          setExistingAddress({
            name: `${item.receiverName}(${item.name})`,
            contactNumber: item.receiverCellPhone,
            zipCode: item.zipCode,
            address: item.receiverAddress,
            addressDetail: item.receiverAddressDetail,
            shippingMessage: existingAddress?.shippingMessage || '',
          });
        }
        if (isExchange) {
          setExchangeAddress({
            name: `${item.receiverName}(${item.name})`,
            contactNumber: item.receiverCellPhone,
            zipCode: item.zipCode,
            address: item.receiverAddress,
            addressDetail: item.receiverAddressDetail,
            shippingMessage: exchangeAddress?.shippingMessage || '',
          });
        }
      }}
    >
      {item.buyerAddressIdEncrypt === selectedAddr?.buyerAddressIdEncrypt ? (
        <IcoCheckCircleFillOn
          width={24}
          height={24}
        />
      ) : (
        <IcoCheckCircleFillOff
          width={24}
          height={24}
        />
      )}
      <S.AddressInfo>
        <S.AddressName>
          <T.Body1_NormalB $mr={8}>
            {item.receiverName}
            {item.name !== '' && `(${item.name})`}
          </T.Body1_NormalB>
          {item.defaultYn && (
            <div>
              <T.Caption2_NormalM $color={colors.text4}>기본배송지</T.Caption2_NormalM>
            </div>
          )}
        </S.AddressName>
        <T.Body2_NormalM
          $mt={4}
          $mb={8}
        >
          {item.receiverCellPhone}
        </T.Body2_NormalM>
        <T.Body2_Normal
          $color={colors.text4}
          $mb={8}
        >
          {item.receiverAddress} {item.receiverAddressDetail}
        </T.Body2_Normal>
        <S.ControlBtnWrap>
          <S.ControlBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowModifyAddress(true);
            }}
          >
            <T.Body3_NormalM $color={colors.primary_text2}>수정</T.Body3_NormalM>
          </S.ControlBtn>
          {!item.defaultYn && (
            <>
              <span />
              <S.ControlBtn onClick={() => handleDelClick(item.buyerAddressIdEncrypt)}>
                <T.Body3_NormalM $color={colors.text6}>삭제</T.Body3_NormalM>
              </S.ControlBtn>
            </>
          )}
        </S.ControlBtnWrap>
      </S.AddressInfo>
      <ModifyAddressModal
        isVisible={showModifyAddress}
        onHide={() => {
          setShowModifyAddress(false);
        }}
        refetch={refetch}
        defaultAddress={item}
      />
    </S.AddressItemContainer>
  );
};

export default AddressItem;
