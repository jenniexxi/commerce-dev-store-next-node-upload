import {
  AddShippingPriceAreaCode,
  FeedbackSortTypeCode,
  FeedbackTypeCode,
  GoodsCustomMadeType,
  GoodsDisplaySalesStatusKey,
  GoodsQnaAnswerStatusCode,
  GoodsSaleStatusKey,
  ShippingChargeStandardTypeCode,
  ShippingPolicyTypeCode,
} from 'type';
import { APIResponse } from 'apis/api';
import { Price, Code, Badge } from 'apis/apiCommonType';

export type GoodsInfo = {
  goodsId: number;
  imageFilesUrl: string;
  brandName: string;
  displayGoodsName: string;
  recommendPrice: Price;
  paymentPrice: Price;
  saleRate: number;
  feedbackTotalScore: number;
  feedbackTotal: number;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  soldOutYn: boolean;
  soldStopYn: boolean;
  soldEndYn: boolean;
  adultYn: boolean;
  delYn: boolean;
  badgeList: Badge[] | null;
};

export type ShippingInfo = {
  shippingPolicyConditionText: string;
  expectedDeliveryDayText: string;
  expectedArrivalPeriodText: string;
  deliveryTimePercentageList: {
    deliveryTimeText: string;
    percentage: number;
  }[];
  shippingPolicyCode: Code<ShippingPolicyTypeCode>;
  basicShippingPrice: Price;
  shippingPolicyCondition: number;
  shippingPolicyConditionPrice: Price;
  shippingPolicyCondition2: number;
  shippingPolicyConditionPrice2: Price;
  addShippingPriceUseYn: boolean;
  shippingAreaEnum: Code<AddShippingPriceAreaCode>;
  addShippingPrice: Price;
  addShippingPrice2: Price;
  shippingPolicyGroupYn: boolean;
  chargeStandardEnum: Code<ShippingChargeStandardTypeCode>;
};

export type DetailsContent = {
  categoryStoreId: number;
  companyStoreId: number;
  instagramUrl: string;
  youtubeUrl: string;
  displayGoodsName: string;
  displaySaleStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  goodsTypeEnum: Code<GoodsCustomMadeType>;
  superMileageYn: boolean;
  returnCareYn: boolean;
  adultYn: boolean;
  couponExistYn: boolean;
  restockAlertYn: boolean;
  originImageFilesUrl: string;
  addImageFilesUrlList: string[];
  cardBenefitContentsHtml: string;
  shippingInfo: ShippingInfo;
  feedbackTotalScore: number;
  feedbackTotal: number;
  goodsQnaTotal: number;
  noticeList: {
    name: string;
    displayTypeEnum: {
      code: string;
      codeName: string;
    };
    topContentHtml: string;
    bottomContentHtml: string;
  }[];
  goodsDetailHtml: string;
  searchKeywordList: string[];
  minBuyCnt: number;
  maxBuyCnt: number;
  buyerMaxBuyCnt: number;
  relationGoodsList: GoodsInfo[];
  exhibitionList: {
    exhibitionId: number;
    listImageUrl: string;
  }[];
};

export type DetailsResp = APIResponse & {
  data: DetailsContent;
};

export type GoodsOptionsList = {
  valueStr: string;
  goodsOptionId: number;
  price: Price;
  optionSalePrice: Price;
  totalStock: number;
  buyerAvailableBuyCnt: number;
  saleStatusEnum: Code<GoodsSaleStatusKey>;
  optionList?: GoodsOptionsList[];
};

export type GoodsOptions = {
  brandName: string;
  displayGoodsName: string;
  imageFilesUrl: string;
  optionNameList: string[];
  optionList: GoodsOptionsList[];
};

export type GoodsOptionResp = APIResponse & {
  data: GoodsOptions;
};

export type RelationVideoContent = {
  videoUrl: string;
  videoName: string;
  count: number;
};
export type GoodsRelationVideoResp = APIResponse & {
  data: RelationVideoContent;
};

export type PriceContent = {
  recommendPrice: Price;
  salePrice: Price;
  saleRate: number;
  maxSalePrice: Price;
  goodsExpectMileage: Price;
  buyerGroupExpectMileage: Price;
  superExpectMileage: Price;
  pay010ExpectMileage: Price;
  totalExpectMileage: Price;
};
export type GoodsPriceResp = APIResponse & {
  data: PriceContent;
};

export type FeedbackAboveFourContent = {
  percentageOfFeedbacksAboveFour: number;
  feedbackAboveFourList: {
    score: number;
    feedbackTypeEnum: {
      code: string;
      codeName: string;
    };
    text: string;
    photoUrl: string;
    videoUrl: string;
  }[];
};
export type GoodsFeedbackAboveFourResp = APIResponse & {
  data: FeedbackAboveFourContent;
};

export type GoodsStoreBestResp = APIResponse & {
  data: GoodsInfo[];
};

export type AnnouncementContent = {
  typeEnum: {
    code: string;
    codeName: string;
  };
  itemTypeEnum: {
    code: string;
    codeName: string;
  };
  itemContent: string;
};
export type GoodsAnnouncementResp = APIResponse & {
  data: AnnouncementContent[];
};

export type ReturnExchangesContent = {
  informationHtml: string;
};
export type GoodsReturnExchangesResp = APIResponse & {
  data: ReturnExchangesContent;
};

export type StoreInfoContent = {
  storeName: string;
  ceoName: string;
  tel: string;
  email: string;
};
export type GoodsStoreInfoResp = APIResponse & {
  data: StoreInfoContent;
};

export type GoodsFeedbackQuery = {
  page: string;
  size: string;
  feedbackSortTypeEnum?: FeedbackSortTypeCode;
  feedbackTypeEnum?: FeedbackTypeCode;
};

export type FeedbackList = {
  content: FeedbackContent[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type FeedbackListResp = APIResponse & {
  data: FeedbackList;
};

export type FeedbackContent = {
  feedbackTypeEnum: Code<FeedbackTypeCode>;
  goodsId: number;
  displayGoodsName: string;
  brandName: string;
  feedbackScore: number;
  goodsOption: string;
  text: string;
  createBuyerLoginId: string;
  createDatetime: string;
  imageFilesUrl: string;
  imageCnt: number;
  photoList: { imageFilesUrl: string }[];
  answerList: { text: string; createDatetime: string }[];
};

export type CheckGoodsRestockResp = APIResponse & {
  goodsId: number;
  imageFilesUrl: string;
  displayGoodsName: string;
  brandName: string;
  recommendPrice: Price;
  salePrice: Price;
  saleRate: number;
  optionNameList: string[];
  optionList: {
    valueStr: string;
    goodsOptionId: number;
  }[];
  cellPhone: string;
};

export type QnAItem = {
  bbsTypeTitle: string;
  statusEnum: Code<GoodsQnaAnswerStatusCode>;
  title: string;
  contents: string;
  createBuyerLoginId: string;
  openYn: boolean;
  createDatetime: string;
  answerList: {
    text: string;
    createDatetime: string;
  }[];
};

export type GoodsQnA = {
  content: QnAItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type GoodsQnAResp = APIResponse & {
  data: GoodsQnA[];
};

export type GoodsQnasInquiryBodyGet = {
  page: number;
  size: number;
  myGoodsQnaYn?: boolean;
  bbsTypeId?: string;
  openYn?: boolean;
  statusEnum?: string;
};

export type GoodsRecommendedListResp = APIResponse & {
  data: GoodsInfo[];
};

export type GoodsQnaInquiryBodyGet = {
  page: number;
  size: number;
  myGoodsQnaYn?: boolean;
  bbsTypeId?: string;
  openYn?: boolean;
  statusEnum?: string;
};

export type GoodsQnaInquiryBody = {
  bbsTypeId: number;
  title: string;
  contents: string;
  openYn?: boolean;
  receiveAlertYn?: boolean;
};

export type GoodsQnasInquiryMeContent = {
  goodsQnaIdEncrypt: string;
  goodsId: number;
  displayStatusEnum: Code<GoodsDisplaySalesStatusKey>;
  adultYn: boolean;
  imageFilesUrl: string;
  storeName: string;
  displayGoodsName: string;
  brandName: string;
  bbsTypeTitle: string;
  statusEnum: Code<GoodsQnaAnswerStatusCode>;
  title: string;
  contents: string;
  openYn: boolean;
  receiveAlertYn: boolean;
  createDatetime: string;
  answerList: {
    text: string;
    createDatetime: string;
  }[];
};

export type GetGoodsContent = {
  bbsTypeTitle: string;
  statusEnum: Code<GoodsQnaAnswerStatusCode>;
  title: string;
  contents: string;
  createBuyerLoginId: string;
  openYn: boolean;
  createDatetime: string;
  answerList: {
    text: string;
    createDatetime: string;
  }[];
};

export type GetGoodsQnasResp = APIResponse & {
  data: {
    content: GetGoodsContent[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
};

export type GoodsQnasInquiryMeResp = APIResponse & {
  data: {
    content: GoodsQnasInquiryMeContent[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
};

export type UpdateGoodsQnasResp = APIResponse & {
  data: {};
};

export type DeleteGoodsQnasResp = APIResponse & {
  data: {};
};
