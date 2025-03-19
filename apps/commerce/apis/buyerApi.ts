import {
  BuyersCreateResp,
  BuyersResp,
  CreateBuyersBody,
  DeleteBuyersResp,
  MyAddressCountResp,
  MyAddressResp,
  UpdateBuyersResp,
} from 'type/api/buyer';
import { BuyersUrl } from './urls';
import { axiosInstance } from './api';

/**
 * 배송지 관련 API 함수 모음
 */
const BuyersAPI = {
  /**
   * 새로운 배송지를 등록합니다
   * @param {CreateBuyersBody} body - 배송지 생성 정보
   * @returns {Promise<BuyersCreateResp>} 배송지 생성 결과
   */
  createBuyers: (body: CreateBuyersBody): Promise<BuyersCreateResp> => {
    const url = BuyersUrl.createBuyers;
    return axiosInstance
      .post(url, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  /**
   * 특정 배송지 정보를 조회합니다
   * @param {string} buyerAddressIdEncrypt - 배송지 식별자
   * @returns {Promise<BuyersResp>} 배송지 정보
   */
  getBuyers: (buyerAddressIdEncrypt: string): Promise<BuyersResp> => {
    const url = BuyersUrl.getBuyers(buyerAddressIdEncrypt);
    return axiosInstance
      .get(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  /**
   * 특정 배송지 정보를 수정합니다
   * @param {string} buyerAddressIdEncrypt - 배송지 식별자
   * @param {CreateBuyersBody} body - 수정할 배송지 정보
   * @returns {Promise<UpdateBuyersResp>} 수정 결과
   */
  updateBuyers: (buyerAddressIdEncrypt: string, body: CreateBuyersBody): Promise<UpdateBuyersResp> => {
    const url = BuyersUrl.updateBuyers(buyerAddressIdEncrypt);
    return axiosInstance
      .put(url, body)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  /**
   * 특정 배송지를 삭제합니다
   * @param {string} buyerAddressIdEncrypt - 배송지 식별자
   * @returns {Promise<DeleteBuyersResp>} 삭제 결과
   */
  deleteBuyers: (buyerAddressIdEncrypt: string): Promise<DeleteBuyersResp> => {
    const url = BuyersUrl.deleteBuyers(buyerAddressIdEncrypt);
    return axiosInstance
      .delete(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  /**
   * 사용자의 모든 배송지 목록을 조회합니다
   * @returns {Promise<MyAddressResp>} 배송지 목록
   */
  getMyAddresses: (): Promise<MyAddressResp> => {
    const url = BuyersUrl.getMyAddress;
    return axiosInstance
      .get(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },

  /**
   * 사용자의 배송지 개수를 조회합니다
   * @returns {Promise<MyAddressCountResp>} 배송지 개수
   */
  getMyAddressCount: (): Promise<MyAddressCountResp> => {
    const url = BuyersUrl.getMyAddressCount;
    return axiosInstance
      .get(url)
      .then((resp) => resp.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default BuyersAPI;
