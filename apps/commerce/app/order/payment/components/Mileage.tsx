'use client';
import { useRef } from 'react';

import { UsedMileageInfo } from '../Order';
import * as S from './_Order.style';
import { MileageInfo } from 'type/api/order';
import { Price } from 'apis/apiCommonType';
import { colors } from '@ui/styles/theme';
import { T } from '@ui/commons';
import { showPriceText } from '@ui/utils';
import { Button, NonModalTooltip } from '@ui/components';

type Props = {
  payMileageInfo?: MileageInfo;
  mileage: UsedMileageInfo;
  setMileage: (mileage: UsedMileageInfo) => void;
};
const Mileage = ({ payMileageInfo, mileage, setMileage }: Props) => {
  const payMaxPoint = useRef(0);
  const changeShoppingMileage = (value: string) => {
    setMileage({ ...mileage, shopping: value });
  };
  const changePayMileage = (value: string) => {
    setMileage({ ...mileage, pay: value });
  };

  const renderMileageUseInfo = (mileage: MileageInfo) => {
    let usablePoint: Price;
    switch (mileage.maximumTypeEnum?.code) {
      case 'MILEAGE.MAXIMUM_TYPE.NO_LIMIT':
        usablePoint = mileage.availableMileage;
        break;
      case 'MILEAGE.MAXIMUM_TYPE.FIXED':
        usablePoint = {
          number: mileage.availableMileage.number * (mileage.maximumRate || 0 / 100),
          currencyCode: mileage.availableMileage.currencyCode,
        };
        break;
      case 'MILEAGE.MAXIMUM_TYPE.RATE':
        usablePoint = mileage.maximumMileage || { number: 0, currencyCode: mileage.availableMileage.currencyCode };
        break;
    }

    payMaxPoint.current = usablePoint?.number || 0;

    return (
      <S.RowViewRight>
        <T.Body3_NormalM $color={colors.secondary1}>사용가능 : {showPriceText(usablePoint)}</T.Body3_NormalM>
        <T.Body3_NormalM
          $ml={8}
          $mr={8}
          $color={colors.line3}
        >
          |
        </T.Body3_NormalM>
        <T.Body3_NormalM $color={colors.text5}>보유 : {showPriceText(mileage?.availableMileage)}</T.Body3_NormalM>
      </S.RowViewRight>
    );
  };

  const useMaxPoint = () => {
    changePayMileage(payMaxPoint.current.toString());
  };

  return (
    <S.MileageContainer>
      {payMileageInfo && (
        <>
          <S.RowView>
            <T.Body2_NormalM $mr={2}>라운드페이포인트 </T.Body2_NormalM>
            <NonModalTooltip
              title='라운드페이포인트'
              trigerType='?'
              position='center'
              withDot={true}
              items={[
                '배송비를 제외한 상품 구매금액의 {전액} 사용이 가능합니다.',
                '{1원} 단위로 입력하여 사용할 수 있습니다.',
                '쿠폰을 함께 사용하는 경우, 변경되는 구매 금액에 따라 {라운드페이포인트}의 사용 한도가 자동 변경됩니다.',
                '라운드페이 사용제한 회원인 경우, 라운드페이포인트 사용이 제한됩니다. 자세한 사항은 라운드페이 고객센터로 문의해 주시기 바랍니다.',
              ]}
            />
          </S.RowView>
          <S.RowView>
            <S.InputWrap>
              <S.MonyInput
                placeholder='0'
                value={mileage.pay}
                onChange={(e) => changePayMileage(e.target.value)}
              />
              <T.Body1_Normal $color={mileage.pay === '' ? colors.text6 : colors.text3}>원</T.Body1_Normal>
            </S.InputWrap>
            <Button
              title='최대사용'
              btnType='secondary'
              size='md'
              onClick={() => useMaxPoint()}
            />
          </S.RowView>
          {renderMileageUseInfo(payMileageInfo)}
        </>
      )}
    </S.MileageContainer>
  );
};

export default Mileage;
