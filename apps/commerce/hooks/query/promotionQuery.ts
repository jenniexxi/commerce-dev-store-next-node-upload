import { useQuery } from '@tanstack/react-query';
import PromotionAPI from 'apis/promotionApi';

export const promotionKyes = {
  base: ['promotion'] as const,
  getCartCouponList: () => [...promotionKyes.base, 'getCartCoupon'] as const,
  getGoodsCoupon: (goodsId: number) => [...promotionKyes.base, 'getCoupon', goodsId] as const,
  getOrderCouponList: (cartId: number[]) => [...promotionKyes.base, 'getOrderCouponList', cartId] as const,
};

export const useGetCartCouponList = () =>
  useQuery({
    queryKey: promotionKyes.getCartCouponList(),
    queryFn: () => PromotionAPI.getCartCouponList(),
    select: (resp) => resp,
  });

export const useGetGoodsCouponList = (goodsId: number) =>
  useQuery({
    queryKey: promotionKyes.getGoodsCoupon(goodsId),
    queryFn: () => PromotionAPI.getGoodsCoupon(goodsId),
    select: (resp) => resp,
  });

export const useGetOrderCouponList = (cartId: number[], enabled: boolean) =>
  useQuery({
    queryKey: promotionKyes.getOrderCouponList(cartId),
    queryFn: () => PromotionAPI.getOrderCouponList(cartId),
    select: (resp) => resp,
    enabled: enabled,
  });
