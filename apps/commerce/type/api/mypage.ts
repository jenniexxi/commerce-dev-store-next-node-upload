import { GradeName } from '@ui/commons/GradeBadge';
import { Price } from 'apis/apiCommonType';

export type OrderInfo = {
  depositReadyCnt: number;
  depositCompleteCnt: number;
  shippingReadyCnt: number;
  shippingIngCnt: number;
  shippingCompleteCnt: number;
  cancelCnt: number;
  exchangeCnt: number;
  returnCnt: number;
};

export type MyPageMain = {
  buyerGroup: {
    name: GradeName;
  };
  mileage: {
    useYn: boolean;
    name: string;
    unit: string;
    availableMileage: Price;
  };
  coupon: {
    couponCnt: number;
  };
  order: OrderInfo;
  noticeHtmlYn: boolean;

  pay010: {
    useYn: boolean;
    name: string;
    unit: string;
    availablePay010Mileage: Price;
    availablePay010Money: Price;
  };
};
