import { APIResponse } from 'apis/api';
import { Price, Code } from 'apis/apiCommonType';
import {
  AddShippingPriceAreaCode,
  AvailableInfoFailCode,
  GoodsDisplaySalesStatusKey,
  GoodsSaleStatusKey,
  ShippingPolicyTypeCode,
} from 'type';
import { GoodsOptionsList } from './goods';

export type AddGoods = {
  cartId: number;
  optionName: string;
  paymentPrice: Price;
  paymentPricePerOne: Price;
  buyCnt: number;
  saleStock: number;
  buyerAvailableBuyCnt: number;
  saleStatusEnum: Code<GoodsSaleStatusKey>;
  soldOutYn: boolean;
  soldStopYn: boolean;
  soldEndYn: boolean;
  goodsOptionId: number;
};

export type Goods = {
  cartId: number;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  goodsOption: string;
  recommendPrice: Price;
  recommendPricePerOne: Price;
  paymentPrice: Price;
  paymentPricePerOne: Price;
  shippingPaymentPrice: Price;
  adultYn: boolean;
  buyCnt: number;
  minBuyCnt: number;
  maxBuyCnt: number;
  buyerMaxBuyCnt: number;
  saleStock: number;
  buyerAvailableBuyCnt: number;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  goodsId: number;
  goodsOptionId: number;
  soldOutYn: boolean;
  soldStopYn: boolean;
  soldEndYn: boolean;
  saleRate: number;
  shippingPolicyEnum: Code<ShippingPolicyTypeCode>;
  shippingPolicyConditionText: string;
  singleGoodsYn: boolean;
  addGoodsList: AddGoods[];
};

export type ShippingInfo = {
  shippingPolicyGroupYn: boolean;
  shippingPaymentPrice: Price;
  shippingPolicyEnum: Code<ShippingPolicyTypeCode>;
  basicShippingPrice: Price;
  policyCondition: number;
  policyConditionPrice: Price;
  policyCondition2: number;
  policyConditionPrice2: Price;
  addShippingPriceUseYn: boolean;
  addShippingPriceEnum: Code<AddShippingPriceAreaCode>;
  addShippingPrice: Price;
  addShippingPrice2: Price;
};

export type CompanyInfo = {
  companyId: number;
  storeName: string;
};

export type CartGroup = {
  shipping: ShippingInfo;
  goodsList: Goods[];
};

export type CartsList = {
  company: CompanyInfo;
  shippingList: CartGroup[];
};
export type CartSummary = {
  goodsPaymentPrice: Price;
  discountPrice: Price;
  shippingPaymentPrice: Price;
  paymentPrice: Price;
};
export type CartsTotal = {
  summery: CartSummary;
  companySummery: Record<string, CartSummary>;
};

export type CartsCreate = {
  cartList: {
    cartId: number;
  }[];
  cartCnt: number;
  buyAvailableInfo: {
    buyerMaxBuyCnt: number | null;
    displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey> | null;
    maxBuyCnt: number | null;
    minBuyCnt: number | null;
    nowBuyCnt: number | null;
    buyAvailableEnum: Code<AvailableInfoFailCode> | null;
  };
};

export type CreateCartBody = {
  buyNowYn: boolean;
  goodsId?: number;
  goodsOptionId?: number;
  buyCnt?: number;
};

export type MiniCartAddGoods = {
  valueStr: string;
  goodsOptionId: number;
  price: Price;
  totalStock: number;
  buyerAvailableBuyCnt: number;
  saleStatusEnum: Code<GoodsSaleStatusKey>;
  addGoodsList: MiniCartAddGoods[];
};

export type UpdateCartBody = {
  goodsId: number;
  goodsOptionId?: number;
  buyCnt: number;
};

export type MiniCartsList = {
  displayGoodsName: string;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  recommendPrice: Price;
  salePrice: Price;
  goodsSaleStock: number;
  minBuyCnt: number;
  maxBuyCnt: number;
  buyerMaxBuyCnt: number;
  buyerAvailableBuyCnt: number;
  buyerNowBuyCnt: number;
  optionNameList: string[];
  optionList: GoodsOptionsList[];
  addGoodsList: MiniCartAddGoods[];
};

export type CheckAvailable = {
  saleStock: number;
  buyerMaxBuyCnt: number | null;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  maxBuyCnt: number | null;
  minBuyCnt: number | null;
  cartId: number;
  goodsName: string;
  goodsOption: string;
  addGoodsOption: string | null;
  nowBuyCnt: number;
  buyAvailableEnum: {
    code: string;
    message: string;
  };
};

export type CartsListResp = APIResponse & {
  data: CartsList[];
};

export type CartsTotalResp = APIResponse & {
  data: CartsTotal;
};

export type ShoppigCartErrorData = {
  buyerMaxBuyCnt: number | null;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey> | null;
  maxBuyCnt: number | null;
  minBuyCnt: number | null;
  nowBuyCnt: number | null;
  buyAvailableEnum: Code<AvailableInfoFailCode> | null;
};

export type UpdateCartResp = APIResponse & {
  data: ShoppigCartErrorData;
};

export type CartsCreateResp = APIResponse & {
  data: CartsCreate;
};

export type CartsDeleteResp = APIResponse & {
  data: object;
};

export type MiniCartsListResp = APIResponse & {
  data: MiniCartsList;
};

export type CheckAvailableResp = APIResponse & {
  data: CheckAvailable[];
  error: {
    errorCode: AvailableInfoFailCode;
  };
};
