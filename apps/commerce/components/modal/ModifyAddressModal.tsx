'use client';
import { useEffect, useState } from 'react';

import DaumPostcode, { Address } from 'react-daum-postcode';

import { useMutation } from '@tanstack/react-query';

import * as S from './AddAddressModal.style';
import BuyersApi from 'apis/buyerApi';
import { CreateBuyersBody, DeliveryAddress, Encrypt } from 'type/api/buyer';
import { Button, Checkbox, Input, Modal, TwoButton } from '@ui/components';
import { T } from '@ui/commons';
import SvgIcon from '@ui/commons/SvgIcon';
import { colors } from '@ui/styles/theme';

type Props = {
  isVisible: boolean;
  onHide: () => void;
  refetch: () => void;
  defaultAddress: Encrypt & DeliveryAddress;
};
const ModifyAddressModal = ({ isVisible, onHide, refetch, defaultAddress }: Props) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<DeliveryAddress>(defaultAddress);
  const [detailAddr, setDetailAddr] = useState(defaultAddress.receiverAddressDetail);
  const [showPlaceNameInput, setShowPlaceNameInput] = useState(false);
  const [placeName, setPlaceName] = useState(defaultAddress.name);
  const [receiverName, setReceiverName] = useState(defaultAddress.receiverName);
  const [mobileNumber, setMobileNumber] = useState(defaultAddress.receiverCellPhone);
  const [defaultPlace, setDefaultPlace] = useState(defaultAddress.defaultYn);
  const [receiverError, setReceiverError] = useState('');
  const [mobileError, setMobileError] = useState('');

  useEffect(() => {
    if (defaultAddress) {
      setAddress(defaultAddress);
      setDetailAddr(defaultAddress.receiverAddressDetail);
      setPlaceName(defaultAddress.name);
      setReceiverName(defaultAddress.receiverName);
      setMobileNumber(defaultAddress.receiverCellPhone);
      setDefaultPlace(defaultAddress.defaultYn);
      setShowPlaceNameInput(defaultAddress.name !== '우리집' && defaultAddress.name !== '회사');
    }
  }, [defaultAddress]);

  // Mutations
  const { mutate: updateAddress } = useMutation({
    mutationFn: ({ buyerAddressIdEncrypt, body }: { buyerAddressIdEncrypt: string; body: CreateBuyersBody }) =>
      BuyersApi.updateBuyers(buyerAddressIdEncrypt, body),
    onSuccess: () => {
      refetch();
      onHide();
      resetAddress();
    },
  });

  useEffect(() => {
    if (receiverError !== '' && receiverName !== '') {
      setReceiverError('');
    }
  }, [receiverName]);

  useEffect(() => {
    if (mobileError !== '' && mobileNumber !== '') {
      setMobileError('');
    }
  }, [mobileNumber]);

  const modifyAddress = () => {
    if (receiverName === '') {
      setReceiverError('이름을 확인해주세요');
      return;
    }

    if (mobileNumber === '') {
      setMobileError('휴대폰 번호를 확인해주세요');
      return;
    }

    const body: CreateBuyersBody = {
      receiverName: receiverName,
      receiverAddress: address?.receiverAddress || '',
      receiverCellPhone: mobileNumber,
      defaultYn: defaultPlace,
      name: placeName,
      zipCode: address?.zipCode || '',
      receiverAddressDetail: detailAddr,
    };

    updateAddress({ buyerAddressIdEncrypt: defaultAddress.buyerAddressIdEncrypt, body });
  };

  const resetAddress = () => {
    setAddress(defaultAddress);
    setDetailAddr('');
    setShowPlaceNameInput(false);
    setPlaceName('');
    setReceiverName('');

    setMobileNumber('');
    setDefaultPlace(true);
    setReceiverError('');
    setMobileError('');
  };
  if (isVisible) {
    return (
      <Modal
        onHide={() => {
          onHide();
          resetAddress();
        }}
        type='full'
        title={'배송지 수정하기'}
        fixedArea={
          <S.ButtonWrapper>
            <TwoButton
              leftTitle='취소'
              rightTitle='수정하기'
              leftSize={4}
              rightSize={6}
              rightonClick={modifyAddress}
              leftonClick={onHide}
            />
          </S.ButtonWrapper>
        }
      >
        {step === 2 && (
          <DaumPostcode
            onComplete={(data: Address) => {
              setAddress({
                defaultYn: defaultAddress.defaultYn,
                receiverName: defaultAddress.receiverName,
                name: defaultAddress.name,
                zipCode: data.zonecode,
                buildingCode: data.bcode,
                receiverAddress: data.roadAddress,
                receiverAddressDetail: '',
                receiverCellPhone: defaultAddress.receiverCellPhone,
              });
              setStep(1);
            }}
            autoClose={false}
          />
        )}
        {step === 1 && (
          <S.AddrModalContainer>
            <S.Step3ReceiverName>
              <T.Body2_NormalM $mb={8}>
                받는 분 <span>*</span>
              </T.Body2_NormalM>
              <Input
                error={receiverError}
                name='receiverName'
                height='md'
                placeholder='이름을 입력해주세요'
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                resetValue={() => {
                  setReceiverName('');
                }}
              />

              <T.Body2_NormalM
                $mb={8}
                $mt={24}
              >
                휴대폰 번호 <span>*</span>
              </T.Body2_NormalM>
              <Input
                error={mobileError}
                name='receiverName'
                height='md'
                placeholder='휴대폰 번호를 입력해주세요'
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                resetValue={() => {
                  setMobileNumber('');
                }}
              />
            </S.Step3ReceiverName>

            <S.ChangeAddrView>
              <T.Body2_NormalM>
                주소 <span>*</span>
              </T.Body2_NormalM>
              <Button
                title='주소 찾기'
                btnType='secondary'
                size='xsm'
                onClick={(e) => {
                  setStep(2);
                }}
              />
            </S.ChangeAddrView>
            <T.Body2_NormalM $mb={2}>{address?.zipCode}</T.Body2_NormalM>
            <T.Body1_NormalM $mb={12}>{address?.receiverAddress}</T.Body1_NormalM>
            <Input
              name='detailAddr'
              height='md'
              placeholder='상세주소를 입력해 주세요'
              value={detailAddr}
              onChange={(e) => setDetailAddr(e.target.value)}
              resetValue={() => {
                setDetailAddr('');
              }}
            />
            <S.DeliveryPlaceName>
              <T.Body2_NormalM $mb={8}>배송지명</T.Body2_NormalM>
              <S.PlaceNameBtnContainer>
                <S.PlaceNameBtn
                  onClick={() => {
                    setShowPlaceNameInput(false);
                    setPlaceName('우리집');
                  }}
                  $isSelected={placeName === '우리집'}
                >
                  <SvgIcon
                    path={'/ui/svg/ico_home.svg'}
                    tintColor={placeName === '우리집' ? colors.text1 : colors.text3}
                  />
                  <T.Body3_NormalM>우리집</T.Body3_NormalM>
                </S.PlaceNameBtn>
                <S.PlaceNameBtn
                  onClick={() => {
                    setShowPlaceNameInput(false);
                    setPlaceName('회사');
                  }}
                  $isSelected={placeName === '회사'}
                >
                  <SvgIcon
                    path={'/ui/svg/ico_company.svg'}
                    tintColor={placeName === '회사' ? colors.text1 : colors.text3}
                  />
                  <T.Body3_NormalM>회사</T.Body3_NormalM>
                </S.PlaceNameBtn>

                <S.PlaceNameBtn
                  onClick={() => {
                    setShowPlaceNameInput(true);
                    setPlaceName('');
                  }}
                  $isSelected={showPlaceNameInput}
                >
                  <T.Body3_NormalM>직접입력</T.Body3_NormalM>
                </S.PlaceNameBtn>
              </S.PlaceNameBtnContainer>
              {showPlaceNameInput && (
                <>
                  <div style={{ marginTop: 8 }} />
                  <Input
                    name='placeName'
                    height='md'
                    placeholder='배송지 별명을 지어주세요'
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    resetValue={() => setPlaceName('')}
                  />
                </>
              )}
              <div style={{ marginTop: 16 }} />
              <Checkbox
                id='defaultPlace'
                name='defaultPlace'
                value='기본배송지로 선택'
                fontType='body2_normal'
                checked={defaultPlace}
                onChange={setDefaultPlace}
              />
            </S.DeliveryPlaceName>
          </S.AddrModalContainer>
        )}
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default ModifyAddressModal;
