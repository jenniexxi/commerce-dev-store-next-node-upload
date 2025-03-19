import { forwardRef } from 'react';

import dayjs from 'dayjs';

import * as S from './AddPaymentItemView.style';
import { AddPaymentItem } from 'type/api/claim';
import { T } from '@ui/commons';
import { showPriceText } from '@ui/utils';
import { Button } from '@ui/components';
import { PAYMENT_STATUS_CODES } from 'type/orders';

type Props = {
  content: AddPaymentItem;
  isLastItem?: boolean;
  observerCallback?: (node: HTMLLIElement | null) => void;
};
const AddPaymentItemView = ({ content, isLastItem, observerCallback }: Props) => {
  const paymentAddPayment = () => {};
  return (
    <S.Container // ref 대신 인터섹션 옵저버 콜백 사용
      ref={isLastItem ? observerCallback : undefined}
    >
      <T.Headline1M>추가결제 생성일 {dayjs(content.claimRequestDate).format('YYYY.MM.DD')}</T.Headline1M>
      <S.ItemContainer>
        <S.RowView>
          <T.Body1_Normal>주문번호</T.Body1_Normal>
          <T.Body1_Normal>{content.orderNumber}</T.Body1_Normal>
        </S.RowView>
        <S.Border />
        <S.RowView>
          <T.Body1_Normal>추가결제 구분</T.Body1_Normal>
          <T.Body1_Normal>{content.claimTypeEnum.codeName}</T.Body1_Normal>
        </S.RowView>
        <S.RowView>
          <T.Body1_Normal>결제금액</T.Body1_Normal>
          <T.Body1_Normal>{showPriceText(content.paymentPrice)}</T.Body1_Normal>
        </S.RowView>
        <S.RowView>
          <T.Body1_Normal>결제수단</T.Body1_Normal>
          <T.Body1_Normal>{content.paymentMethodEnum.codeName}</T.Body1_Normal>
        </S.RowView>
        <S.RowView>
          <T.Body1_Normal>결제상태</T.Body1_Normal>
          <T.Body1_Normal>{content.paymentStatusEnum.codeName}</T.Body1_Normal>
        </S.RowView>
        {content.paymentStatusEnum.code === PAYMENT_STATUS_CODES.PAYMENT_WAIT && (
          <Button
            title='결제하기'
            width='100%'
            align='center'
            onClick={paymentAddPayment}
          />
        )}
      </S.ItemContainer>
    </S.Container>
  );
};

export default AddPaymentItemView;
