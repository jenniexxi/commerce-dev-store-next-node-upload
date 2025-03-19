export type GoodsAutoTypeCode =
  | 'DISPLAY.GOODS_AUTO_TYPE.DAY' //일간 베스트
  | 'DISPLAY.GOODS_AUTO_TYPE.WEEK' //주간 베스트
  | 'DISPLAY.GOODS_AUTO_TYPE.MONTH'; //월간 베스트

const PAGE_INFO_ERROR_CODES = {
  NOT_DISPLAY: 'DISPLAY.GET_BEST.NOT_DISPLAY', //BEST 비활성화
} as const;

export type PageInfoErrorCode = (typeof PAGE_INFO_ERROR_CODES)[keyof typeof PAGE_INFO_ERROR_CODES];

//   카테고리 정렬 타입 Enum
export const DISPLAY_GOODS_SORT_TYPE = {
  /** 인기 순 */
  BEST: 'DISPLAY.GOODS_SORT_TYPE.BEST',
  /** 최근 등록 순 */
  NEW: 'DISPLAY.GOODS_SORT_TYPE.NEW',
  /** 낮은 가격 순 */
  LOW_PRICE: 'DISPLAY.GOODS_SORT_TYPE.LOW_PRICE',
  /** 높은 가격 순 */
  HIGH_PRICE: 'DISPLAY.GOODS_SORT_TYPE.HIGH_PRICE',
};

/** 상품 정렬기준 코드 */
export type DisplayGoodsSortTypeCode = (typeof DISPLAY_GOODS_SORT_TYPE)[keyof typeof DISPLAY_GOODS_SORT_TYPE];

/**
 * 노출 상품 판매상태
 */
export const GoodsDisplaySalesStatus = {
  /** 판매대기 */
  Wait: 'GOODS.DISPLAY_SALE_STATUS.WAIT',
  /** 판매증 */
  OnSale: 'GOODS.DISPLAY_SALE_STATUS.SALE',
  /** 일시품절 */
  SoldOut: 'GOODS.DISPLAY_SALE_STATUS.OUT_OF_STOCK',
  /** 판매중지 */
  Stop: 'GOODS.DISPLAY_SALE_STATUS.STOP',
  /** 판매종료 */
  End: 'GOODS.DISPLAY_SALE_STATUS.FIN_SALE',
} as const;

/**
 * 노출 상품 판매상태 코드 값
 */
export type GoodsDisplaySalesStatusKey = (typeof GoodsDisplaySalesStatus)[keyof typeof GoodsDisplaySalesStatus];

/**
 * 디바이스 타입
 */
export const DEVICE_TYPE_CODES = {
  /** 전체 */
  APP: 'BASE.DEVICE_TYPE.APP',
  /** PC */
  PC: 'BASE.DEVICE_TYPE.PC',
  /** Mobile */
  MOBILE: 'BASE.DEVICE_TYPE.MOBILE',
} as const;

export type DeviceTypeCode = (typeof DEVICE_TYPE_CODES)[keyof typeof DEVICE_TYPE_CODES];

/** 상품 노출 기준 */
const GOODS_DISPLAY_TYPE = {
  /** 자동 */
  AUTO: 'DISPLAY.GOODS_DISPLAY_TYPE.AUTO',
  /** 수동 */
  MANUAL: 'DISPLAY.GOODS_DISPLAY_TYPE.MANUAL',
} as const;

/** 상품 노출 기준 코드 */
export type GoodsDisplayTypeCode = (typeof GOODS_DISPLAY_TYPE)[keyof typeof GOODS_DISPLAY_TYPE];

/** 상품 그룹 기준 */
const GOODS_GROUP_TYPE = {
  /** 전체상품 */
  ALL: 'DISPLAY.GOODS_GROUP_TYPE.ALL',
  /** 카테고리 */
  CATEGORY: 'DISPLAY.GOODS_GROUP_TYPE.CATEGORY',
} as const;

/** 상품 그룹 기준 코드 */
export type GoodsGroupTypeCode = (typeof GOODS_GROUP_TYPE)[keyof typeof GOODS_GROUP_TYPE];
