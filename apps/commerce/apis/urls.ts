export const DisplayUrl = {
  salesList: '/api/displays/best',
  searchInfo: '/api/displays/pages/search',
  searchResultList: '/api/displays/pages/search-result',
  saveRecentSearchKeyword: '/api/displays/searches/recent',
  deleteRecentSearchKeyword: '/api/displays/searches/recent',
  searchGoodsResult: '/api/displays/searches/result',
  searchAutoComplete: '/api/displays/searches/auto-complete',
  getMainDisplayInfo: '/api/displays/pages/main-list',
  getMainInfo: '/api/displays/mains',
  getMainCustomImageBanner: '/api/displays/mains/customs/banner',
  getMainCustomGoods: '/api/displays/mains/customs/goods',
  getMainCustomRecommend: '/api/displays/mains/customs/recommend',
};

export const GoodsDetailsUrl = {
  goods: (goodsId: number) => `/api/goods/${goodsId}`,
  goodsOptions: (goodsId: number) => `/api/goods/${goodsId}/options`,
  goodsRelationVideo: (goodsId: number) => `/api/goods/${goodsId}/relation-video`,
  goodsRecommended: (goodsId: number) => `/api/goods/${goodsId}/recommended`,
  goodsPrice: (goodsId: number) => `/api/goods/${goodsId}/price`,
  goodsFeedbackAboveFour: (goodsId: number) => `/api/goods/${goodsId}/feedback-above-four`,
  goodsStoreBest: (goodsId: number) => `/api/goods/${goodsId}/store-best`,
  goodsAnnouncement: (goodsId: number) => `/api/goods/${goodsId}/announcement`,
  goodsReturnExchanges: (goodsId: number) => `/api/goods/${goodsId}/return-exchanges`,
  goodsStoreInfo: (goodsId: number) => `/api/goods/${goodsId}/store-info`,

  goodsFeedbackList: (goodsId: number) => `/api/goods/${goodsId}/feedbacks`,
  goodsCheckRestock: (goodsId: number) => `/api/goods/${goodsId}/restock-alerts`,

  getGoodsQnas: (goodsId: number) => `/api/goods/${goodsId}/qnas`,
  // 상품 문의 등록
  postGoodsQnas: (goodsId: number) => `/api/goods/${goodsId}/qnas`,
  // 나의 상품 문의 조회, 수정, 삭제
  getGoodsQnasMe: `/api/goods/qnas/me`,
  putGoodsQnasUpdate: (goodsQnaIdEncrypt: string) => `/api/goods/qnas/${goodsQnaIdEncrypt}`,
  deleteGoodsQnas: (goodsQnaIdEncrypt: string) => `/api/goods/qnas/${goodsQnaIdEncrypt}`,
};

export const ShoppingUrl = {
  getShoppingCart: '/api/shops/carts',
  getShoppingCartTotal: '/api/shops/carts/summary',
  updateShoppingCart: () => `/api/shops/carts`,
  createShoppingCart: '/api/shops/carts',
  deleteShoppingCart: '/api/shops/carts',
  getShoppingMiniCart: (goodsId: number) => `/api/shops/carts/goods/${goodsId}/mini-cart`,
  getCartBuyAvailableCheck: '/api/shops/carts/buy-available-check',
};

export const SystemUrl = {
  getBuyerInfo: '/api/systems/layouts/buyer',
  getPaymentRequireInfo: '/api/systems/pages/payment',
  postPaymentRequestInfo: (paymentGatewayIdEncrypt: string) =>
    `/api/systems/payments/${paymentGatewayIdEncrypt}/request-data`,
  postPaymentResult: '/api/systems/payments/approve-data',
  postCheckAccount: '/api/systems/payments/account-validation-check',
  postCheckFreePaymentResult: '/api/systems/payments/approve-data/zero',
  getLayoutInfo: '/api/systems/layouts/layout',
};

export const BuyersUrl = {
  createBuyers: '/api/buyers/addresses',
  getBuyers: (buyerAddressIdEncrypt: string) => `/api/buyers/addresses/${buyerAddressIdEncrypt}`,
  updateBuyers: (buyerAddressIdEncrypt: string) => `/api/buyers/addresses/${buyerAddressIdEncrypt}`,
  deleteBuyers: (buyerAddressIdEncrypt: string) => `/api/buyers/addresses/${buyerAddressIdEncrypt}`,
  getMyAddress: '/api/buyers/addresses/me',
  getMyAddressCount: '/api/buyers/addresses/me-address-count',
};

export const OrderUrl = {
  getOrderPage: '/api/shops/pages/order',
  getOrderSummary: '/api/shops/orders/summary',
  getOrderList: '/api/orders/manages',
  getOrderListPageInfo: '/api/orders/pages/order-list',
  getOrderListDetail: (ordersIdEncrypt: string) => `/api/orders/manages/${ordersIdEncrypt}`,
  orderRefundAccount: (ordersIdEncrypt: string) => `/api/orders/manages/${ordersIdEncrypt}/refund-account`,
  getDeliveryTracking: '/api/orders/ships/tracking',
  buyConfirmFinish: '/api/orders/ships/change-status/finish',
  createOrder: '/api/shops/orders',
};

export const MyPageUrl = {
  getMyPage: '/api/mypages/pages/main',
};

export const ClaimUrl = {
  claimCancelInfoView: '/api/orders/pages/claim-cancel-request',
  cancelRefundInfoInquiry: '/api/orders/claims/cancel-request/refund',
  claimCancelRefundRequest: '/api/orders/claims/cancel-request',
  claimExchangeInfoView: '/api/orders/pages/claim-exchange-request',
  exchangeRefundInfoInquiry: '/api/orders/claims/exchange-request/refund',
  claimExchangeRequest: '/api/orders/claims/exchange-request',
  confirmIsExchangeOrder: '/api/orders/claims/exchange-request/available-check',
  claimReturnInfoView: '/api/orders/pages/claim-return-request',
  returnRefundInfoInquiry: '/api/orders/claims/return-request/refund',
  claimReturnRequest: '/api/orders/claims/return-request',
  getClaimList: '/api/orders/claims',
  getClaimOrderDetail: (orderClaimIdEncrypt: string) => `/api/orders/claims/${orderClaimIdEncrypt}`,
  cancelClaimCancel: (orderClaimIdEncrypt: string) => `/api/orders/claims/${orderClaimIdEncrypt}/cancel-cancel`,
  cancelClaimExchange: (orderClaimIdEncrypt: string) => `/api/orders/claims/${orderClaimIdEncrypt}/exchange-cancel`,
  cancelClaimReturn: (orderClaimIdEncrypt: string) => `/api/orders/claims/${orderClaimIdEncrypt}/return-cancel`,
  getAddPaymentList: '/api/orders/claims/add-payments',
  getCheckClaimAvailable: '/api/orders/claims/available-check',
  checkCancelRequestAvailable: '/api/orders/claims/cancel-request/available-check',
};

export const PromotionUrl = {
  getGoodsCoupon: (goodsId: number) => `/api/promotions/coupons/goods/${goodsId}`,
  postDownloadCoupon: (code: string) => `/api/promotions/coupons/${code}`,
  getOrderCouponList: '/api/promotions/coupons/shopping-order',
  getCartCouponList: '/api/promotions/coupons/carts',
};

export const FavoritesUrl = {
  // 나의 관심 상품
  getFavoriteGoods: `/api/favorites/goods`,
  postFavoriteGoods: `/api/favorites/goods`,
  deleteFavoriteGoods: `/api/favorites/goods`,
  getFavoriteGoodsMe: `/api/favorites/goods/me`,
  // 나의 관심 스토어
  getFavoriteStore: (companyStoreId: number) => `/api/favorites/stores/${companyStoreId}`,
  postFavoriteStore: `/api/favorites/stores`,
  deleteFavoriteStore: `/api/favorites/stores`,
  getFavoriteStoreMe: `/api/favorites/stores/mes`,
  postFavoriteStoreAlert: (companyStoreId: number) => `/api/favorites/stores/${companyStoreId}/alert`,
  deleteFavoriteStoreAlert: (favoriteStoreAlertIdEncrypt: string) =>
    `/api/favorites/stores/alerts/${favoriteStoreAlertIdEncrypt}`,
};
