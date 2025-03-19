import { APIResponse } from 'apis/api';
import { Code, Price } from 'apis/apiCommonType';
import {
  CouponBaseDateTypeCode,
  CouponTypeCode,
  DeviceTypeCode,
  DiscountRangeTypeCode,
  DiscountTypeCode,
  UseDateTypeCode,
} from 'type';

export type CouponInfo = {
  couponId: number;
  displayName: string;
  typeEnum: Code<CouponTypeCode>;
  code: string;
  deviceTypeEnumList: Code<DeviceTypeCode>[];
  discountTypeEnum: Code<DiscountTypeCode>;
  discountValue: number;
  useDateTypeEnum: Code<UseDateTypeCode>;
  useStartDatetime: string;
  useEndDatetime: string;
  issueStartDatetime: string;
  issueEndDatetime: string;
  minGoodsYn: boolean;
  minGoodsPrice: Price;
  maxDiscountYn: boolean;
  maxDiscountPrice: Price;
  discountRangeTypeEnum: Code<DiscountRangeTypeCode>;
  downloadYn: boolean;
  baseDateTypeEnum: Code<CouponBaseDateTypeCode>;
  baseDateValue: number;
};

export type OrderCouponInfo = {
  couponId: number;
  couponIssueId: number;
  displayName: string;
  couponDiscountPrice: Price;
  couponSalePrice: Price;
  availableYn: boolean;
  couponCode: string;
  availableCouponCnt: number;
};
export type OrderCouponListCheck = {
  cartId: number;
  goodsId: number;
  goodsOptionId: number;
  couponList: OrderCouponInfo[];
};

export type CouponListResp = APIResponse & {
  data: CouponInfo[];
};

export type OrderCouponListResp = APIResponse & {
  data: OrderCouponListCheck[];
};

export type CartCouponItem = {
  goodsId: number;
  couponId: number;
  typeEnum: Code<CouponTypeCode>;
  displayName: string;
  code: string;
  deviceTypeEnumList: Code<DeviceTypeCode>[];
  discountTypeEnum: Code<DiscountTypeCode>;
  discountValue: number;
  useDateTypeEnum: Code<UseDateTypeCode>;
  useStartDatetime: string;
  useEndDatetime: string;
  issueStartDatetime: string;
  issueEndDatetime: string;
  minGoodsYn: boolean;
  minGoodsPrice: Price;
  maxDiscountYn: boolean;
  maxDiscountPrice: Price;
  discountRangeTypeEnum: Code<DiscountRangeTypeCode>;
  downloadYn: boolean;
  baseDateTypeEnum: Code<CouponBaseDateTypeCode>;
  baseDateValue: number;
};
export type CartCouponList = APIResponse & {
  data: Record<string, CartCouponItem[]>;
};
