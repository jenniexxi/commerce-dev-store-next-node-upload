'use client';
import { useEffect, useRef, useState } from 'react';

import * as S from './Order.style';
import { useHeader, useRRoundPay } from '@ui/hooks';
import { CustomCartItem, CustomGoods } from '../cart/ShoppingCart';
import { HFMatchingTable, HFMatchingTableCodeName, HFPaymentTableCode } from 'type/orders';
import { useModalStore } from '@ui/stores';
import { useOrderStore } from 'stores/orderStore';
import { PaymentInstance } from '@ui/hooks/useRRoundPay';
import { CartsList, Goods } from 'type/api/shoppingCart';
import { GoodsDisplaySalesStatus } from 'type/display';
import {
  CashReceiptInfo,
  CouponInfoView,
  DelivieryInfo,
  Mileage,
  OrderList,
  OrderSummary,
  PaymentButton,
  RefundInfo,
} from './components';
import { Separator, T } from '@ui/commons';
import { colors } from '@ui/styles/theme';

import { Accordion } from '@ui/components';
import { useGetBuyerInfo, useGetPaymentRequireInfo } from 'hooks/query/systemQuery';
import { useGetOrderPage, useGetOrderSummary } from 'hooks/query/orderQuery';
import { useDeliveryStore } from 'stores/deliveryStore';
import { OrderSummaryBody } from 'type/api/order';

export type UsedMileageInfo = {
  shopping: string;
  pay: string;
};

type Props = {
  selectedCartId: number[];
};
const Order = ({ selectedCartId }: Props) => {
  useHeader('주문결제', { showHeader: true });
  const [usedMileage, setUsedMileage] = useState<UsedMileageInfo>({ shopping: '', pay: '' });
  // 배송지 관련 상태
  const [orderItems, setOrderItems] = useState<CustomCartItem[]>([]);

  // pay관련 state
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<HFPaymentTableCode | null>(null);
  const [orderSummaryBody, setOrderSummaryBody] = useState<OrderSummaryBody>({
    cartIdList: selectedCartId,
    zipCode: '',
    paymentMethodEnum: { code: 'ORDER.PAYMENT_METHOD.MONEY', codeName: '머니' },
    payToken: '',
  });

  const { showModal } = useModalStore();

  const { error, initialize, initializePayment, renderPaymentUI, updatePaymentUI, authenticate } = useRRoundPay();

  useEffect(() => {
    if (error?.message) {
      showModal.text(error?.message);
    }
  }, [error]);

  const { setBuyer, setDelCartIdList, setCartIdList, payment, setPayment } = useOrderStore();
  const { selectedAddr } = useDeliveryStore();

  const hfPaymentInstance = useRef<PaymentInstance>(null);

  // 쿠폰 관련
  console.log(selectedCartId);
  const { data: buyerInfo } = useGetBuyerInfo();

  const { data: paymentReqInfo } = useGetPaymentRequireInfo();

  const { data: orderInfo } = useGetOrderPage(selectedCartId);

  const { data: orderSummary } = useGetOrderSummary(orderSummaryBody);

  useEffect(() => {
    if (buyerInfo) {
      setBuyer({
        name: buyerInfo.buyer.buyerName,
        email: buyerInfo.buyer.buyerEmail,
        cellPhone: buyerInfo.buyer.buyerCellPhone,
      });
    }
  }, [buyerInfo]);

  useEffect(() => {
    if (selectedAddr) {
      setOrderSummaryBody((prev) => ({ ...prev, zipCode: selectedAddr?.zipCode }));
    }
  }, [selectedAddr]);

  useEffect(() => {
    if (paymentReqInfo?.success) {
      setOrderSummaryBody((prev) => ({ ...prev, payToken: paymentReqInfo.data.hectoPg.payToken }));
      setPayment({ ...payment, payToken: paymentReqInfo.data.hectoPg.payToken });
    }
  }, [paymentReqInfo]);

  //
  useEffect(() => {
    if (selectedMethod) {
      const method = selectedMethod as keyof typeof HFMatchingTable;

      setPayment({ ...payment, paymentMethodEnum: HFMatchingTable[method] });
      setOrderSummaryBody((prev) => ({
        ...prev,
        paymentMethodEnum: {
          code: HFMatchingTable[method],
          codeName: HFMatchingTableCodeName[method],
        },
      }));
    }
  }, [selectedMethod]);

  useEffect(() => {
    if (selectedCartId) {
      setCartIdList(selectedCartId);
      setDelCartIdList([]);
    }
  }, [selectedCartId]);

  useEffect(() => {
    if (paymentReqInfo?.success) {
      const initSDK = async () => {
        try {
          // API에서 shopId 가져오기

          // SDK 초기화
          await initialize({
            shopId: paymentReqInfo.data.hectoPg.shopId,
            mode: 'development',
          });

          setIsInitialized(true);
        } catch (err) {
          console.error('SDK 초기화 실패:', err);
        }
      };

      initSDK();
    }
  }, [paymentReqInfo, initialize]);

  useEffect(() => {
    if (!orderSummary?.success || !paymentReqInfo?.success) return;

    if (!isInitialized) return;

    const setupPayment = async () => {
      try {
        const paymentsInstance = await initializePayment({
          payToken: paymentReqInfo.data.hectoPg.payToken,
          payPrice: orderSummary.data.pgPaymentPrice.number,
          deliveryFee: orderSummary.data.shippingPrice.number,
          method: ['ALL'],
        });
        hfPaymentInstance.current = paymentsInstance;
        // 결제 UI 렌더링
        const paymentMethod = await renderPaymentUI(paymentsInstance, '#payment-container');

        // 결제수단 선택 이벤트 리스닝
        paymentMethod.event('SELECT_PAYMENTS_METHOD', (method: string) => {
          setSelectedMethod(method);
        });
      } catch (err) {
        console.error('결제 초기화 실패:', err);
      }
    };

    setupPayment();
  }, [paymentReqInfo, orderSummary, isInitialized, initializePayment, renderPaymentUI]);

  useEffect(() => {
    if (orderInfo?.success) {
      setOrderItems((prev) => transformCartList(orderInfo.data.cartList, prev));
    }
  }, [orderInfo]);

  const transformCartList = (cartsList: CartsList[], prevData: CustomCartItem[]): CustomCartItem[] => {
    return cartsList.map((cart) => {
      const prevCompany = prevData?.find((prev) => prev.companyId === cart.company.companyId);
      const disableStates: boolean[] = [];

      const transformedShippingList = cart.shippingList.map((shippingGroup) => {
        // goodsId를 기준으로 상품들을 그룹화
        const groupedGoods = shippingGroup.goodsList.reduce(
          (acc, goods) => {
            const key = goods.goodsId;
            if (!acc[key]) {
              acc[key] = {
                goods: [],
                baseInfo: {
                  displaySaleStatusEnum: goods.displaySaleStatusEnum,
                  goodsId: goods.goodsId,
                  imageFilesUrl: goods.imageFilesUrl,
                  brandName: goods.brandName,
                  displayGoodsName: goods.displayGoodsName,
                  shippingPaymentPrice: goods.shippingPaymentPrice,
                  adultYn: goods.adultYn,
                  shippingPolicyConditionText: goods.shippingPolicyConditionText,
                  cartId: goods.cartId,
                },
              };
            }
            acc[key].goods.push(goods);
            return acc;
          },
          {} as Record<number, { goods: Goods[]; baseInfo: Partial<CustomGoods> }>,
        );

        // 그룹화된 상품들을 CustomGoods 형태로 변환
        const transformedGoodsList = Object.entries(groupedGoods).map(([goodsId, group]) => {
          const allCartIds = group.goods.map((g) => g.cartId);

          // 전체 결제 금액 계산 (옵션 + 추가상품)
          const optionsTotalPrice = group.goods.reduce((sum, goods) => {
            return (
              sum +
              goods.paymentPrice.number +
              (goods.addGoodsList?.reduce((addSum, addGoods) => addSum + addGoods.paymentPrice.number, 0) || 0)
            );
          }, 0);

          const optionsRecommendTotalPrice = group.goods.reduce((sum, goods) => {
            return (
              sum +
              goods.recommendPrice.number +
              (goods.addGoodsList?.reduce((addSum, addGoods) => addSum + addGoods.paymentPrice.number, 0) || 0)
            );
          }, 0);

          // 그룹 내 상품들의 disabled 상태 확인
          const isAnyDisabled = group.goods.some(
            (goods) => goods.displaySaleStatusEnum.code !== GoodsDisplaySalesStatus.OnSale,
          );
          disableStates.push(isAnyDisabled);

          // 그룹의 체크 상태 계산
          let prevCheckedState = true; // 기본값

          if (group.goods.length > 0 && prevCompany) {
            const firstGoodsItem = group.goods[0]; // 변수로 추출

            if (firstGoodsItem) {
              // 명시적으로 null/undefined 체크
              const foundGoods = prevCompany.shippingList
                .flatMap((s) => s.goodsList)
                .find((g) => g.cartIdList.includes(firstGoodsItem.cartId));

              if (foundGoods) {
                prevCheckedState = foundGoods.isChecked;
              }
            }
          }

          // CustomGoods 형태로 변환
          return {
            cartIdList: allCartIds,
            ...group.baseInfo,
            totalPaymentPrice: {
              number: optionsTotalPrice,
              currencyCode: group.goods[0]?.paymentPrice.currencyCode,
            },
            totalRecommendPrice: {
              number: optionsRecommendTotalPrice,
              currencyCode: group.goods[0]?.recommendPrice.currencyCode,
            },
            optionList: group.goods,
            isChecked: isAnyDisabled ? false : prevCheckedState,
            disabled: isAnyDisabled,
            addGoodsList: group.goods.flatMap((goods) => goods.addGoodsList || []),
          } as CustomGoods;
        });

        return {
          shipping: shippingGroup.shipping,
          goodsList: transformedGoodsList,
        };
      });

      const isAllDisabled = disableStates.length > 0 && disableStates.every((state) => state);

      return {
        companyId: cart.company.companyId,
        storeName: cart.company.storeName,
        isChecked: prevCompany?.isChecked ?? true,
        disabled: isAllDisabled,
        shippingList: transformedShippingList,
      };
    });
  };

  const accordionItems = [
    {
      title: '배송 정보',
      content: <DelivieryInfo />,
    },
    {
      title: (
        <S.OrderAccTitle>
          <T.Headline2B>주문상품</T.Headline2B>

          <S.OrderDescText>
            <T.Body2_Normal $color={colors.text5}>
              {orderInfo?.data?.cartList[0]?.shippingList[0]?.goodsList[0]?.displayGoodsName}
            </T.Body2_Normal>
            {orderInfo?.data?.cartList.length && (
              <T.Body2_Normal $color={colors.text5}>
                {orderInfo?.data.cartList.length !== 1 && `외 ${orderInfo?.data.cartList.length - 1}건`}
              </T.Body2_Normal>
            )}
          </S.OrderDescText>
        </S.OrderAccTitle>
      ),

      content: <OrderList orderData={orderItems} />,
    },
  ];

  const accordionBottomItems = [
    ...(buyerInfo?.buyer.pay010UseYn
      ? [
          {
            title: '라운드페이포인트 ',
            content: (
              <Mileage
                payMileageInfo={orderInfo?.data?.pay010Mileage}
                mileage={usedMileage}
                setMileage={setUsedMileage}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <S.OrderContainer>
      <Accordion
        items={accordionItems}
        isGroup={false}
        defaultOpenIndex={[0]}
      />

      <CouponInfoView
        coupon={orderInfo?.data?.coupon}
        doubleCoupon={orderInfo?.data?.dupCoupon}
        storeCoupon={orderInfo?.data?.storeCoupon}
        orderData={orderItems}
        cartId={selectedCartId}
      />
      <Separator $height={8} />
      <Accordion
        items={accordionBottomItems}
        isGroup={false}
        defaultOpenIndex={[0]}
      />
      <S.PaymentMethod id={'payment-container'} />
      <Separator $height={8} />

      {selectedMethod === 'VACT' && (
        <RefundInfo
          bank={orderInfo?.data.bank}
          bankListEnum={paymentReqInfo?.data.bankEnumList}
        />
      )}
      {(selectedMethod === 'MONYNORM' || selectedMethod === 'BANKACCT' || selectedMethod === 'VACT') && (
        <CashReceiptInfo cashReceipt={orderInfo?.data?.cashReceipt} />
      )}

      <OrderSummary summaryData={orderSummary?.data} />
      <Separator $height={8} />
      <PaymentButton
        paymentPrice={orderSummary?.data?.pgPaymentPrice}
        hfInstance={hfPaymentInstance}
      />
    </S.OrderContainer>
  );
};

export default Order;
