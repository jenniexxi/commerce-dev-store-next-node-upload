import {
  AddPaymentMethodCode,
  BankCode,
  BasicPaymentMethodCode,
  CashReceiptTypeCode,
  DeviceTypeCode,
  EasyPaymentMethodCode,
  IdentityTypeCode,
  PaymentMethodCode,
  PaymentTypeCode,
  PgServiceTypeCode,
} from 'type';
import { APIResponse } from 'apis/api';
import { Code, Price } from 'apis/apiCommonType';
import { GnbDisplayType, SubTitleDisplayType } from 'type/system';

export type BuyerInfo = {
  loginId: string;
  buyerName: string;
  nickname: string;
  buyerGroupName: string;
  buyerEmail: string;
  buyerCellPhone: string;
  loginYn: boolean;
  pay010UseYn: boolean;
  needPasswordResetYn: boolean;
  requestAdultCertificationYn: boolean;
};
export type PaymentBuyerInfo = {
  buyer: BuyerInfo;
  nonBuyer: {
    loginYn: boolean;
    requestUseServiceCertificationYn: boolean;
  };
  cart: {
    total: number;
  };
  sns: {
    isSnsProcess: boolean;
    loginId: string;
    type: string;
    buyerName: string;
    linkedDatetime: string;
  };
};

type PaymentList<T> = {
  paymentMethodEnum: Code<T>;
  info: string;
};
export type PaymentRequireInfo = {
  basicPaymentList: PaymentList<BasicPaymentMethodCode>[];
  easyPaymentList: PaymentList<EasyPaymentMethodCode>[];
  addPaymentList: PaymentList<AddPaymentMethodCode>[];
  bankEnumList: Code<BankCode>[];

  hectoPg: {
    payToken: string;
    shopId: string;
  };
};

export type PaymentRequireInfoResp = APIResponse & {
  data: PaymentRequireInfo;
};

export type PaymentRequestBody = {
  deviceTypeEnum: string;
  paymentMethodEnum: string;
  returnUrl?: string;
  notiUrl?: string;
  bankEnum?: Code<BankCode>;
  bankAccountNumber?: string;
  bankAccountHolder?: string;
  cashReceiptYn?: boolean;
  purposeEnum?: Code<CashReceiptTypeCode>;
  identityTypeEnum?: Code<IdentityTypeCode>;
  identity?: string;
  paymentTypeEnum: Code<PaymentTypeCode>;
};

export type PaymentRequest = {
  pgServiceEnum: Code<PgServiceTypeCode>;
  pgRequestData: {
    [key: string]: string;
  };
};
export type PaymentRequsetResp = APIResponse & {
  data: PaymentRequest;
};

export type PaymentResultBody = {
  pgServiceEnum: string;
  deviceTypeEnum: string;
  pgDataJson: string;
  processIngAddPaymentYn: boolean;
};
export type PaymentResult = {
  paymentTypeEnum: string;
  receiveAuthResult: string;
  orderNumber: string;
  ordersIdEncrypt: string;
  paymentMethodEnum: Code<PaymentMethodCode>;
  virtualBank: {
    bankName: string;
    bankAccountNumber: string;
    bankAccountHolder: string;
    virtualBankDate: string;
  };
  buyerName: string;
  address: string;
  addressDetail: string;
  depositPay010Mileage: Price;
  goodsDepositPay010Mileage: Price;
  paymentDepositPay010Mileage: Price;
  buyerGroupDepositPay010MileageYn: boolean;
  buyerGroupDepositPay010Mileage: Price;
};
export type PaymentResultResp = APIResponse & {
  data: PaymentResult;
};

export type CheckAccountReq = {
  bankEnum: Code<BankCode>;
  bankAccountNumber: string;
  bankAccountHolder: string;
};

export type CheckFreePaymentReq = {
  paymentGatewayIdEncrypt: string;
  deviceTypeEnum: DeviceTypeCode;
};

type LayoutStoreType = {
  storeName: string;
  ceoName: string;
  businessAddress: string;
  businessAddressDetail: string;
  businessNumber: string;
  onlineBusinessNumber: string;
  securityManagerName: string;
  securityManagerEmail: string;
  customerPhoneNumber: string;
  customerOpenTime: string;
  customerCloseTime: string;
  customerLunchTimeYn: boolean;
  customerLunchStartTime: string;
  customerLunchEndTime: string;
  saturdayYn: boolean;
  saturdayStartTime: string;
  saturdayEndTime: string;
  sundayYn: boolean;
  sundayStartTime: string;
  sundayEndTime: string;
  holidayYn: boolean;
  holidayStartTime: string;
  holidayEndTime: string;
  customerEmail: string;
};

type LayoutPaymentType = {
  escrowYn: boolean;
  escrowMarkUrl: string;
};

type LayoutMileageType = {
  useYn: boolean;
  name: string;
  unit: string;
  useUnitEnum: {
    code: string;
    codeName: string;
  };
  minimumPriceYn: boolean;
  minimumPrice: {
    number: number;
    currencyCode: string;
  };
  maximumTypeEnum: 'NO_LIMIT';
  maximumMileage: {
    number: number;
    currencyCode: string;
  };
  maximumRate: number;
};

type LayoutCartType = {
  cartDeleteDay: number;
};

type LayoutPopupListType = {
  popupId: number;
  title: string;
  displayLocationEnum: {
    code: string;
    codeName: string;
  };
  pcDisplayTop: number;
  pcDisplayLeft: number;
  directInputUrl: string;
  todayAlertYn: boolean;
  contentHtml: string;
  startDatetime: Date;
  endDatetime: Date;
};

type LayoutGnbType = {
  logoTypeEnum: {
    code: string;
    codeName: string;
  };
  logoText: string;
  logoImageUrl: string;
};

type LayoutMainGnbListType = {
  gnbTypeEnum: {
    code: GnbDisplayType;
    codeName: string;
  };
  mainTitle: string;
  subTitleEnum: {
    code: SubTitleDisplayType;
    codeName: string;
  };
  subTitleText: string | null;
  exhibitionId: number | null;
  sort: number;
  startDatetime: Date;
  endDatetime: Date;
};

export type GetLayoutInfoResp = {
  store: LayoutStoreType;
  payment: LayoutPaymentType;
  mileage: LayoutMileageType;
  cart: LayoutCartType;
  popupList: LayoutPopupListType[];
  gnb: LayoutGnbType;
  mainGnbList: LayoutMainGnbListType[];
};
