import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { RecentOrderList } from 'app/myPage/(main)/page';
import orderAPI from 'apis/orderApi';
import { OrderListQuery, OrderSummaryBody } from 'type/api/order';
import OrderAPI from 'apis/orderApi';
import { ClaimType } from 'type/api/claim';
import { PaymentRequireInfoResp } from 'type/api/system';

export const orederKeys = {
  base: ['order'] as const,
  getOrderList: () => [...orederKeys.base, 'getOrderList'] as const,
  getOrderRefundAccount: (ordersIdEncrypt: string) =>
    [...orederKeys.base, 'orderRefundAccountInfo', ordersIdEncrypt] as const,
  getOrderPage: (selectedCartId: number[]) => [...orederKeys.base, 'getOrderItem', selectedCartId] as const,
  getOrderSummary: (body: OrderSummaryBody) => [...orederKeys.base, 'getOrderSummary', body] as const,
  getOrderHistoryList: (searchParam: OrderListQuery) => [...orederKeys.base, 'OrderHistoryList', searchParam] as const,
  getOrderListDetail: (ordersIdEncrypt: string) => [...orederKeys.base, 'orderHistoryDetail', ordersIdEncrypt] as const,
};

export const useGetOrderList = (request: OrderListQuery) =>
  useQuery({
    queryKey: orederKeys.getOrderList(),
    queryFn: () => orderAPI.getOrderList(request),
    select: (resp) => {
      const allGoods: RecentOrderList[] = [];
      let count = 0;
      resp?.data.content?.some((order) => {
        return order.shippingList?.slice(0, 3).some((shipping) => {
          return shipping.goodsList?.slice(0, 3 - count).some((goods) => {
            if (count >= 3) return true;

            if (!goods.claimTypeEnum) {
              allGoods.push({
                ...goods,
                ordersIdEncrypt: order.ordersIdEncrypt,
                isAddItem: false,
                orderDate: order.orderDate,
              });
              count++;
            }

            return goods.addList?.slice(0, 3 - count).some((addGoods) => {
              if (count >= 3) return true;

              if (!addGoods.claimTypeEnum) {
                allGoods.push({
                  ...addGoods,
                  ordersIdEncrypt: order.ordersIdEncrypt,
                  isAddItem: true,
                  orderDate: order.orderDate,
                });
                count++;
              }

              return count >= 3;
            });
          });
        });
      });
      return allGoods;
    },
  });

export const useGetOrderRefundAccount = (ordersIdEncrypt: string, type: ClaimType) =>
  useQuery({
    queryKey: orederKeys.getOrderRefundAccount(ordersIdEncrypt),
    queryFn: () => OrderAPI.orderRefundAccount(ordersIdEncrypt),
    select: (resp) => resp,
    enabled: type !== 'Exchange',
  });

export const useGetOrderPage = (selectedCartId: number[]) =>
  useQuery({
    queryKey: orederKeys.getOrderPage(selectedCartId),
    queryFn: () => OrderAPI.getOrderPage(selectedCartId),
    select: (resp) => resp,
    enabled: !!selectedCartId,
  });

export const useGetOrderSummary = (body: OrderSummaryBody) =>
  useQuery({
    queryKey: orederKeys.getOrderSummary(body),
    queryFn: () => OrderAPI.getOrderSummary(body),
    select: (resp) => resp,
    enabled: body.zipCode !== '' && body.payToken !== '',
  });

export const useGetOrderHistoryList = (searchParam: OrderListQuery) =>
  useInfiniteQuery({
    queryKey: orederKeys.getOrderHistoryList(searchParam),
    queryFn: ({ pageParam }) =>
      OrderAPI.getOrderList({
        ...searchParam,
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.last || allPages.length >= lastPage.data.totalPages) {
        return undefined;
      }
      return allPages.length;
    },
  });

export const useGetOrderListDetail = (ordersIdEncrypt: string) =>
  useQuery({
    queryKey: orederKeys.getOrderListDetail(ordersIdEncrypt),
    queryFn: () => OrderAPI.getOrderListDetail(ordersIdEncrypt),
    select: (resp) => resp,
  });
