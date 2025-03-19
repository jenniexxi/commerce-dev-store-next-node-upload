'use client';

import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

import { CustomShippingList } from '../ClaimRequest';
import * as S from '../ClaimRequest.style';
import { OrderRefundAccountResp } from 'type/api/order';
import { useHeader } from '@ui/hooks';
import { useRouter } from 'next/navigation';
import { Code } from 'apis/apiCommonType';
import {
  CancelRefundInfoInquiryRequestBody,
  CancelRefundInfoInquiryResp,
  ClaimCancelRequestBody,
} from 'type/api/claim';
import {
  createCustomShippingList,
  getAllCheckboxCheckedState,
  getRefundOrderItemList,
  updateAllCheckedState,
  updateShippingListItem,
} from '../util';
import { claimKeys, useGetClaimCancelInfoView } from 'hooks/query/claimQuery';
import { useCancelRefundInfo, useClaimCancelRequest } from 'hooks/mutate/claimMutation';
import { AllOrderStates, CLAIM_CANCEL_REQUEST_REASON } from 'type/claims';
import { useModalStore } from '@ui/stores';
import messages from 'constants/message';
import { Checkbox, TwoButton } from '@ui/components';
import ClaimPdItemGroup from '../components/ClaimPdItemGroup';
import ClaimReason from '../components/ClaimReason';
import ClaimRefundInfo from '../components/ClaimRefundInfo';
import ClaimAddPay from '../components/ClaimAddPay';
import { CashReceiptInfo } from 'app/order/payment/components';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

type Props = {
  ordersIdEncrypt: string;
  orderShippingPriceIdEncrypt: string;
  isSelectOrder: boolean;
  orderItemIdEncrypt?: string[];
  orderRefundAccountInfo?: OrderRefundAccountResp;
};

const CancelOrder = ({
  ordersIdEncrypt,
  orderShippingPriceIdEncrypt,
  isSelectOrder,
  orderItemIdEncrypt,
  orderRefundAccountInfo,
}: Props) => {
  useHeader('상품 취소신청', { showHeader: true, showRightButton: false });
  const router = useRouter();
  const queryClient = useQueryClient();
  const claimReasonRef = useRef<HTMLDivElement>(null);

  const [claimReasonEnum, setClaimReasonEnum] = useState<Code<string>>();
  const [cancelReason, setCancelReason] = useState('');
  const [shippingList, setShippingList] = useState<CustomShippingList[]>([]);
  const [refundInfo, setRefundInfo] = useState<CancelRefundInfoInquiryResp>();
  const [isAllCheckedBox, setIsAllCheckedBox] = useState(false);
  const [errorMessageClaimReason, setErrorMessageClaimReason] = useState('');
  const [errorMessageReason, setErrorMessageReason] = useState('');

  const [isInitialized, setIsInitialized] = useState(false);

  const { data: cancelOrderInfo } = useGetClaimCancelInfoView(ordersIdEncrypt, orderShippingPriceIdEncrypt);

  const { mutate: cancelRefundInfoInquiry } = useCancelRefundInfo((response) => setRefundInfo(response));

  const { mutate: claimCancelRequest } = useClaimCancelRequest((resp) => {
    if (resp.success) {
      router.back();
      queryClient.invalidateQueries({ queryKey: claimKeys.getClaimList() });
    } else {
      showModal.text(resp.error.message);
    }
  });
  const { showModal } = useModalStore();

  useEffect(() => {
    if (cancelOrderInfo?.success && cancelOrderInfo.data.shippingList) {
      setShippingList(
        createCustomShippingList(cancelOrderInfo.data.shippingList, isSelectOrder, orderItemIdEncrypt || []),
      );
    }
  }, [cancelOrderInfo]);

  useEffect(() => {
    if (errorMessageClaimReason || errorMessageReason) {
      // 스크롤을 ClaimReason 컴포넌트로 이동
      claimReasonRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [errorMessageClaimReason, errorMessageReason]);

  useEffect(() => {
    const allChecked = getAllCheckboxCheckedState(shippingList);
    setIsAllCheckedBox(allChecked);

    const body: CancelRefundInfoInquiryRequestBody = {
      ordersIdEncrypt,
      orderShippingPriceIdEncrypt,
      orderItemList: getRefundOrderItemList(shippingList),
    };
    cancelRefundInfoInquiry(body);
  }, [shippingList]);

  useEffect(() => {
    if (claimReasonEnum) {
      setErrorMessageClaimReason('');
    }
  }, [claimReasonEnum]);

  useEffect(() => {
    if (cancelReason) {
      setErrorMessageReason('');
    }
  }, [cancelReason]);

  const shippingListItemChange = (orderItemIdEncrypt: string, checked?: boolean, value?: number) => {
    setShippingList((prev) => updateShippingListItem(prev, orderItemIdEncrypt, checked, value));
  };

  const allCheckedItem = (checked: boolean) => {
    setIsAllCheckedBox(checked);
    setShippingList((prev) => updateAllCheckedState(checked, prev));
  };

  const onChangeCancelReason = (value: Code<string>) => {
    setClaimReasonEnum(value);
  };

  const handleCancelApply = () => {
    if (!claimReasonEnum) {
      return;
    }

    const body: ClaimCancelRequestBody = {
      ordersIdEncrypt,
      orderShippingPriceIdEncrypt,
      claimReason: cancelReason,
      list: getRefundOrderItemList(shippingList),
      bankEnum: orderRefundAccountInfo?.data.bankEnum,
      bankAccountNumber: orderRefundAccountInfo?.data.bankAccountNumber,
      bankAccountHolder: orderRefundAccountInfo?.data.bankAccountHolder,
      claimItemStatusEnum: AllOrderStates.Claim.CA,
      claimReasonEnum: claimReasonEnum.code,
    };
    claimCancelRequest(body);
  };

  const handleReasonApply = () => {
    if (!claimReasonEnum) {
      setErrorMessageClaimReason('취소사유를 선택해 주세요.');
      return;
    }

    switch (claimReasonEnum.code) {
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_SIMPLE_CHANGE_MIND:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_ORDER_MISTAKE:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_CHANGE_OPTION:
      default:
        break;
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_DELIVERY_DELAY:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_GOODS_SOLD:
        if (cancelReason === '') {
          setErrorMessageReason('취소사유를 입력해 주세요.');
          return;
        }
    }

    showModal.text(messages.Confirm37, '', {
      buttonType: 'multi',
      leftType: 'tertiary',
      rightTitle: '예',
      leftTitle: '아니오',
      rightonClick: handleCancelApply,
    });
  };

  const placeholderText = () => {
    switch (claimReasonEnum?.code) {
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_SIMPLE_CHANGE_MIND:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_ORDER_MISTAKE:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_CHANGE_OPTION:
      default:
        return '취소사유를 입력해 주세요. (선택)';
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_DELIVERY_DELAY:
      case CLAIM_CANCEL_REQUEST_REASON.CANCEL_GOODS_SOLD:
        return '취소사유를 입력해 주세요. (필수)';
    }
  };
  const reasonList = [
    {
      label: '단순 변심',
      value: { code: CLAIM_CANCEL_REQUEST_REASON.CANCEL_SIMPLE_CHANGE_MIND, codeName: '단순 변심' },
    },
    {
      label: '주문 실수',
      value: { code: CLAIM_CANCEL_REQUEST_REASON.CANCEL_ORDER_MISTAKE, codeName: '주문 실수' },
    },
    {
      label: '옵션 변경',
      value: { code: CLAIM_CANCEL_REQUEST_REASON.CANCEL_CHANGE_OPTION, codeName: '옵션 변경' },
    },
    {
      label: '배송 지연',
      value: { code: CLAIM_CANCEL_REQUEST_REASON.CANCEL_DELIVERY_DELAY, codeName: '배송 지연' },
    },
    {
      label: '상품 품절',
      value: { code: CLAIM_CANCEL_REQUEST_REASON.CANCEL_GOODS_SOLD, codeName: '상품 품절' },
    },
  ];

  if (cancelOrderInfo?.success === false) return <></>;

  return (
    <S.CancelOrderWrap>
      <S.OhDetailSecGoods>
        <S.SummaryPart>
          <S.OrderDate>
            <S.Date>{dayjs(cancelOrderInfo?.data?.order?.orderDate).format('YYYY.MM.DD')}</S.Date>
            <S.OrderNumber>{cancelOrderInfo?.data?.order?.orderNumber}</S.OrderNumber>
          </S.OrderDate>
        </S.SummaryPart>
        <S.GoodsListPart>
          {isSelectOrder ? (
            <S.AllCheckBoxBar>
              <Checkbox
                checked={isAllCheckedBox}
                value={'전체 선택'}
                id={'allCheckedBox'}
                name={'allCheckedBox'}
                onChange={allCheckedItem}
              />
            </S.AllCheckBoxBar>
          ) : (
            <></>
          )}
          {shippingList.map((goods) => {
            return (
              <S.OrderItemPart key={goods.orderShippingPriceIdEncrypt}>
                {goods.goodsList.map((item) => {
                  return (
                    <ClaimPdItemGroup
                      key={item.goodsId}
                      item={item}
                      shippingListItemChange={shippingListItemChange}
                      withCheckbox={isSelectOrder}
                      title='취소'
                    />
                  );
                })}
              </S.OrderItemPart>
            );
          })}
        </S.GoodsListPart>
      </S.OhDetailSecGoods>
      <S.OhDetailSecReason ref={claimReasonRef}>
        <ClaimReason
          claimReasonEnum={claimReasonEnum}
          reasonList={reasonList}
          onChangeClaimReason={onChangeCancelReason}
          claimReason={cancelReason}
          setClaimReason={setCancelReason}
          title='취소'
          placeholder={placeholderText()}
          errorMessageClaimReason={errorMessageClaimReason}
          errorMessageReason={errorMessageReason}
        />
      </S.OhDetailSecReason>
      <S.OhDetailSecWrap>
        <ClaimRefundInfo
          refundInfo={refundInfo}
          paymentMethodEnum={cancelOrderInfo?.data?.payment.paymentMethodEnum}
          orderRefundAccountInfo={orderRefundAccountInfo}
          title='취소'
        />
      </S.OhDetailSecWrap>
      {refundInfo?.data.addPaymentYn ? (
        <>
          <ClaimAddPay
            refundInfo={refundInfo.data}
            title='취소'
          />
          <CashReceiptInfo />
        </>
      ) : (
        <></>
      )}

      <S.BtnPart>
        <TwoButton
          leftTitle={'취소'}
          rightTitle={'취소신청'}
          leftonClick={() => {
            showModal.text(messages.Alert321, '', {
              buttonType: 'multi',
              leftType: 'tertiary',
              rightTitle: '예',
              leftTitle: '아니오',
              rightonClick: () => router.back(),
            });
          }}
          rightonClick={() => {
            handleReasonApply();
          }}
          leftSize={4}
          rightSize={6}
        />
      </S.BtnPart>
    </S.CancelOrderWrap>
  );
};

export default CancelOrder;
//
