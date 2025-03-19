import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { CouponTypeCode, DiscountTypeCodes, UseDateTypeCodes } from 'type';
import { T } from '@ui/commons';
import SvgIcon from '@ui/commons/SvgIcon';
import { colors } from '@ui/styles/theme';
import { numberWithCommas } from '@ui/utils/display';

import { useToastStore } from '@ui/stores';
import promotionApi from 'apis/promotionApi';
import * as S from './Coupon.style';
import { CouponInfo } from 'type/api/promotion';

interface Props {
  goodsId: number;
  type: CouponTypeCode;
  info: CouponInfo;
  refetch: () => void;
}
const Coupon = ({ goodsId, type, info, refetch }: Props) => {
  const { addToast } = useToastStore();
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
      case 'COUPON.TYPE.STORE':
        return '스토어 쿠폰';
      case 'COUPON.TYPE.DUPLICATION':
        return '더블 쿠폰';
      case 'COUPON.TYPE.GOODS':
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
        path={'/ui/svg/coupon_left.svg'}
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
            path={'/ui/svg/ico_download.svg'}
            width={20}
            height={20}
            tintColor={colors.white}
          />
        </S.DownloadButton>
      </S.CouponMain>
      <SvgIcon
        path={'/ui/svg/coupon_right.svg'}
        width={21}
        height={135}
      />
    </S.Container>
  );
};

export default Coupon;
