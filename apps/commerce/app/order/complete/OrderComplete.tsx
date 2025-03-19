'use client';
import { useEffect, useRef, useState } from 'react';

import * as S from './OrderComplete.style';
import { useHeader } from '@ui/hooks';
import { PaymentResult } from 'type/api/system';
import { useGetBuyerInfo } from 'hooks/query/systemQuery';
import { useRouter } from 'next/navigation';
import navigate from 'utils/navigate';
import { colors } from '@ui/styles/theme';
import { Separator, T } from '@ui/commons';
import { numberWithCommas, showPriceText } from '@ui/utils';
import { TwoButton } from '@ui/components';
import { usePaymentResult } from 'hooks/mutate/systemMutation';
import SvgIcon from '@ui/commons/SvgIcon';

type Props = { pgServiceEnum: string; pgDataJson: string; processIngAddPaymentYn: boolean; paymentPrice: number };

const OrderComplete = ({ pgServiceEnum, pgDataJson, processIngAddPaymentYn, paymentPrice }: Props) => {
  useHeader('주문완료', { showHeader: true, showRightButton: false, showLeftButton: false });

  const [paymentResult, setPaymentResult] = useState<PaymentResult>();

  const { data: buyerInfo } = useGetBuyerInfo();
  const isApiCalled = useRef(false);

  const { mutate: postPaymentResult } = usePaymentResult((resp) => {
    if (resp.success) {
      setPaymentResult(resp.data);
    }
  });

  const router = useRouter();

  useEffect(() => {
    if (pgDataJson) {
      const body = {
        pgServiceEnum: pgServiceEnum,
        deviceTypeEnum: 'BASE.DEVICE_TYPE.MOBILE',
        pgDataJson: pgDataJson,
        processIngAddPaymentYn: processIngAddPaymentYn,
      };

      // console.log('aaaa', body);
      if (!isApiCalled.current) {
        postPaymentResult(body);
        isApiCalled.current = true;
      }
    }
  }, [pgDataJson, pgServiceEnum, processIngAddPaymentYn]);

  const moveToHome = () => {
    router.replace(navigate.home());
    // window.history.pushState(null, '', navigate.home());
    // window.history.go(-(window.history.length - 1));
  };

  const moveToOrderInfo = () => {
    if (paymentResult?.ordersIdEncrypt) {
      router.replace(navigate.orderDetail(paymentResult.ordersIdEncrypt));
    }
  };

  return (
    <S.Container>
      <S.ContentView>
        <S.SectionView>
          <T.Headline1B $mt={16}>{buyerInfo?.buyer.buyerName}님의 주문이</T.Headline1B>
          <T.Headline1B $mb={12}>정상적으로 완료되었습니다.</T.Headline1B>
          <S.OrderInfo>
            <T.Body1_NormalM>주문번호 {paymentResult?.orderNumber}</T.Body1_NormalM>
            <T.Body2_Normal $color={colors.text4}>
              {paymentResult?.address} {paymentResult?.addressDetail}
            </T.Body2_Normal>
          </S.OrderInfo>
        </S.SectionView>
        <Separator $height={8} />
        {paymentResult?.virtualBank ? (
          <S.SectionView>
            <T.Body2_Normal $mt={20}>아래 가상계좌 정보를 확인 후 입금을 완료해 주세요.</T.Body2_Normal>
            <T.Body2_Normal $mb={16}>기한 내 입금되어야 최종 결제처리됩니다.</T.Body2_Normal>
            <T.Body1_NormalB $mb={12}>가상계좌 정보</T.Body1_NormalB>
            <S.BankInfo>
              <div>
                <T.Body2_NormalB $color={colors.text5}>계좌번호</T.Body2_NormalB>
                <S.BankAccountNumberView>
                  <T.Body2_NormalB
                    $color={colors.text4}
                    $mr={4}
                  >
                    {paymentResult.virtualBank.bankName} {paymentResult.virtualBank.bankAccountNumber}
                  </T.Body2_NormalB>
                  <SvgIcon
                    path={'/ui/svg/ico_image_multi.svg'}
                    width={20}
                    height={20}
                  />
                </S.BankAccountNumberView>
              </div>
              <div>
                <T.Body2_NormalB $color={colors.text5}>예금주</T.Body2_NormalB>
                <T.Body2_NormalB $color={colors.text4}>{paymentResult.virtualBank.bankAccountHolder}</T.Body2_NormalB>
              </div>
              <div>
                <T.Body2_NormalB $color={colors.text5}>결제금액</T.Body2_NormalB>
                <T.Body2_NormalB $color={colors.text4}>{numberWithCommas(paymentPrice)}원</T.Body2_NormalB>
              </div>
              <div>
                <T.Body2_NormalB $color={colors.text5}>입금기한</T.Body2_NormalB>
                <T.Body2_NormalB $color={colors.secondary1}>
                  {paymentResult.virtualBank.virtualBankDate}
                </T.Body2_NormalB>
              </div>
            </S.BankInfo>
          </S.SectionView>
        ) : (
          <S.SectionView>
            <S.SectionTitle>
              <T.Body2_NormalB $color={colors.text4}>총 결제 금액</T.Body2_NormalB>
              <T.Headline2B>{numberWithCommas(paymentPrice || 0)}원</T.Headline2B>
            </S.SectionTitle>
          </S.SectionView>
        )}

        <Separator $height={8} />
        <S.SectionView>
          <S.SectionTitle>
            <T.Body2_NormalB $color={colors.text4}>적립예정 혜택</T.Body2_NormalB>
            <T.Headline2B className='highLight'>{showPriceText(paymentResult?.depositPay010Mileage)}</T.Headline2B>
          </S.SectionTitle>
          <S.MileageInfoView>
            <T.Caption1_Normal $color={colors.text4}>기본적립</T.Caption1_Normal>
            <T.Caption1_NormalM $color={colors.text4}>
              {showPriceText(paymentResult?.goodsDepositPay010Mileage)}
            </T.Caption1_NormalM>
          </S.MileageInfoView>
          <S.MileageInfoView>
            <T.Caption1_Normal $color={colors.text4}>라운드페이 머니 결제 시 최대 적립</T.Caption1_Normal>
            <T.Caption1_NormalM $color={colors.text4}>
              {showPriceText(paymentResult?.paymentDepositPay010Mileage)}
            </T.Caption1_NormalM>
          </S.MileageInfoView>
          {paymentResult?.buyerGroupDepositPay010MileageYn && (
            <S.MileageInfoView>
              <T.Caption1_Normal $color={colors.text4}>등급 적립 혜택</T.Caption1_Normal>
              <T.Caption1_NormalM $color={colors.text4}>
                {showPriceText(paymentResult?.buyerGroupDepositPay010Mileage)}
              </T.Caption1_NormalM>
            </S.MileageInfoView>
          )}
          {/* 
          <S.MileageInfoView>
            <T.Caption1_Normal $color={colors.text4}>슈퍼적립 혜택</T.Caption1_Normal>
            <T.Caption1_NormalM $color={colors.text4}>
              {showPriceText(paymentResult?.goodsDepositPay010Mileage)}
            </T.Caption1_NormalM>
          </S.MileageInfoView> */}
        </S.SectionView>
      </S.ContentView>
      <S.BottomButtonContainer>
        <TwoButton
          leftTitle='주문내역 확인'
          rightTitle='쇼핑 계속하기'
          leftonClick={moveToOrderInfo}
          rightonClick={moveToHome}
        />
      </S.BottomButtonContainer>
    </S.Container>
  );
};

export default OrderComplete;
