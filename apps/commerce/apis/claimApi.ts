import {
  AddPaymentListResp,
  CancelRefundInfoInquiryRequestBody,
  CancelRefundInfoInquiryResp,
  CheckCancelRequestAvailable,
  CheckCancelRequestResp,
  ClaimCancelInfoViewResp,
  ClaimCancelRequestBody,
  ClaimCancelRequestResp,
  ClaimExchangeInfoViewResp,
  ClaimExchangeRequestBody,
  ClaimListQuery,
  ClaimListResp,
  ClaimOrderDetailResp,
  ClaimProcessRespCommon,
  ClaimType,
  ConfirmIsExchangeRequestBody,
  ConfirmIsExchangeResp,
  ExchangeRefundInfoInquiryRequestBody,
  ExchangeRefundInfoInquiryResp,
} from 'type/api/claim';
import { APIResponse, axiosInstance } from './api';
import { ClaimUrl } from './urls';
import { Code } from './apiCommonType';
import { ClaimTypeKey } from 'type/claims';

const ClaimAPI = {
  /**
   * getClaimOrderDetail: 클레임 조회
   * claimCancelInfoView: 클레임 취소 요청 화면 정보 조회
   * cancelRefundInfoInquiry: 취소 환불정보 조회
   * claimCancelRequest: 클레임 취소 처리
   *
   * claimExchangeInfoView: 클레임 교환 요청 화면 정보 조회
   * exchangeRefundInfoInquiry: 교환 환불정보 조회
   * claimExchangeRequest: 클레임 교환 처리
   * confirmIsExchangeOrder: 주문 교환 가능 확인
   *
   * claimReturnInfoView: 클레임 반품 요청 화면 정보 조회
   * returnRefundInfoInquiry: 반품 환불정보 조회
   * claimReturnRequest: 클레임 반품 처리
   */
  getClaimOrderDetail: (orderClaimIdEncrypt: string): Promise<ClaimOrderDetailResp> => {
    const url = ClaimUrl.getClaimOrderDetail(orderClaimIdEncrypt);
    return axiosInstance
      .get(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimCancelInfoView: ({
    ordersIdEncrypt,
    orderShippingPriceIdEncrypt,
  }: {
    ordersIdEncrypt: string;
    orderShippingPriceIdEncrypt?: string;
  }): Promise<ClaimCancelInfoViewResp> => {
    const query = new URLSearchParams({
      ordersIdEncrypt,
      ...(orderShippingPriceIdEncrypt && { orderShippingPriceIdEncrypt }),
    });

    return axiosInstance
      .get(ClaimUrl.claimCancelInfoView + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  cancelRefundInfoInquiry: (body: CancelRefundInfoInquiryRequestBody): Promise<CancelRefundInfoInquiryResp> => {
    return axiosInstance
      .post(ClaimUrl.cancelRefundInfoInquiry, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimCancelRequest: (body: ClaimCancelRequestBody): Promise<ClaimCancelRequestResp> => {
    return axiosInstance
      .post(ClaimUrl.claimCancelRefundRequest, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimExchangeInfoView: ({
    ordersIdEncrypt,
    orderShippingPriceIdEncrypt,
  }: {
    ordersIdEncrypt: string;
    orderShippingPriceIdEncrypt?: string;
  }): Promise<ClaimExchangeInfoViewResp> => {
    const query = new URLSearchParams({
      ordersIdEncrypt,
      ...(orderShippingPriceIdEncrypt && { orderShippingPriceIdEncrypt }),
    });

    return axiosInstance
      .get(ClaimUrl.claimExchangeInfoView + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  exchangeRefundInfoInquiry: (body: ExchangeRefundInfoInquiryRequestBody): Promise<ExchangeRefundInfoInquiryResp> => {
    return axiosInstance
      .post(ClaimUrl.exchangeRefundInfoInquiry, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimExchangeRequest: (body: ClaimExchangeRequestBody): Promise<ClaimProcessRespCommon> => {
    return axiosInstance
      .post(ClaimUrl.claimExchangeRequest, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  confirmIsExchangeOrder: (body: ConfirmIsExchangeRequestBody): Promise<ConfirmIsExchangeResp> => {
    return axiosInstance
      .post(ClaimUrl.confirmIsExchangeOrder, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimReturnInfoView: ({
    ordersIdEncrypt,
    orderShippingPriceIdEncrypt,
  }: {
    ordersIdEncrypt: string;
    orderShippingPriceIdEncrypt?: string;
  }): Promise<ClaimExchangeInfoViewResp> => {
    const query = new URLSearchParams({
      ordersIdEncrypt,
      ...(orderShippingPriceIdEncrypt && { orderShippingPriceIdEncrypt }),
    });

    return axiosInstance
      .get(ClaimUrl.claimReturnInfoView + '?' + query.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  returnRefundInfoInquiry: (body: ExchangeRefundInfoInquiryRequestBody): Promise<CancelRefundInfoInquiryResp> => {
    return axiosInstance
      .post(ClaimUrl.returnRefundInfoInquiry, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  claimReturnRequest: (body: ClaimExchangeRequestBody): Promise<ClaimProcessRespCommon> => {
    return axiosInstance
      .post(ClaimUrl.claimReturnRequest, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getClaimList: (query: ClaimListQuery): Promise<ClaimListResp> => {
    const queryParam = new URLSearchParams({
      page: query.page.toString(),
      size: query.size.toString(),
      mypageItemStatusEnum: query.mypageItemStatusEnum.toString(),
      startDate: query.startDate,
      endDate: query.endDate,
      ...(query.goodsName && { goodsName: query.goodsName }),
    });
    return axiosInstance
      .get(ClaimUrl.getClaimList + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  cancelClaim: (type: ClaimType, orderClaimIdEncrypt: string): Promise<APIResponse> => {
    if (type === 'Cancel') {
      return axiosInstance
        .patch(ClaimUrl.cancelClaimCancel(orderClaimIdEncrypt))
        .then((resp) => resp.data)
        .catch((e) => {
          console.log(e);
          throw e;
        });
    } else if (type === 'Return') {
      return axiosInstance
        .patch(ClaimUrl.cancelClaimReturn(orderClaimIdEncrypt))
        .then((resp) => resp.data)
        .catch((e) => {
          console.log(e);
          throw e;
        });
    } else {
      return axiosInstance
        .patch(ClaimUrl.cancelClaimExchange(orderClaimIdEncrypt))
        .then((resp) => resp.data)
        .catch((e) => {
          console.log(e);
          throw e;
        });
    }
  },
  getAddPaymentList: (query: { page: number; size: number }): Promise<AddPaymentListResp> => {
    const queryParam = new URLSearchParams({
      page: query.page.toString(),
      size: query.size.toString(),
    });
    return axiosInstance
      .get(ClaimUrl.getAddPaymentList + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  getCheckClaimAvailable: (
    orderItemIdEncryptList: string[],
    claimTypeEnum: Code<ClaimTypeKey>,
  ): Promise<APIResponse> => {
    const queryParam = new URLSearchParams({
      orderItemIdEncryptList: orderItemIdEncryptList.toString(),
      claimTypeEnum: JSON.stringify(claimTypeEnum),
    });
    return axiosInstance
      .get(ClaimUrl.getCheckClaimAvailable + '?' + queryParam.toString())
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  checkCancelRequestAvailable: (body: CheckCancelRequestAvailable): Promise<CheckCancelRequestResp> => {
    return axiosInstance
      .post(ClaimUrl.checkCancelRequestAvailable, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
};

export default ClaimAPI;
