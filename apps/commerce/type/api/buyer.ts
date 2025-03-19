import { APIResponse } from 'apis/api';

/**
 * 배송지 식별자 타입
 */
export type Encrypt = {
  /** 배송지 고유 식별자 */
  buyerAddressIdEncrypt: string;
};
/**
 * 배송지 정보 타입
 */
export type DeliveryAddress = {
  /** 기본 배송지 여부 */
  defaultYn: boolean;
  /** 수령인 이름 */
  receiverName: string;
  /** 배송지명 */
  name: string;
  /** 우편번호 */
  zipCode: string;
  /** 건물 코드 */
  buildingCode: string;
  /** 기본 주소 */
  receiverAddress: string;
  /** 상세 주소 */
  receiverAddressDetail: string;
  /** 수령인 연락처 */
  receiverCellPhone: string;
};

/**
 * 배송지 생성 요청 바디 타입
 */
export type CreateBuyersBody = {
  /** 수령인 이름 */
  receiverName: string;
  /** 배송지 주소 */
  receiverAddress: string;
  /** 수령인 연락처 */
  receiverCellPhone: string;
  /** 기본 배송지 여부 */
  defaultYn?: boolean;
  /** 배송지명 */
  name?: string;
  /** 우편번호 */
  zipCode?: string;
  /** 건물 코드 */
  buildingCode?: string;
  /** 상세 주소 */
  receiverAddressDetail?: string;
};

/** 배송지 생성 응답 타입 */
export type BuyersCreateResp = APIResponse & {
  data: object;
};

/** 배송지 조회 응답 타입 */
export type BuyersResp = APIResponse & {
  data: DeliveryAddress[];
};

/** 배송지 수정 응답 타입 */
export type UpdateBuyersResp = APIResponse & {
  data: object;
};

/** 배송지 삭제 응답 타입 */
export type DeleteBuyersResp = APIResponse & {
  data: object;
};

/** 내 배송지 목록 조회 응답 타입 */
export type MyAddressResp = APIResponse & {
  data: (Encrypt & DeliveryAddress)[];
};

/** 내 배송지 개수 조회 응답 타입 */
export type MyAddressCountResp = APIResponse & {
  data: number;
};
