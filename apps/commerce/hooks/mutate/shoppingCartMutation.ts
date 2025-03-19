import { useMutation } from '@tanstack/react-query';
import ShoppingCartAPI from 'apis/shoppingCartApi';
import {
  CartsCreateResp,
  CartsDeleteResp,
  CheckAvailableResp,
  CreateCartBody,
  UpdateCartBody,
  UpdateCartResp,
} from 'type/api/shoppingCart';

export const useDeleteCartItem = (onSuccessCallback?: (valiable: number[]) => void) => {
  const mutation = useMutation({
    mutationFn: (cartId: number[]) => {
      return ShoppingCartAPI.deleteCartList(cartId);
    },
    onSuccess: (_, variable) => {
      if (onSuccessCallback) {
        onSuccessCallback(variable);
      }
    },
  });

  return mutation;
};

export const useCheckAvaliable = (
  onSuccessCallback?: (resp: CheckAvailableResp, value: { cartId: number[]; isModify?: boolean }) => void,
) => {
  const mutation = useMutation({
    mutationFn: ({ cartId, isModify }: { cartId: number[]; isModify?: boolean }) => {
      return ShoppingCartAPI.getCartBuyAvailableCheck(cartId);
    },
    onSuccess: (resp, value) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp, value);
      }
    },
  });

  return mutation;
};

export const useCreateCart = (onSuccessCallback?: (resp: CartsCreateResp, value: CreateCartBody[]) => void) => {
  const mutation = useMutation({
    mutationFn: (body: CreateCartBody[]) => ShoppingCartAPI.createCart(body),
    onSuccess: (resp, value) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp, value);
      }
    },
  });

  return mutation;
};

export const useUpdateCart = (onSuccessCallback?: (resp: UpdateCartResp) => void) => {
  const mutation = useMutation({
    mutationFn: ({ cartId, goodsList }: { cartId: number; goodsList: UpdateCartBody[] }) =>
      ShoppingCartAPI.updateCart(cartId, goodsList),
    onSuccess: (resp, value) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};
