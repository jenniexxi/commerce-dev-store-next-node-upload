import { ClaimList } from 'type/api/order';
import * as S from '../OrderDetail.style';
import { showPriceText } from '@ui/utils';

type PopupRefundProps = {
  claimDetails: ClaimList[];
  claimType: 'Cancel' | 'Return';
};

const PopupRefund = ({ claimDetails, claimType }: PopupRefundProps) => {
  const popTitle = claimType === 'Cancel' ? '취소' : '반품';

  return (
    <S.HistoryPopWrapper>
      <h2>{popTitle} 환불내역</h2>
      <S.HistoryPopContainer>
        {claimDetails.map((item, index) => {
          return (
            <S.RefundPannel key={`${item}-${index}`}>
              <S.TitleBox>
                <h3>환불 처리일자</h3>
                <S.DescDate>{item.paymentDate}</S.DescDate>
              </S.TitleBox>
              <S.ContsPart>
                <div>
                  <div>shop name</div>
                  <div>{item.goodsNameList}</div>
                  <div>option | 개수</div>
                </div>
                <div>
                  <dl>
                    <dt>총 환불금액</dt>
                    <dd>{showPriceText(item.pgPaymentPrice)}</dd>
                  </dl>
                  <dl>
                    <dt>라운드페이 포인트 환불</dt>
                    <dd>{showPriceText(item.refundUseMileage)}</dd>
                  </dl>
                </div>
              </S.ContsPart>
            </S.RefundPannel>
          );
        })}
      </S.HistoryPopContainer>
    </S.HistoryPopWrapper>
  );
};

export default PopupRefund;
