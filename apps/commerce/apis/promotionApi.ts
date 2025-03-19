/**
 * getGoodsCoupon : 상품의 쿠폰 다운로드 가능 목록 조회
 * postDownloadCoupon : 쿠폰코드로 쿠폰 발급
 * getOrderCouponList : 주문 보유 쿠폰 목록 조회 (장바구니에서)
 */

import { CouponListResp, OrderCouponListResp, CartCouponList } from 'type/api/promotion';
import { axiosInstance, APIResponse } from './api';
import { PromotionUrl } from './urls';

const PromotionAPI = {
  getGoodsCoupon: (goodsId: number): Promise<CouponListResp> => {
    return axiosInstance
      .get(PromotionUrl.getGoodsCoupon(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
      });
  },
  postDownloadCoupon: (code: string, body?: { goodsId: number }): Promise<APIResponse> => {
    return axiosInstance
      .post(PromotionUrl.postDownloadCoupon(code), body)
      .then((resp) => resp.data)
      .catch((e) => console.log(e));
  },
  getOrderCouponList: (cartId: number[]): Promise<OrderCouponListResp> => {
    const query = new URLSearchParams({ cartId: cartId.toString() });

    return axiosInstance
      .get(PromotionUrl.getOrderCouponList + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getCartCouponList: (): Promise<CartCouponList> => {
    return axiosInstance
      .get(PromotionUrl.getCartCouponList)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default PromotionAPI;
