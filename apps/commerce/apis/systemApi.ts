import { AxiosResponse } from 'axios';
import { GetLayoutInfoResp } from 'type/api/system';
import {
  PaymentBuyerInfo,
  PaymentRequestBody,
  PaymentRequsetResp,
  PaymentResultBody,
  PaymentResultResp,
  CheckAccountReq,
  PaymentRequireInfoResp,
} from 'type/api/system';
import { axiosInstance, APIResponse } from './api';
import { SystemUrl } from './urls';

const SystemAPI = {
  getBuyerInfo: () => {
    return axiosInstance.get<AxiosResponse<PaymentBuyerInfo>>(SystemUrl.getBuyerInfo).then((resp) => resp.data);
  },
  getPaymentRequireInfo: (): Promise<PaymentRequireInfoResp> => {
    return axiosInstance
      .get(SystemUrl.getPaymentRequireInfo)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  postPaymentRequestInfo: (paymentGatewayIdEncrypt: string, body: PaymentRequestBody): Promise<PaymentRequsetResp> => {
    return axiosInstance
      .post(SystemUrl.postPaymentRequestInfo(paymentGatewayIdEncrypt), body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  postPaymentResult: (body: PaymentResultBody): Promise<PaymentResultResp> => {
    return axiosInstance
      .post(SystemUrl.postPaymentResult, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  postCheckAccount: (body: CheckAccountReq): Promise<APIResponse> => {
    return axiosInstance
      .post(SystemUrl.postCheckAccount, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  postCheckFreePaymentResult: (body: any): Promise<void> => {
    return axiosInstance
      .post(SystemUrl.postCheckFreePaymentResult, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
  getLayoutInfo: () => {
    return axiosInstance.get<AxiosResponse<GetLayoutInfoResp>>(SystemUrl.getLayoutInfo).then((resp) => resp.data);
  },
};

export default SystemAPI;
