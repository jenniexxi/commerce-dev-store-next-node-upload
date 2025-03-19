import { useMutation } from '@tanstack/react-query';
import OrderAPI from 'apis/orderApi';
import { BuyConfirmFinishResp, CreateOrderReq, CreateOrderResp, DeliveryTrackingResp } from 'type/api/order';

export const useCreateOrder = (onSuccessCallback?: (resp: CreateOrderResp) => void) => {
  const mutation = useMutation({
    mutationFn: (body: CreateOrderReq) => OrderAPI.createOrder(body),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};

export const useConfirmOrder = (onSuccessCallback?: (resp: BuyConfirmFinishResp) => void) => {
  const mutation = useMutation({
    mutationFn: (orderItemIdEncryptList: string[]) => OrderAPI.buyConfirmFinish(orderItemIdEncryptList.toString()),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};

export const useGetDeliveryTracking = (onSuccessCallback?: (resp: DeliveryTrackingResp) => void) => {
  const mutation = useMutation({
    mutationFn: (orderItemIdEncrypt: string) => OrderAPI.getDeliveryTracking(orderItemIdEncrypt.toString()),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};
