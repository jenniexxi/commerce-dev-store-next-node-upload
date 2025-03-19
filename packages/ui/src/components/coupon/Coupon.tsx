import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import promotionApi, { CouponInfo } from '@ui/apis/promotionApi';
import { T } from '@ui/commons';
import SvgIcon from '@ui/commons/SvgIcon';
import { addToast } from '@ui/components/toast/Toast';
import { colors } from '@ui/styles/theme';
import { DiscountTypeCodes, UseDateTypeCodes } from '@ui/type';
import { numberWithCommas } from '@ui/utils/display';
import R from '@ui/utils/resourceMapper';
import * as S from './Coupon.style';

export type CouponType = 'Store' | 'Double' | 'Product';
interface Props {
  goodsId: number;
  type: CouponType;
  info: CouponInfo;
  refetch: () => void;
}
const Coupon = ({ goodsId, type, info, refetch }: Props) => {
  const [downloadYn, setDownloadYn] = useState(info.downloadYn);
  const { mutate } = useMutation({
    mutationFn: (code: string) => promotionApi.postDownloadCoupon(code, { goodsId }),
    onSuccess: (data) => {
      if (data.success) {
        setDownloadYn(true);
        refetch();
        addToast(data.error.message, 1500, 76);
      } else {
        addToast(data.error.message, 1500, 76);
      }
    },
  });
  const badgeText = () => {
    switch (type) {
      case 'Store':
        return '스토어 쿠폰';
      case 'Double':
        return '더블 쿠폰';
      case 'Product':
        return '상품 쿠폰';
    }
  };

  const ddayText = () => {
    const today = dayjs();
    const end = dayjs(info.useEndDatetime);
    const diff = end.diff(today, 'day');

    if (diff === 0) {
      return `D-DAY ${end.format('HH시 mm분까지')}`;
    } else {
      return `${diff}일 남음`;
    }
  };
  return (
    <S.Container>
      <SvgIcon
        name={R.svg.couponLeft}
        width={21}
        height={135}
      />
      <S.CouponMain>
        <S.CouponInfo>
          <S.RowView $mb={8}>
            <S.CouponTypeBadge $type={type}>
              <T.Caption2_NormalM>{badgeText()}</T.Caption2_NormalM>
            </S.CouponTypeBadge>
            {info.useDateTypeEnum.code !== UseDateTypeCodes.NoneLimit && (
              <S.DdayBadge>
                <T.Caption2_NormalM>{ddayText()}</T.Caption2_NormalM>
              </S.DdayBadge>
            )}
          </S.RowView>
          <S.RowView $mb={2}>
            <T.Heading1B>{numberWithCommas(info.discountValue)}</T.Heading1B>
            <T.Heading2M>{info.discountTypeEnum.code === DiscountTypeCodes.Fixed ? '원' : '%'}</T.Heading2M>
          </S.RowView>
          <T.Body2_NormalM>{info.displayName}</T.Body2_NormalM>
          {/* <T.Caption1_Normal>{info.}</T.Caption1_Normal> */}
        </S.CouponInfo>
        <S.DownloadButton
          onClick={() => {
            mutate(info.code);
          }}
          $bgColor={downloadYn ? colors.status_disabled : colors.text3}
          disabled={downloadYn}
        >
          <SvgIcon
            name={R.svg.icoDownload}
            width={20}
            height={20}
            tintColor={colors.white}
          />
        </S.DownloadButton>
      </S.CouponMain>
      <SvgIcon
        name={R.svg.couponRight}
        width={21}
        height={135}
      />
    </S.Container>
  );
};

export default Coupon;
