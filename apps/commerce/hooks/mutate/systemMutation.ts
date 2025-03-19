import { useMutation } from '@tanstack/react-query';
import { APIResponse } from 'apis/api';

import SystemAPI from 'apis/systemApi';
import {
  CheckAccountReq,
  PaymentRequestBody,
  PaymentRequsetResp,
  PaymentResultBody,
  PaymentResultResp,
} from 'type/api/system';

export const usePaymentRequestInfo = (onSuccessCallback?: (resp: PaymentRequsetResp) => void) => {
  const mutation = useMutation({
    mutationFn: ({ paymentGatewayIdEncrypt, body }: { paymentGatewayIdEncrypt: string; body: PaymentRequestBody }) =>
      SystemAPI.postPaymentRequestInfo(paymentGatewayIdEncrypt, body),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};

export const useCheckAccount = (onSuccessCallback?: (resp: APIResponse) => void) => {
  const mutation = useMutation({
    mutationFn: (body: CheckAccountReq) => SystemAPI.postCheckAccount(body),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};

export const usePaymentResult = (onSuccessCallback?: (resp: PaymentResultResp) => void) => {
  const mutation = useMutation({
    mutationFn: (body: PaymentResultBody) => SystemAPI.postPaymentResult(body),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};
