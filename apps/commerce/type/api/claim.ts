import { APIResponse } from 'apis/api';
import { Code, Price } from 'apis/apiCommonType';
import { ClaimReasonCode, ClaimTypeKey, GoodsCustomMadeType, ItemStateKey, MypageClaimSortKey } from 'type/claims';
import { BankCode } from 'type/customer';
import { AddPaymentMethodCode, PaymentMethodCode, PaymentStatusCode } from 'type/orders';

export type ClaimType = 'Cancel' | 'Exchange' | 'Return';

export type ShippingAddress = {
  name: string;
  contactNumber: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  shippingMessage: string;
  shippingOrderAddressIdEncrypt?: string;
};
export type ClaimOrderDetail = {
  order: {
    ordersIdEncrypt: string;
    claimRequestDate: string;
    orderNumber: string;
    mileageUseYn: boolean;
  };
  goodsList: ClaimGoodInfo[];
  claim: {
    orderClaimIdEncrypt: string;
    claimCompleteDate: string;
    claimTypeEnum: Code<ClaimTypeKey>;
    claimReasonEnum: Code<ClaimReasonCode>;
    claimReasonDetail: string;
    applicationRefundPrice: Price;
    refundGoodsPaymentPrice: Price;
    useMileage: Price;
    usePay010Mileage: Price;
    pgPaymentPrice: Price;
    refundUseMileage: Price;
    refundUsePay010Mileage: Price;
    changeShippingPrice: Price;
    beforeShippingPrice: Price;
    afterShippingPrice: Price;
    refundPrice: Price;
    addPaymentYn: boolean;
    sumAddPaymentClaimShippingPrice: Price;
    addPaymentClaimShippingPrice: Price;
    addPaymentClaimAddShippingPrice: Price;
    addPaymentShippingPrice: Price;
    addFirstShippingPrice: Price;
    addPaymentPrice: Price;
    addShippingPrice: Price;
    addChangeShippingPrice: Price;
    changePaymentShippingPrice: Price;
  };
  collectAddress: ShippingAddress;
  reShippingAddress: ShippingAddress;
  payment: {
    paymentMethodEnum: Code<PaymentMethodCode>;
    paymentStatusEnum: Code<PaymentStatusCode>;
    card: {
      cardName: string;
      cardQuota: number;
    };
    bank: {
      bankName: string;
      bankAccountNumber: string;
      bankHolder: string;
    };
    virtualBank: {
      bankName: string;
      bankAccountNumber: string;
      virtualBankDate: string;
      bankAccountHolder: string;
    };
    refundBank: {
      bankEnum: Code<BankCode>;
      bankAccountNumber: string;
      bankAccountHolder: string;
    };
  };
  addPayment: {
    paymentMethodEnum: Code<PaymentMethodCode>;
    paymentStatusEnum: Code<PaymentStatusCode>;
    card: {
      cardName: string;
      cardQuota: number;
    };
    bank: {
      bankName: string;
      bankAccountNumber: string;
      bankHolder: string;
    };
  };
};
export type ClaimOrderDetailResp = APIResponse & {
  data: ClaimOrderDetail;
};

export type ClaimCancelRequestBody = {
  ordersIdEncrypt: string;
  orderShippingPriceIdEncrypt: string;
  claimReason: string;
  list: {
    orderItemIdEncrypt: string;
    claimCnt: number;
  }[];
  bankEnum?: Code<BankCode>;
  bankAccountNumber?: string;
  bankAccountHolder?: string;
  claimItemStatusEnum: string;
  claimReasonEnum: string;
};

export type ClaimProcessRespCommon = APIResponse & {
  data: {
    addPaymentYn: boolean;
    paymentGatewayIdEncrypt: string;
  };
};

export type ClaimCancelRequestResp = ClaimProcessRespCommon & {
  type: any;
};

export type ShippingList = {
  orderShippingPriceIdEncrypt: string;
  goodsList: GoodsList[];
};

export type GoodsList = {
  orderItemIdEncrypt: string;
  storeName?: string;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  goodsOption: string;
  buyCnt: number;
  itemPaymentPrice: Price;
  pgPaymentPrice: Price;
  minBuyCnt: number;
  availableClaimCnt: number;
  goodsId: number;
  adultYn: boolean;
  saleStock: number;
  sumShippingCnt: number;
  addList: GoodsList[];
  goodsTypeEnum: Code<GoodsCustomMadeType>;
};

export type ClaimInfoViewRespCommon = {
  order: {
    orderDate: string;
    ordersIdEncrypt: string;
    orderNumber: string;
    mileageUseYn: boolean;
  };
  shippingList: ShippingList[];
  payment: {
    paymentMethodEnum: Code<PaymentMethodCode>;
    paymentStatusEnum: Code<PaymentStatusCode>;
    card: {
      cardName: string;
      cardQuota: number;
    };
    bank: {
      bankName: string;
      bankAccountNumber: string;
      bankHolder: string;
    };
    virtualBank: {
      bankName: string;
      bankAccountNumber: string;
      bankHolder: string;
      virtualBankDate: string;
    };
    escrowYn: boolean;
  };
  claimItemStatusEnumList: {
    code: string;
    codeName: string;
  }[];
  claimReasonEnumList: {
    code: string;
    codeName: string;
  }[];
};

export type ClaimCancelInfoViewResp = APIResponse & {
  data: ClaimInfoViewRespCommon & {
    bankEnumList: Code<BankCode>;
  };
};

export type CancelRefundInfoInquiryRequestBody = {
  ordersIdEncrypt?: string;
  orderShippingPriceIdEncrypt?: string;
  orderItemList: {
    orderItemIdEncrypt: string;
    claimCnt: number;
  }[];
};

export type RefundInfoInquiryRespCommon = {
  applicationRefundPrice: Price;
  refundGoodsPaymentPrice: Price;
  useMileage: Price;
  usePay010Mileage: Price;
  pgPaymentPrice: Price;
  refundUseMileage: Price;
  refundUsePay010Mileage: Price;
  changeShippingPrice: Price;
  beforeShippingPrice: Price;
  afterShippingPrice: Price;
  refundPrice: Price;
  addPaymentYn?: boolean;
  sumAddPaymentClaimShippingPrice: Price;
  addPaymentClaimShippingPrice: Price;
  addPaymentClaimAddShippingPrice: Price;
  addShippingPrice: Price;
  addFirstShippingPrice: Price;
  addPaymentPrice: Price;
};

export type CancelRefundInfoInquiryResp = APIResponse & {
  data: RefundInfoInquiryRespCommon & {
    addGoodsForceSelectOrderItemList: string[];
  };
};

export type ClaimExchangeInfoViewResp = APIResponse & {
  data: ClaimInfoViewRespCommon & {
    shippingAddress: ShippingAddress;
  };
};

export type ExchangeRefundInfoInquiryRequestBody = CancelRefundInfoInquiryRequestBody & {
  claimReasonEnum: string;
  collectAddressZipCode: string;
  reShippingAddressZipCode?: string;
  processIngCheckYn?: boolean;
};

export type ExchangeRefundInfoInquiryResp = APIResponse & {
  data: RefundInfoInquiryRespCommon;
};

export type ClaimExchangeRequestBody = ClaimCancelRequestBody & {
  collectAddress: ShippingAddress;
  reShippingAddress?: ShippingAddress;
};

export type ConfirmIsExchangeRequestBody = {
  ordersIdEncrypt: string;
  list: {
    orderItemIdEncrypt: string;
    claimCnt?: number;
  }[];
};

export type ConfirmIsExchangeResp = APIResponse & {
  list: {
    orderItemIdEncrypt: string;
    availableClaimCnt: number;
    addGoodsYn: boolean;
  }[];
};

export type ClaimListQuery = {
  page: number;
  size: number;
  mypageItemStatusEnum: MypageClaimSortKey;
  startDate: string;
  endDate: string;
  goodsName?: string;
};

export type ClaimGoodInfo = {
  orderItemIdEncrypt: string;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  goodsOption: string;
  buyCnt: number;
  itemPaymentPrice: Price;
  itemStatusEnum: Code<ItemStateKey>;
  claimTypeEnum: Code<MypageClaimSortKey>;
  rejectReason: string;
  feedbackExistYn: boolean;
  goodsId: number;
  adultYn: boolean;
  addList: ClaimGoodInfo[];
  reShippingGoodsList: ClaimGoodInfo[];
};
export type ClaimListContent = {
  orderClaimIdEncrypt: string;
  claimRequestDate: string;
  ordersIdEncrypt: string;
  orderNumber: string;
  goodsList: ClaimGoodInfo[];
};
export type ClaimListResp = APIResponse & {
  data: {
    content: ClaimListContent[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
};

export type AddPaymentItem = {
  claimRequestDate: string; // '2019-08-24T14:15:22Z';
  ordersIdEncrypt: string;
  orderNumber: string;
  orderClaimIdEncrypt: string;
  claimTypeEnum: Code<ClaimTypeKey>;
  paymentPrice: Price;
  paymentMethodEnum: Code<AddPaymentMethodCode>;
  paymentStatusEnum: Code<PaymentStatusCode>;
  paymentGatewayIdEncrypt: string;
  virtualBank: {
    bankName: string;
    bankAccountNumber: string;
    virtualBankDate: string;
    bankAccountHolder: string;
  };
};

export type AddPaymentListResp = APIResponse & {
  data: {
    content: AddPaymentItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
};

export type CheckCancelRequestAvailable = {
  ordersIdEncrypt: string;
  list: { orderItemIdEncrypt: string; claimCnt: number }[];
};

export type CheckCancelRequestResp = APIResponse & {
  data: {
    list: {
      orderItemIdEncrypt: string;
      minBuyCnt: number;
      addGoodsYn: boolean;
    }[];
  };
};
