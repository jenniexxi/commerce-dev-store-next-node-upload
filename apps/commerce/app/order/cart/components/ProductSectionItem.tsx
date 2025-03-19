'use client';
import { useState } from 'react';

import { CustomCartItem } from '../ShoppingCart';
import ProductGroupItem from './ProductGroupItem';
import * as S from './_ShoppingCart.style';
import { CartSummary } from 'type/api/shoppingCart';

import { useDownloadCoupon } from 'hooks/mutate/promotionMutation';
import { CartCouponItem } from 'type/api/promotion';
import { Button, Checkbox, Modal } from '@ui/components';
import { CenterLink } from '@ui/commons';
import SvgIcon from '@ui/commons/SvgIcon';
import { showPriceText } from '@ui/utils';
import Coupon from 'components/coupon/Coupon';

type Props = {
  storeName: string;
  companyId: number;
  item: CustomCartItem;
  summaryInfo: Record<string, CartSummary>;
  couponInfo: CartCouponItem[];
  deleteItem: (cartId: number[]) => void;
  checkCompanyItem: (checked: boolean, companyId: number) => void;
  checkSingleItem: (checked: boolean, companyId: number, goodsId: number) => void;
  fetchCart: () => void;
  refetchCoupon: () => void;
  refetchSumary: () => void;
};

const ProductSectionItem = ({
  item,
  storeName,
  companyId,
  summaryInfo,
  couponInfo,
  checkCompanyItem,
  checkSingleItem,
  deleteItem,
  fetchCart,
  refetchCoupon,
  refetchSumary,
}: Props) => {
  const [showCouponModal, setShowCouponModal] = useState(false);

  const { mutateAsync: downloadGoodsCoupon } = useDownloadCoupon();

  const downloadAllCoupon = async () => {
    const codeList = couponInfo
      ?.filter((item) => !item.downloadYn)
      .flatMap((item) => {
        return { code: item.code, body: { goodsId: item.goodsId } };
      });
    if (!codeList?.length) return;

    try {
      for (const code of codeList) {
        await downloadGoodsCoupon(code);
      }
    } catch (error) {
      // 에러 처리
    }
    refetchCoupon();
  };

  const downloadAll = couponInfo?.every((item) => {
    return item.downloadYn;
  });

  return (
    <S.ProductList>
      <S.BrandBox>
        <S.BoxPie>
          <Checkbox
            checked={item.disabled ? false : item.isChecked}
            disabled={item.disabled}
            value={storeName || '스토어명'}
            id={`storeCheck-${companyId || ''}-${storeName}`}
            name={`storeCheck-${companyId || ''}-${storeName}`}
            onChange={(checked) => {
              checkCompanyItem(checked, companyId);
            }}
            fontType={'body1_normalb'}
          />
          <CenterLink href='/'>
            <SvgIcon
              path={'/ui/svg/ico_chevron_right.svg'}
              width={16}
              height={16}
            />
          </CenterLink>
        </S.BoxPie>

        {couponInfo.length > 0 && (
          <Button
            title={downloadAll ? '쿠폰보기' : '쿠폰받기'}
            size='xsm'
            btnType={downloadAll ? 'tertiary' : 'highlight'}
            onClick={() => setShowCouponModal(true)}
          />
        )}
      </S.BrandBox>
      {item.shippingList.map((item, index) => (
        <ProductGroupItem
          key={`${item.goodsList[0]?.goodsId || 'unknown'}-${index}`}
          item={item}
          companyId={companyId}
          checkSingleItem={checkSingleItem}
          deleteItem={deleteItem}
          fetchCart={fetchCart}
          refetchSumary={refetchSumary}
          storeName={storeName}
        />
      ))}
      <S.BrandPerTotal>
        <S.BrandPayList>
          <S.BrandPayLi>
            <S.BrandPayTitle>선택상품금액</S.BrandPayTitle>
            <S.BrandPayText>{showPriceText(summaryInfo[item.companyId.toString()]?.goodsPaymentPrice)}</S.BrandPayText>
          </S.BrandPayLi>

          <S.BrandPayLi>
            <S.BrandPayTitle>즉시할인금액</S.BrandPayTitle>
            <S.BrandPayTextWarn>
              {summaryInfo[item.companyId.toString()]?.discountPrice.number === 0 ? '' : '-'}
              {showPriceText(summaryInfo[item.companyId.toString()]?.discountPrice)}
            </S.BrandPayTextWarn>
          </S.BrandPayLi>

          <S.BrandPayLi>
            <S.BrandPayTitle>총 배송비</S.BrandPayTitle>
            <S.BrandPayText>
              {showPriceText(summaryInfo[item.companyId.toString()]?.shippingPaymentPrice)}
            </S.BrandPayText>
          </S.BrandPayLi>
        </S.BrandPayList>

        <S.BrandPayTotal>
          <S.PayTitle>결제예정금액</S.PayTitle>
          <S.PayAmount>{showPriceText(summaryInfo[item.companyId.toString()]?.paymentPrice)}</S.PayAmount>
        </S.BrandPayTotal>
      </S.BrandPerTotal>
      {showCouponModal && (
        <Modal
          type='bottomSheet'
          onHide={() => setShowCouponModal(false)}
          bottomTitle='사용 가능한 쿠폰'
        >
          <>
            <S.CouponModalView>
              {couponInfo.map((coupon, index) => (
                <Coupon
                  key={coupon.code + index}
                  info={coupon}
                  type={coupon.typeEnum.code}
                  goodsId={1}
                  refetch={refetchCoupon}
                />
              ))}
            </S.CouponModalView>

            <S.BottomButtonView>
              <Button
                width='100%'
                align='center'
                title={downloadAll ? '전체 다운로드 완료' : '전체 다운로드'}
                onClick={downloadAllCoupon}
                disabled={downloadAll}
              />
            </S.BottomButtonView>
          </>
        </Modal>
      )}
    </S.ProductList>
  );
};

export default ProductSectionItem;
