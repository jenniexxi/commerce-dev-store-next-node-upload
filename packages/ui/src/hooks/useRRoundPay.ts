'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type ActionType = 'requestSetPin' | 'requestPin' | 'requestChangePin' | 'requestInitPin' | 'requestFido';

type InitializeOptions = {
  shopId: string;
  mode?: 'development' | 'production';
};

// 인증 파라미터
type AuthParams = {
  payToken: string;
};

// 결제 초기화 파라미터
type PaymentInitParams = {
  payToken: string;
  payPrice: number;
  deliveryFee?: number;
  method?: string[];
};

// 결제 요청 정보 중 금액 객체
type PayPriceObject = {
  payPrice: string;
  taxScopePrice?: string;
  taxExScopePrice?: string;
  containerDeposit?: string;
};

// 결제 금액 정보
type PriceObject = {
  productPrice: string;
  dcPrice?: string;
  spPrice?: string;
  cpPrice?: string;
  point?: string;
  deliveryFee?: string;
  payPriceObj: PayPriceObject;
};

// 가상계좌 정보
type VBankObject = {
  bankCd: string;
  bankNm: string;
  acctNo: string;
  acctNm: string;
  expireDt: string;
  payPrice: string;
};

// 결제 요청 파라미터
type PaymentRequestParams = {
  ordNo: string;
  ordDay: string;
  ordTime: string;
  productNm: string;
  priceObj: PriceObject;
};

// 결제 응답 결과
type PaymentResult = {
  resCd: string;
  resMsg: string;
  ordNo?: string;
  payAuthCd?: string;
  payMethod?: string;
  priceObj?: PriceObject;
  vbankObj?: VBankObject;
  action?: any;
};

// 인증 응답 결과
type AuthResult = {
  resCd: string;
  resMsg: string;
};

// 결제 UI 메서드
type PaymentMethod = {
  setPayPrice: (price: number) => Promise<void>;
  setDeliveryFee: (fee: number) => Promise<void>;
  setPaymentMethod: (methods: string[]) => Promise<void>;
  event: (eventName: string, callback: (data: any) => void) => void;
  destroy: () => Promise<void>;
};

// 결제 인스턴스
export type PaymentInstance = {
  renderPayments: (params: { id: string }) => Promise<PaymentMethod>;
  requestPayments: (params: PaymentRequestParams) => Promise<PaymentResult>;
};

// SDK 메서드
type RRoundSDK = {
  authenticate: (params: AuthParams) => {
    requestSetPin: () => Promise<AuthResult>;
    requestPin: () => Promise<AuthResult>;
    requestChangePin: () => Promise<AuthResult>;
    requestInitPin: () => Promise<AuthResult>;
    requestFido: () => Promise<AuthResult>;
  };
  payments: (params: PaymentInitParams) => Promise<PaymentInstance>;
};

// 스크립트 로드 상태 추적을 위한 변수들
let scriptElement: HTMLScriptElement | null = null;
let isScriptLoading = false;
let scriptLoadPromise: Promise<void> | null = null;
let scriptLoaded = false;

export const useRRoundPay = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sdkRef = useRef<RRoundSDK | null>(null);
  const paymentMethodRef = useRef<PaymentMethod | null>(null);

  // 스크립트 로드 함수
  const loadScript = useCallback((url: string): Promise<void> => {
    // 클라이언트 측 환경 확인
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('브라우저 환경이 아닙니다.'));
    }

    // 이미 로딩 중이거나 완료된 경우
    if (scriptLoadPromise) return scriptLoadPromise;
    if (scriptLoaded && scriptElement) return Promise.resolve();

    // 새로 로드
    isScriptLoading = true;
    scriptLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      scriptElement = script;

      script.onload = () => {
        isScriptLoading = false;
        scriptLoaded = true;
        resolve();
      };

      script.onerror = () => {
        isScriptLoading = false;
        scriptLoaded = false;
        scriptElement = null;
        scriptLoadPromise = null;
        reject(new Error('RROUND SDK 스크립트 로드 실패'));
      };

      document.head.appendChild(script);
    });

    return scriptLoadPromise;
  }, []);

  // SDK 초기화 함수
  const initialize = useCallback(
    async ({ shopId, mode = 'production' }: InitializeOptions): Promise<void> => {
      try {
        // 클라이언트 측 환경 확인
        if (typeof window === 'undefined') {
          throw new Error('브라우저 환경이 아닙니다.');
        }

        // 스크립트 URL 결정
        const scriptUrl =
          mode === 'development'
            ? 'https://tb-hffe.hectoinnovation.co.kr/js/hecto-financial.payment.min.js'
            : 'https://hffe.hectoinnovation.co.kr/js/hecto-financial.payment.min.js';

        // 스크립트 로드
        await loadScript(scriptUrl);

        // SDK 초기화
        if (window.HectoFinancial) {
          sdkRef.current = window.HectoFinancial(shopId, mode);
          setIsReady(true);
        } else {
          throw new Error('HectoFinancial이 로드되지 않았습니다');
        }
      } catch (err) {
        const newError = err instanceof Error ? err : new Error('알 수 없는 오류');
        setError(newError);
        throw newError;
      }
    },
    [loadScript],
  );

  // 로그인 인증/설정
  const authenticate = useCallback(
    async (payToken: string, userActionType: ActionType = 'requestPin'): Promise<AuthResult> => {
      if (!sdkRef.current) {
        throw new Error('SDK가 초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
      }

      const auth = sdkRef.current.authenticate({ payToken });
      switch (userActionType) {
        case 'requestSetPin':
          // 로그인 인증 설정
          return auth.requestSetPin();
        case 'requestPin':
          // 로그인 인증창 열기
          return auth.requestPin();
        case 'requestChangePin':
          // 로그인 비밀번호 변경
          return auth.requestChangePin();
        case 'requestInitPin':
          // 비밀번호 재설정
          return auth.requestInitPin();
        case 'requestFido':
          // 생채인증 요청
          return auth.requestFido();
        default:
          return auth.requestPin();
      }
    },
    [],
  );

  // 결제 초기화
  const initializePayment = useCallback(async (params: PaymentInitParams): Promise<PaymentInstance> => {
    if (!sdkRef.current) {
      throw new Error('SDK가 초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
    }

    return sdkRef.current.payments(params);
  }, []);

  // 결제 UI 렌더링
  const renderPaymentUI = useCallback(
    async (payments: PaymentInstance, containerId: string): Promise<PaymentMethod> => {
      const paymentMethod = await payments.renderPayments({
        id: containerId,
      });

      paymentMethodRef.current = paymentMethod;
      return paymentMethod;
    },
    [],
  );

  // 결제 UI 업데이트
  const updatePaymentUI = useCallback(
    async ({
      payPrice,
      deliveryFee,
      method,
    }: {
      payPrice?: number;
      deliveryFee?: number;
      method?: string[];
    }): Promise<void> => {
      const paymentMethod = paymentMethodRef.current;
      if (!paymentMethod) {
        throw new Error('결제 UI가 초기화되지 않았습니다.');
      }

      if (payPrice !== undefined) {
        await paymentMethod.setPayPrice(payPrice);
      }
      if (deliveryFee !== undefined) {
        await paymentMethod.setDeliveryFee(deliveryFee);
      }
      if (method !== undefined) {
        await paymentMethod.setPaymentMethod(method);
      }
    },
    [],
  );

  // 결제 요청
  const requestPayment = useCallback(
    async (payments: PaymentInstance, params: PaymentRequestParams): Promise<PaymentResult> => {
      return payments.requestPayments(params);
    },
    [],
  );

  // 정리
  const cleanup = useCallback(() => {
    if (paymentMethodRef.current) {
      paymentMethodRef.current.destroy().catch(() => {
        // 오류 무시
      });
      paymentMethodRef.current = null;
    }
    sdkRef.current = null;
    setIsReady(false);
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    isReady,
    error,
    initialize,
    authenticate,
    initializePayment,
    renderPaymentUI,
    updatePaymentUI,
    requestPayment,
    cleanup,
  };
};

// 글로벌 타입 선언
declare global {
  interface Window {
    HectoFinancial: (shopId: string, mode: 'development' | 'production') => RRoundSDK;
  }
}
