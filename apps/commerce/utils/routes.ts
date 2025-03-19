const ROUTES = {
  HOME: '/',
  PRODUCT: {
    DETAIL: '/product/detail/[goodsId]',
  },
  CLAIM: {
    LIST: '/claim/list',
    REQUEST: '/claim/request/[ordersIdEncrypt]', //type: string; orderShippingPriceIdEncrypt: string; orderItemIdEncrypt?: string[]; isSelectOrder: boolean;
    DETAIL: '/claim/detail/[ordersIdEncrypt]',
  },
  AUTH: {
    PIN: '/auth/pin', // accessToken
    SNSLOGIN: '/auth/[snsId]', //userActionType,encDeviceSerial,encUserId
  },
  CATEGORY: { MAIN: '/category' },
  MYPAGE: {
    MAIN: '/myPage',
    ADDTIONALPAY: {
      MAIN: '/myPage/addtionalPay',
      PAYMENT: '/myPage/addtionalPay/payment',
    },
    MANAGEADDRESS: '/myPage/manageAddress', //{ changeDeliveryRequest?: boolean; isExist?: boolean; isExchange?: boolean; }
    PRODUCTINQUIRY: '/myPage/productInquiry',
  },
  ORDER: {
    CART: '/order/cart',
    COMPLETE: '/order/complete', //{ pgServiceEnum: string; pgDataJson: string; processIngAddPaymentYn: boolean; paymentPrice: number; };
    DETAIL: '/order/detail/[ordersIdEncrypt]',
    LIST: '/order/list',
    PAYMENT: '/order/payment', //selectedCartId:number[]
  },
  SEARCH: {
    MAIN: '/search',
  },
};

export default ROUTES;
