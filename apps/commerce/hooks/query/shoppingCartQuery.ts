import { useQuery } from '@tanstack/react-query';
import ShoppingCartAPI from 'apis/shoppingCartApi';

export const shoppingCartKyes = {
  base: ['shoppingCart'] as const,
  getCartList: () => [...shoppingCartKyes.base, 'getShoppingCart'] as const,
  getCartTotal: () => [...shoppingCartKyes.base, 'getShopsTotalCarts'] as const,
  getMiniCartList: (goodsId: number) => [...shoppingCartKyes.base, 'getMiniCartItem', goodsId] as const,
};

export const useGetCartList = () =>
  useQuery({
    queryKey: shoppingCartKyes.getCartList(),
    queryFn: () => ShoppingCartAPI.getCartList(),
    select: (resp) => resp,
  });

export const useGetCartSummary = (allCartId: number[], success: boolean) =>
  useQuery({
    queryKey: shoppingCartKyes.getCartTotal(),
    queryFn: () => ShoppingCartAPI.getCartTotal(allCartId),
    select: (resp) => resp,
    enabled: success && allCartId.length !== 0,
  });

export const useGetMinicartList = (goodsId: number) =>
  useQuery({
    queryKey: shoppingCartKyes.getMiniCartList(goodsId),
    queryFn: () => ShoppingCartAPI.getMiniCartList(goodsId),
    select: (resp) => resp,
  });
