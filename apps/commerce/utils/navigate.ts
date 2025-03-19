import { ClaimType } from 'type/api/claim';
import ROUTES from './routes';

type SnsLoginParams = {
  userActionType: string;
  encDeviceSerial: string;
  encUserId: string;
};
type ManageAddressQuery = {
  changeDeliveryRequest?: boolean;
  isExist?: boolean;
  isExchange?: boolean;
};
type CompleteOrderQuery = {
  pgServiceEnum: string;
  pgDataJson: string;
  processIngAddPaymentYn: boolean;
  paymentPrice: number;
};
type ClaimRequestQuery = {
  type: ClaimType;
  orderShippingPriceIdEncrypt: string;
  orderItemIdEncrypt?: string;
  isSelectOrder: boolean;
};
type PinQuery = {
  accessToken: string;
};
type PaymentQuery = {
  selectedCartId: number[];
};

// URL 쿼리 파라미터 생성 함수
const createQueryString = (params: Record<string, any>): string => {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      searchParams.append(`${key}`, '[' + value.toString() + ']');
    } else if (typeof value === 'boolean') {
      searchParams.set(key, value.toString());
    } else {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const navigate = {
  // 홈
  home: () => ROUTES.HOME,

  // 상품 상세
  productDetail: (goodsId: string | number) => ROUTES.PRODUCT.DETAIL.replace('[goodsId]', String(goodsId)),

  // 클레임목록
  claimList: () => ROUTES.CLAIM.LIST,

  // 클레임요청
  claimRequest: (ordersIdEncrypt: string, query: ClaimRequestQuery) => {
    const path = ROUTES.CLAIM.REQUEST.replace('[ordersIdEncrypt]', ordersIdEncrypt);
    return `${path}${createQueryString(query)}`;
  },

  // 클레임상세
  claimDetail: (ordersIdEncrypt: string) => ROUTES.CLAIM.DETAIL.replace('[ordersIdEncrypt]', ordersIdEncrypt),

  // 인증
  pin: (query: PinQuery) => `${ROUTES.AUTH.PIN}${createQueryString(query)}`,

  snsLogin: (snsId: string, query: SnsLoginParams) => {
    const path = ROUTES.AUTH.SNSLOGIN.replace('[snsId]', snsId);
    return `${path}${createQueryString(query)}`;
  },

  // 카테고리 리스트
  category: () => ROUTES.CATEGORY.MAIN,

  // 마이페이지 메인
  myPage: () => ROUTES.MYPAGE.MAIN,

  // 마이페이지 추가결제 내역
  myPageAdditionalPay: () => ROUTES.MYPAGE.ADDTIONALPAY.MAIN,

  // 마이페이지 추가결제 결제하기
  myPageAdditionalPayPayment: () => ROUTES.MYPAGE.ADDTIONALPAY.PAYMENT,

  // 마이페이지 배송지 수정
  myPageManageAddress: (query?: ManageAddressQuery) =>
    `${ROUTES.MYPAGE.MANAGEADDRESS}${createQueryString(query || {})}`,
  //마이페이지 상품 문의
  myPageProductInquiry: () => ROUTES.MYPAGE.PRODUCTINQUIRY,
  // 장바구니
  orderCart: () => ROUTES.ORDER.CART,

  // 주문 결제, 상품 바로 결제
  orderPayment: (query: PaymentQuery) => `${ROUTES.ORDER.PAYMENT}${createQueryString(query)}`,

  // 주문완료 페이지
  orderComplete: (query: CompleteOrderQuery) => `${ROUTES.ORDER.COMPLETE}${createQueryString(query)}`,

  // 주문 상세
  orderDetail: (ordersIdEncrypt: string) => ROUTES.ORDER.DETAIL.replace('[ordersIdEncrypt]', ordersIdEncrypt),

  // 주문 내역
  orderList: () => ROUTES.ORDER.LIST,

  // 검색
  search: () => ROUTES.SEARCH.MAIN,
};

export default navigate;
