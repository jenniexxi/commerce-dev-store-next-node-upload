import { axiosInstance } from './api';
import { OrderUrl } from './urls';
import {
  OrderPageResp,
  OrderSummaryBody,
  OrderSummaryResp,
  OrderListQuery,
  OrderListResp,
  OrderListPageInfoResp,
  OrderHistoryDetail,
  OrderRefundAccountResp,
  DeliveryTrackingResp,
  BuyConfirmFinishResp,
  CreateOrderReq,
  CreateOrderResp,
} from 'type/api/order';

/**
 * getOrderPage: 주문서 작성 화면 정보 조회
 * orderRefundAccount: (orders) 기존 주문 환불 계좌 조회
 * getDeliveryTracking: 배송추적 조회
 * buyConfirmFinish: 구매확정 변경
 */

const OrderAPI = {
  getOrderPage: (cartIdList: number[]): Promise<OrderPageResp> => {
    const query = new URLSearchParams({ cartIdList: cartIdList.toString() });
    return axiosInstance
      .get(OrderUrl.getOrderPage + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getOrderSummary: (body: OrderSummaryBody): Promise<OrderSummaryResp> => {
    return axiosInstance
      .post(OrderUrl.getOrderSummary, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getOrderList: (queryParam: OrderListQuery): Promise<OrderListResp> => {
    const query = new URLSearchParams({ ...queryParam, page: queryParam.page?.toString() || '0' });
    return axiosInstance
      .get(OrderUrl.getOrderList + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getOrderListPageInfo: (): Promise<OrderListPageInfoResp> => {
    return axiosInstance
      .get(OrderUrl.getOrderListPageInfo)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getOrderListDetail: (ordersIdEncrypt: string): Promise<OrderHistoryDetail> => {
    return axiosInstance
      .get(OrderUrl.getOrderListDetail(ordersIdEncrypt))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  orderRefundAccount: (ordersIdEncrypt: string): Promise<OrderRefundAccountResp> => {
    return axiosInstance
      .get(OrderUrl.orderRefundAccount(ordersIdEncrypt))
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getDeliveryTracking: (orderItemIdEncrypt: string): Promise<DeliveryTrackingResp> => {
    return axiosInstance
      .get(OrderUrl.getDeliveryTracking, { params: { orderItemIdEncrypt } })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  buyConfirmFinish: (orderItemIdEncryptList: string): Promise<BuyConfirmFinishResp> => {
    return axiosInstance
      .patch(OrderUrl.buyConfirmFinish, null, { params: { orderItemIdEncryptList: orderItemIdEncryptList } })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  createOrder: (body: CreateOrderReq): Promise<CreateOrderResp> => {
    return axiosInstance
      .post(OrderUrl.createOrder, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default OrderAPI;
