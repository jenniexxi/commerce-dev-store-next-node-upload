'use client';
import { useCallback, useEffect, useState } from 'react';

import * as S from './_ProductDetail.style';
import { DetailsContent, GoodsOptionsList, PriceContent } from 'type/api/goods';

import { useRouter } from 'next/navigation';
import { CouponInfo } from 'type/api/promotion';
import { CouponTypeCode, CouponTypeCodes, DiscountTypeCodes } from 'type/promotions';
import { useModalStore, useToastStore } from '@ui/stores';
import { TextModalShowOptions } from '@ui/components/modal/Modal.type';
import { ADD_SHIPPING_PRICE_AREA_CODES } from 'type/goods';
import { numberWithCommas, showPriceText } from '@ui/utils';
import { MiniCartAddGoods } from 'type/api/shoppingCart';
import { colors } from '@ui/styles/theme';
import { Modal, NonModalTooltip, QuantityCounter, Selector, TwoButton } from '@ui/components';
import { Separator, T } from '@ui/commons';
import OptionSelector from 'components/selector/OptionSelector';

import IcoChevronUp from '@ui/svg/ico_chevron_up.svg';
import IcoChevronDown from '@ui/svg/ico_chevron_down.svg';
import { useGetMinicartList } from 'hooks/query/shoppingCartQuery';
import { useCheckAvaliable, useCreateCart } from 'hooks/mutate/shoppingCartMutation';
import { availablePurchaseErrorHandler } from 'utils/errorMsg';
import navigate from 'utils/navigate';

type ProuctItemProp = {
  name: string;
  minCount: number;
  quantity: number;
  maxCount: number;
  salePrice: number;
  recommendPrice: number;
  maxSalePrice: number;
  goodsId?: number;
  goodsOptionId?: number;
  index?: number;
  isAddtionalItem: boolean;
};

type Props = {
  isVisible: boolean;
  goodsInfo?: DetailsContent;
  goodsId: number;
  initialSelectOption: number;
  priceInfo?: PriceContent;
  couponInfo: CouponInfo[];
  hideBuyModal: () => void;
  selectOptionId: (id: number) => void;
};

const ProductBuyModal = ({
  isVisible,
  goodsInfo,
  goodsId,
  initialSelectOption,
  priceInfo,
  couponInfo,
  hideBuyModal,
  selectOptionId,
}: Props) => {
  if (!isVisible) return null;

  const [buyItems, setBuyItems] = useState<ProuctItemProp[]>([]);

  const [localOptionId, setLocalOptionId] = useState<number>(initialSelectOption);
  const [expectCouponList, setExpectCouponList] = useState<{ code: string; name: string; price: number }[]>([]);

  const [isExpend, setIsExpend] = useState(false);
  const { showModal } = useModalStore();
  const { addToast } = useToastStore();

  const router = useRouter();

  const { data: miniCartData } = useGetMinicartList(goodsId);

  useEffect(() => {
    if (!couponInfo || !couponInfo.length || !priceInfo) return;

    const calculateDiscounts = () => {
      const discountList = couponInfo.map((coupon) => {
        let discountPrice = 0;
        const { typeEnum, discountTypeEnum, discountValue, maxDiscountYn, maxDiscountPrice } = coupon;

        // 할인 금액 계산
        if (discountTypeEnum.code === DiscountTypeCodes.Fixed) {
          // 정액 할인
          discountPrice = discountValue;
        } else if (discountTypeEnum.code === DiscountTypeCodes.Percent) {
          // 정률 할인
          discountPrice = (priceInfo.salePrice.number * discountValue) / 100;

          // 최대 할인 금액 적용
          if (maxDiscountYn && discountPrice > maxDiscountPrice.number) {
            discountPrice = maxDiscountPrice.number;
          }
        }

        // 최소 주문 금액 체크
        if (coupon.minGoodsYn && priceInfo.salePrice.number < coupon.minGoodsPrice.number) {
          discountPrice = 0; // 최소 주문 금액 미달 시 할인 없음
        }

        return {
          code: coupon.code,
          name: coupon.displayName,
          price: Math.floor(discountPrice), // 할인 금액은 내림 처리
          type: typeEnum.code,
        };
      });

      // 쿠폰 타입별로 최대 할인 금액을 가진 쿠폰만 필터링
      const goodsCoupons = discountList.filter((item) => item.type === CouponTypeCodes.Goods);
      const duplicateCoupons = discountList.filter((item) => item.type === CouponTypeCodes.Duplication);
      const storeCoupons = discountList.filter((item) => item.type === CouponTypeCodes.Store);

      // 각 타입별 최대 할인 쿠폰 찾기
      const bestGoodsCoupon = goodsCoupons.length > 0 ? goodsCoupons.sort((a, b) => b.price - a.price)[0] : null;

      // Duplication과 Store 쿠폰을 합쳐서 그 중 최대 할인을 제공하는 쿠폰 하나 선택
      const otherCoupons = [...duplicateCoupons, ...storeCoupons];
      const bestOtherCoupon = otherCoupons.length > 0 ? otherCoupons.sort((a, b) => b.price - a.price)[0] : null;

      // 결과 배열 생성 (null 값과 0원 할인 제외)
      const result = [bestGoodsCoupon, bestOtherCoupon]
        .filter(
          (coupon): coupon is { code: string; name: string; price: number; type: CouponTypeCode } =>
            coupon !== null && coupon?.price !== undefined && coupon.price > 0,
        )
        .map(({ code, name, price }) => ({ code, name, price }));

      setExpectCouponList(result);
    };

    calculateDiscounts();
  }, [couponInfo, priceInfo]);

  // 컴포넌트 마운트 시 이전 선택 옵션 복원
  useEffect(() => {
    if (localOptionId !== -1) {
      selectOptionId(localOptionId);
    }
  }, [localOptionId, selectOptionId]);

  useEffect(() => {
    if (miniCartData?.success) {
      setBuyItems(getInitialItems());
    }
  }, [miniCartData]);

  const getInitialItems = useCallback((): ProuctItemProp[] => {
    if (buyItems.length > 0) return buyItems;

    if (miniCartData?.data.optionNameList.length === 0 && miniCartData?.data.optionNameList.length === 0) {
      return [
        {
          name: goodsInfo?.displayGoodsName || '',
          minCount: goodsInfo?.minBuyCnt || 1,
          quantity: goodsInfo?.minBuyCnt || 1,
          maxCount: goodsInfo?.maxBuyCnt || 999,
          salePrice: priceInfo?.salePrice.number || 0,
          recommendPrice: priceInfo?.recommendPrice.number || 0,
          maxSalePrice: priceInfo?.maxSalePrice.number || priceInfo?.salePrice.number || 0,
          goodsId: goodsId,
          isAddtionalItem: false,
        },
      ];
    }

    return [];
  }, [buyItems, miniCartData, goodsId, goodsInfo]);

  const { mutate: addToCart } = useCreateCart((response, v) => {
    if (response.success) {
      if (v[0]?.buyNowYn) {
        checkAvaliable({ cartId: response.data.cartList.flatMap((item) => item.cartId) });

        hideBuyModal();
      } else {
        showTextModal('장바구니에 해당 상품을 담았습니다.\n장바구니로 이동하시겠습니까?', {
          buttonType: 'multi',
          rightonClick: () => {
            router.push(navigate.orderCart());

            hideBuyModal();
          },
        });
      }
    } else {
      showTextModal(response.error.message);
    }
  });

  const { mutate: checkAvaliable } = useCheckAvaliable((resp, value) => {
    if (resp.success) {
      if (value) {
        router.push(navigate.orderPayment({ selectedCartId: value.cartId }));
      }
    } else {
      const result = availablePurchaseErrorHandler(resp.data);
      if (result !== '') {
        showModal.text(result);
      }
    }
  });

  const handleBuyItemsUpdate = useCallback((newItems: ProuctItemProp[]) => {
    setBuyItems(newItems);
  }, []);

  const showTextModal = (title: string, option?: TextModalShowOptions) => {
    showModal.text(title, '', option);
  };

  const sendToShoppingCart = () => {
    // 로컬 옵션 ID를 사용하여 체크
    if (localOptionId !== -1 || !miniCartData?.data?.optionList || miniCartData.data.optionList.length === 0) {
      submitOrders(false);
    } else {
      showTextModal('옵션을 선택해주세요');
    }
  };

  const submitOrders = useCallback(
    (buyNowYn: boolean) => {
      // 로컬 옵션 ID를 사용하여 체크
      if (localOptionId !== -1 || !miniCartData?.data?.optionList || miniCartData.data.optionList.length === 0) {
        const body = buyItems.map((buyItem) => ({
          goodsId: Number(goodsId),
          buyCnt: buyItem.quantity,
          goodsOptionId: buyItem.goodsOptionId,
          buyNowYn,
        }));

        addToCart(body);
      } else {
        showTextModal('옵션을 선택해주세요');
      }
    },
    [localOptionId, buyItems, goodsId, miniCartData],
  );

  const findOptionRecursive = (optionList: GoodsOptionsList[], targetId: number): GoodsOptionsList | null => {
    for (const option of optionList) {
      // 현재 옵션이 찾는 옵션인 경우
      if (option.goodsOptionId === targetId) {
        return option;
      }

      // 하위 옵션이 있는 경우 재귀적으로 탐색
      if (option.optionList && option.optionList.length > 0) {
        const found = findOptionRecursive(option.optionList, targetId);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const onChangeOption = useCallback(
    (option: GoodsOptionsList) => {
      if (!miniCartData?.data?.optionList) return;

      // 먼저 로컬 상태 업데이트
      setLocalOptionId(option.goodsOptionId);

      if (option) {
        const newItem: ProuctItemProp = {
          name: option.valueStr,
          minCount: 1,
          quantity: 1,
          maxCount: option.buyerAvailableBuyCnt,
          salePrice: option.optionSalePrice.number,
          recommendPrice: priceInfo?.recommendPrice.number || 0,
          maxSalePrice: priceInfo?.maxSalePrice.number || option.optionSalePrice.number,
          goodsId: goodsId,
          goodsOptionId: option.goodsOptionId,
          isAddtionalItem: true,
        };

        setBuyItems((prev) => {
          const filteredItems = prev.filter((item) => !item.goodsOptionId);
          const newItems = [...filteredItems, newItem];
          handleBuyItemsUpdate(newItems);
          return newItems;
        });
      }
    },
    [miniCartData?.data?.optionList, goodsId, handleBuyItemsUpdate],
  );

  const updateItemQuantity = (itemId: number | undefined, newQuantity: number, isOptionItem: boolean = false) => {
    if (!itemId) return;

    setBuyItems((prevItems) =>
      prevItems.map((item) => {
        const isMatch = isOptionItem ? item.goodsOptionId === itemId : item.goodsId === itemId && !item.goodsOptionId;

        return isMatch ? { ...item, quantity: newQuantity } : item;
      }),
    );
  };

  const getTotalSalePrice = useCallback(() => {
    return buyItems.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);
  }, [buyItems]);

  const getCouponSalcePrice = useCallback(() => {
    return expectCouponList.reduce((sum, item) => sum + item.price, 0);
  }, [expectCouponList]);

  const getTotalMaxSalePrice = useCallback(() => {
    return buyItems.reduce(
      (sum, item) => sum + item.salePrice - getCouponSalcePrice() + item.salePrice * (item.quantity - 1),
      0,
    );
  }, [buyItems]);

  const getTotalPrice = useCallback(() => {
    return buyItems.reduce((sum, item) => sum + item.recommendPrice * item.quantity, 0);
  }, [buyItems]);

  const getTotalDiscountPrice = useCallback(() => {
    return buyItems.reduce((sum, item) => sum + (item.recommendPrice - item.salePrice) * item.quantity, 0);
  }, [buyItems]);

  const getTotalCount = useCallback(() => {
    return buyItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [buyItems]);

  const getShippingText = () => {
    if (goodsInfo?.shippingInfo.addShippingPriceUseYn) {
      return '제주 / 도서산간 무료배송';
    } else {
      switch (goodsInfo?.shippingInfo.shippingAreaEnum.code) {
        case ADD_SHIPPING_PRICE_AREA_CODES.NONE:
          return '제주 / 도서산간 무료배송';
        case ADD_SHIPPING_PRICE_AREA_CODES.SECTION_2:
          //제주 도서산간
          return '제주 / 도서산간 ' + showPriceText(goodsInfo.shippingInfo.addShippingPrice);
        case ADD_SHIPPING_PRICE_AREA_CODES.SECTION_3:
          // 도서산간
          return '도서산간 ' + showPriceText(goodsInfo.shippingInfo.addShippingPrice2);
      }
    }
  };
  const handleSelectorChange = (value: string, addGoodsList: MiniCartAddGoods[]) => {
    const selected = addGoodsList.find((goods) => goods.goodsOptionId === parseInt(value));

    if (selected) {
      const findItem = buyItems.find((goods) => goods.goodsOptionId === selected.goodsOptionId);

      if (findItem) {
        setBuyItems((prev) =>
          prev.map((item) => {
            if (item.goodsOptionId === findItem.goodsOptionId) {
              if (item.quantity + 1 <= (item.maxCount || 999)) {
                item.quantity = item.quantity + 1;
                addToast('수량이 추가되었어요');
              }

              return item;
            } else {
              return item;
            }
          }),
        );
      } else {
        const newItems: ProuctItemProp = {
          name: selected.valueStr,
          minCount: 1,
          quantity: 1,
          maxCount: selected.totalStock,
          salePrice: selected.price.number,
          recommendPrice: selected.price.number,
          maxSalePrice: selected.price.number,
          goodsId: goodsId,
          goodsOptionId: selected.goodsOptionId,
          isAddtionalItem: true,
        };

        setBuyItems((prev) => {
          return [...prev, newItems];
        });
      }
    }
  };

  const ProductItem = ({
    name,
    maxCount,
    minCount,
    quantity,
    salePrice,
    goodsId,
    goodsOptionId,
    index,
    isAddtionalItem,
  }: ProuctItemProp) => {
    return (
      <S.OptionBoxWrap key={name + index}>
        <S.Info>
          {isAddtionalItem && (
            <S.AddOptionBedge>
              <T.Caption2_NormalM color={colors.text5}>추가상품</T.Caption2_NormalM>
            </S.AddOptionBedge>
          )}
          <S.Name>{name}</S.Name>
        </S.Info>
        <S.QuantityInfo>
          <QuantityCounter
            quantity={quantity}
            minValue={minCount}
            maxValue={maxCount}
            setQuantity={(newQuantity) => {
              if (goodsOptionId !== undefined) {
                updateItemQuantity(goodsOptionId, newQuantity, true);
              } else if (goodsId !== undefined) {
                updateItemQuantity(goodsId, newQuantity, false);
              }
            }}
          />
          <S.OptionPrice>{numberWithCommas(salePrice * quantity)}원</S.OptionPrice>
        </S.QuantityInfo>
      </S.OptionBoxWrap>
    );
  };
  const hasOption = miniCartData?.data && miniCartData?.data.optionList.length > 0;
  if (isVisible) {
    return (
      <Modal
        onHide={hideBuyModal}
        type='bottomSheet'
        showCloseBtn={false}
        fixedArea={
          <S.ModalBottomButton>
            <TwoButton
              leftTitle={'장바구니 담기'}
              rightTitle={'바로 구매하기'}
              leftSize={4}
              rightSize={5}
              btnGap={8}
              rightDisabled={buyItems.length === 0}
              leftDisabled={buyItems.length === 0}
              leftType='tertiary'
              rightType='primary'
              size='lg'
              leftonClick={sendToShoppingCart}
              rightonClick={() => submitOrders(true)}
            />
          </S.ModalBottomButton>
        }
      >
        <S.ModalContainer>
          {hasOption && (
            <>
              <T.Body2_NormalM $mb={8}>
                옵션 선택(필수) <span className='required'>*</span>
              </T.Body2_NormalM>
              <OptionSelector
                options={miniCartData?.data}
                optionCount={miniCartData?.data?.optionNameList.length || 0}
                onChange={(option) => onChangeOption(option)}
              />
            </>
          )}
          {miniCartData?.data && miniCartData?.data.addGoodsList.length > 0 && (
            <>
              <T.Body2_NormalM
                $mt={24}
                $mb={8}
              >
                추가 상품 선택
              </T.Body2_NormalM>
              {miniCartData?.data.addGoodsList?.map((item: MiniCartAddGoods, index: number) => {
                const options = item.addGoodsList.map((goods) => ({
                  label: goods.valueStr,
                  value: goods.goodsOptionId.toString(),
                }));

                return (
                  <div key={`addgoods-${index}`}>
                    <Selector
                      options={options}
                      onChange={(value: string) => {
                        handleSelectorChange(value, item.addGoodsList);
                      }}
                      placeholder={item.valueStr}
                      defaultValue='' // 초기값 설정
                    />
                    <div style={{ height: '1rem' }} />
                  </div>
                );
              })}
            </>
          )}
          {buyItems.map((item, index) => (
            <ProductItem
              key={item.goodsId || '' + item.goodsOptionId || '' + item.name}
              index={index}
              {...item}
            />
          ))}

          <S.BuyModalPriceInfo>
            <S.ModalPriceInfo>
              <T.Body2_NormalM>총 수량</T.Body2_NormalM>
              <T.Body2_NormalB>{getTotalCount()}개</T.Body2_NormalB>
            </S.ModalPriceInfo>
            <S.ModalPriceInfo>
              <S.LeftItem>
                <T.Body2_NormalM>총 금액</T.Body2_NormalM>
                <NonModalTooltip
                  title={`총 금액`}
                  trigerType='?'
                  position='left'
                  withDot={false}
                  items={['총 금액에는 배송비가 포함되어있지 않아요.\n결제 시 배송비가 추가될 수 있어요!']}
                />
              </S.LeftItem>
              <T.Headline1B>{numberWithCommas(getTotalSalePrice())}원</T.Headline1B>
            </S.ModalPriceInfo>
            <S.ModalPriceInfo>
              <S.LeftItem onClick={() => setIsExpend(!isExpend)}>
                <T.Body2_NormalM $mr={4}>최대 할인가</T.Body2_NormalM>
                {isExpend ? (
                  <IcoChevronUp
                    className='svg'
                    color={colors.icon4}
                    width={16}
                    height={16}
                  />
                ) : (
                  <IcoChevronDown
                    className='svg'
                    color={colors.icon4}
                    width={16}
                    height={16}
                  />
                )}
              </S.LeftItem>
              <T.Headline1B $color={colors.secondary1}>{numberWithCommas(getTotalMaxSalePrice())}원</T.Headline1B>
            </S.ModalPriceInfo>
            {isExpend && (
              <>
                <Separator
                  $height={1}
                  $mv={16}
                />
                <S.ModalPriceInfo>
                  <T.Body2_NormalM>상품금액</T.Body2_NormalM>
                  <T.Body2_NormalB>{numberWithCommas(getTotalPrice())}원</T.Body2_NormalB>
                </S.ModalPriceInfo>
                <S.ModalPriceInfo>
                  <T.Body2_NormalM>상품할인</T.Body2_NormalM>
                  <T.Body2_NormalM>-{numberWithCommas(getTotalDiscountPrice())}원</T.Body2_NormalM>
                </S.ModalPriceInfo>
                <S.ModalPriceInfo>
                  <T.Body2_NormalM>쿠폰할인 (발급완료기준)</T.Body2_NormalM>
                  <T.Body2_NormalM $color={colors.secondary1}>
                    -{numberWithCommas(getCouponSalcePrice())}원
                  </T.Body2_NormalM>
                </S.ModalPriceInfo>
                {expectCouponList.map((item) => (
                  <S.ModalPriceSubInfo key={item.code}>
                    <T.Caption1_Normal $color={colors.text4}>{item.name}</T.Caption1_Normal>

                    <T.Caption1_NormalM $color={colors.text4}>{numberWithCommas(item.price)}원</T.Caption1_NormalM>
                  </S.ModalPriceSubInfo>
                ))}

                <S.DescView>
                  <div>
                    <span />
                    <T.Caption1_Normal $color={colors.text4}>
                      고객님이 받을 수 있는 최대 할인을 모두 적용하여, 라운드가 계산한 최대 할인 금액입니다.
                    </T.Caption1_Normal>
                  </div>
                  <div>
                    <span />
                    <T.Caption1_Normal $color={colors.text4}>
                      더블쿠폰과 스토어쿠폰은 중복 사용이 불가능하며, 최대 할인 적용이 되는 기준으로 노출됩니다. 쿠폰
                      상세 적용은 주문/결제페이지에서 확인해주세요.
                    </T.Caption1_Normal>
                  </div>
                  <div>
                    <span />
                    <T.Caption1_Normal $color={colors.text4}>
                      현재 최대할인가에는 발급이 완료된 쿠폰만 적용되어있습니다.
                    </T.Caption1_Normal>
                  </div>
                  <div>
                    <span />
                    <T.Caption1_Normal $color={colors.text4}>
                      최대 할인가에 배송비는 포함되어 있지 않습니다. 결제 시 배송비가 추가될 수 있습니다.
                    </T.Caption1_Normal>
                  </div>
                </S.DescView>
              </>
            )}
            <Separator
              $height={1}
              $mv={16}
            />
            <S.ModalPriceInfo>
              <T.Body2_NormalM>배송정보</T.Body2_NormalM>

              <T.Body2_NormalB>{goodsInfo?.shippingInfo.shippingPolicyConditionText}</T.Body2_NormalB>
            </S.ModalPriceInfo>
            <S.ModalPriceInfo>
              <T.Body3_Normal></T.Body3_Normal>

              <T.Body3_Normal $color={colors.text4}>{getShippingText()}</T.Body3_Normal>
            </S.ModalPriceInfo>
          </S.BuyModalPriceInfo>
        </S.ModalContainer>
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default ProductBuyModal;
