import { useMutation } from '@tanstack/react-query';
import { APIResponse } from 'apis/api';
import { Code } from 'apis/apiCommonType';
import ClaimAPI from 'apis/claimApi';
import {
  CancelRefundInfoInquiryRequestBody,
  CancelRefundInfoInquiryResp,
  CheckCancelRequestAvailable,
  CheckCancelRequestResp,
  ClaimCancelRequestBody,
  ClaimExchangeRequestBody,
  ClaimType,
  ConfirmIsExchangeRequestBody,
  ConfirmIsExchangeResp,
  ExchangeRefundInfoInquiryRequestBody,
  ExchangeRefundInfoInquiryResp,
} from 'type/api/claim';
import { ClaimTypeKey } from 'type/claims';

export const useCancelClaim = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: ({ type, orderClaimIdEncrypt }: { type: ClaimType; orderClaimIdEncrypt: string }) =>
      ClaimAPI.cancelClaim(type, orderClaimIdEncrypt),
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};

export const useCancelRefundInfo = (onSuccessCallback?: (response: CancelRefundInfoInquiryResp) => void) => {
  const mutation = useMutation({
    mutationFn: (body: CancelRefundInfoInquiryRequestBody) => ClaimAPI.cancelRefundInfoInquiry(body),
    onSuccess: (response) => {
      if (onSuccessCallback) {
        onSuccessCallback(response);
      }
    },
  });

  return mutation;
};

export const useClaimCancelRequest = (onSuccessCallback?: (resp: APIResponse) => void) => {
  const mutation = useMutation({
    mutationFn: (body: ClaimCancelRequestBody) => ClaimAPI.claimCancelRequest(body),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};

export const useConfirmIsExchangeOrder = (onSuccessCallback?: (response: ConfirmIsExchangeResp) => void) => {
  const mutation = useMutation({
    mutationFn: (body: ConfirmIsExchangeRequestBody) => ClaimAPI.confirmIsExchangeOrder(body),
    onSuccess: (response) => {
      if (onSuccessCallback) {
        onSuccessCallback(response);
      }
    },
  });

  return mutation;
};

export const useExchangeRefundInfoInquiry = (onSuccessCallback?: (response: ExchangeRefundInfoInquiryResp) => void) => {
  const mutation = useMutation({
    mutationFn: (body: ExchangeRefundInfoInquiryRequestBody) => ClaimAPI.exchangeRefundInfoInquiry(body),
    onSuccess: (response) => {
      if (onSuccessCallback) {
        onSuccessCallback(response);
      }
    },
  });

  return mutation;
};

export const useClaimExchangeRequest = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: (body: ClaimExchangeRequestBody) => ClaimAPI.claimExchangeRequest(body),
    onSuccess: (response) => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};

export const useReturnRefundInfoInquiry = (onSuccessCallback?: (response: CancelRefundInfoInquiryResp) => void) => {
  const mutation = useMutation({
    mutationFn: (body: ExchangeRefundInfoInquiryRequestBody) => ClaimAPI.returnRefundInfoInquiry(body),
    onSuccess: (response) => {
      if (onSuccessCallback) {
        onSuccessCallback(response);
      }
    },
  });

  return mutation;
};

export const useClaimReturnRequest = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: (body: ClaimExchangeRequestBody) => ClaimAPI.claimReturnRequest(body),
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};

export const useGetCheckClaimAvailable = (onSuccessCallback?: (resp: APIResponse) => void) => {
  const mutation = useMutation({
    mutationFn: (body: { orderItemIdEncryptList: string[]; claimTypeEnum: Code<ClaimTypeKey> }) =>
      ClaimAPI.getCheckClaimAvailable(body.orderItemIdEncryptList, body.claimTypeEnum),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};

export const useCheckCancelRequestAvailable = (onSuccessCallback?: (resp: CheckCancelRequestResp) => void) => {
  const mutation = useMutation({
    mutationFn: (body: CheckCancelRequestAvailable) => ClaimAPI.checkCancelRequestAvailable(body),
    onSuccess: (resp) => {
      if (onSuccessCallback) {
        onSuccessCallback(resp);
      }
    },
  });

  return mutation;
};
