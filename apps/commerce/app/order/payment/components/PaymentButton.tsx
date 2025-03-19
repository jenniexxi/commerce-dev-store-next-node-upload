'use client';
import { Price } from 'apis/apiCommonType';
import * as S from './_Order.style';
import { useOrderStore } from 'stores/orderStore';
import { useRRoundPay } from '@ui/hooks';
import { useRouter } from 'next/navigation';
import { useCreateOrder } from 'hooks/mutate/orderMutation';
import { useModalStore } from '@ui/stores';
import { usePaymentRequestInfo } from 'hooks/mutate/systemMutation';
import { Separator, T } from '@ui/commons';
import { colors } from '@ui/styles/theme';
import { Button } from '@ui/components';
import { showPriceText } from '@ui/utils';
import navigate from 'utils/navigate';
import { error } from 'console';

type Props = {
  paymentPrice?: Price;
  hfInstance: any;
};
const PaymentButton = ({ paymentPrice, hfInstance }: Props) => {
  const {
    payment,
    bankEnum,
    bankAccountNumber,
    bankAccountHolder,
    cashReceiptYn,
    purposeEnum,
    identityTypeEnum,
    identity,
  } = useOrderStore();
  const { requestPayment } = useRRoundPay();
  const { showModal } = useModalStore();
  const router = useRouter();
  const { mutate: createOrder } = useCreateOrder((resp) => {
    if (resp.success) {
      postPaymentRequsetInfo({
        paymentGatewayIdEncrypt: resp.data.paymentGatewayIdEncrypt,
        body: {
          deviceTypeEnum: 'BASE.DEVICE_TYPE.MOBILE',
          paymentMethodEnum: payment.paymentMethodEnum,
          cashReceiptYn,
          purposeEnum,
          identityTypeEnum,
          identity,
          bankEnum,
          bankAccountNumber,
          bankAccountHolder,
          paymentTypeEnum: { code: 'ORDER.PAYMENT_TYPE.BASIC', codeName: '정상' },
        },
      });
    }
  });

  const { mutate: postPaymentRequsetInfo } = usePaymentRequestInfo((resp) => {
    if (resp.success) {
      // interface PaymentRequestParams {
      //   ordNo: string;
      //   ordDay: string;
      //   ordTime: string;
      //   productNm: string;
      //   priceObj: any;
      //}

      if (resp.data.pgRequestData.json) {
        const requestData = JSON.parse(resp.data.pgRequestData.json);

        requestPayment(hfInstance.current, requestData).then((result) => {
          //결제 인증 성공, 실패 시 응답 결과 전달

          if (result.resCd === '0') {
            //결제 성공
            //결제 정보 검증 후 결제 API 요청
            router.replace(
              navigate.orderComplete({
                pgServiceEnum: resp.data.pgServiceEnum.code,
                pgDataJson: JSON.stringify({
                  etc: resp.data.pgRequestData.etc,
                  payAuthCd: result.payAuthCd,
                  paymentPrice: result.priceObj?.payPriceObj.payPrice,
                  ...((result.payMethod === 'VACTNORM' || result.payMethod === 'VACTSPLE') && {
                    vbankObj: result.vbankObj,
                  }),
                }),
                processIngAddPaymentYn: false,
                paymentPrice: paymentPrice?.number || 0,
              }),
            );
          } else if (result.resCd === '-1') {
            //결제 실패
            showModal.text(result.resMsg);
          } else if (result.resCd === '-2') {
            //결제창 닫기
          } else if (result.resCd === '-3') {
            //결제가 불가능한 상태 (ex. 결제수단을 선택하지 않은 경우, 시스템 오류)
            alert(result.resMsg);
            //action 이 function 으로 전달 받으면 action 함수 실행
            if (typeof result.action === 'function') {
              result.action();
            }
          }
        });
      }
    } else {
      showModal.text(resp.error.message);
    }
  });

  const { createOrderInfo } = useOrderStore();
  const applyPayment = () => {
    if (createOrderInfo) {
      createOrder(createOrderInfo);
    }
  };
  return (
    <S.PaymentButtonContainer>
      <T.Body1_NormalM>회원님은 위 주문내용을 확인했으며</T.Body1_NormalM>
      <T.Body1_NormalM>ONE App 쇼핑 이용약관 및 개인정보 제 3자</T.Body1_NormalM>
      <T.Body1_NormalM>제공(헥토헬스케어 외)에 동의합니다.</T.Body1_NormalM>
      <Separator
        $height={1}
        $mv={16}
      />
      <T.Caption1_Normal $color={colors.text5}>
        RRound은 통신판매중개자이며, 통신판매의 당사자가 아니므로
      </T.Caption1_Normal>
      <T.Caption1_Normal $color={colors.text5}>
        상품에 대한 광고, 상품주문, 배송 및 환불에 관한 의무와 책임은
      </T.Caption1_Normal>
      <T.Caption1_Normal
        $color={colors.text5}
        $mb={141}
      >
        판매자에게 있습니다.
      </T.Caption1_Normal>
      <S.FixedButtonView>
        <Button
          onClick={applyPayment}
          title={`${showPriceText(paymentPrice)}원 결제하기`}
          width='100%'
          align='center'
        />
        <T.Caption2_Normal
          $mt={10}
          $color={colors.text5}
          $align='center'
        >
          위 주문 내용을 확인했으며, 약관 및 정보 제공 등에 동의합니다.
        </T.Caption2_Normal>
      </S.FixedButtonView>
    </S.PaymentButtonContainer>
  );
};

export default PaymentButton;
