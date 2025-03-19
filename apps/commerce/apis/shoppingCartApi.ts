import {
  CartsListResp,
  CartsTotalResp,
  CreateCartBody,
  CartsCreateResp,
  CartsDeleteResp,
  MiniCartsListResp,
  CheckAvailableResp,
  UpdateCartBody,
  UpdateCartResp,
} from 'type/api/shoppingCart';
import { axiosInstance } from './api';
import { ShoppingUrl } from './urls';

/**
 * getCartList: 장바구니 조회
 * getCartTotal : 장바구니 총 합계 조회
 * updateCartItemCount : 장바구니 구매수량 수정 (일단 주석처리)
 * createCart : 장바구니 추가
 * deleteCartList : 장바구니 삭제
 *
 * getMiniCartList : 추가상품 조회
 * getCartBuyAvailableCheck : 장바구니 구매 가능 여부 확인
 * updateCart : 장바구니 수정
 */
const ShoppingCartAPI = {
  getCartList: (): Promise<CartsListResp> => {
    return axiosInstance
      .get(ShoppingUrl.getShoppingCart)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getCartTotal: (cartIdList: number[]): Promise<CartsTotalResp> => {
    const query = new URLSearchParams({ cartIdList: cartIdList.toString() });

    return axiosInstance
      .get(ShoppingUrl.getShoppingCartTotal + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  // updateCartItemCount: (cartId: number, buyCnt: number): Promise<UpdateCartResp> => {
  //   const url = ShoppingUrl.updateShoppingCart(cartId);

  //   return axiosInstance
  //     .patch(url, { buyCnt })
  //     .then((resp) => resp.data)
  //     .catch((e) => {
  //       console.error('API Error:', e);
  //       throw e;
  //     });
  // },
  createCart: (body: CreateCartBody[]): Promise<CartsCreateResp> => {
    const url = ShoppingUrl.createShoppingCart;

    return axiosInstance
      .post(url, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  deleteCartList: (cartIdList: number[]): Promise<CartsDeleteResp> => {
    const url = ShoppingUrl.deleteShoppingCart;

    return axiosInstance
      .delete(url, { data: { cartIdList } })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getMiniCartList: (goodsId: number): Promise<MiniCartsListResp> => {
    return axiosInstance
      .get(ShoppingUrl.getShoppingMiniCart(goodsId))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getCartBuyAvailableCheck: (cartIdList: number[]): Promise<CheckAvailableResp> => {
    const query = new URLSearchParams({ cartIdList: cartIdList.toString() });

    return axiosInstance
      .get(ShoppingUrl.getCartBuyAvailableCheck + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  updateCart: (cartId: number, goodsList: UpdateCartBody[]): Promise<UpdateCartResp> => {
    const url = ShoppingUrl.updateShoppingCart();

    return axiosInstance
      .put(url, { cartId, goodsList })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default ShoppingCartAPI;
