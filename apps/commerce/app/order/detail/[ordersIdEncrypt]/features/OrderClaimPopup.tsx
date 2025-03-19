'use client';
import { ClaimList, OrderHistoryDetail } from 'type/api/order';
import PopupAdditionalPay from './PopupAdditionalPay';
import PopupDelay from './PopupDelay';
import PopupRefund from './PopupRefund';
import PopupReject from './PopupReject';
import { CLAIM_TYPE_CODES } from 'type/claims';
import { Modal } from '@ui/components';

export type Popup = 'Cancel' | 'Return' | 'Reject' | 'Delay' | 'AddtionalPay';

type Props = {
  type: Popup;
  data: OrderHistoryDetail;
  onHide: () => void;
};

const OrderClaimPopup = ({ type, data, onHide }: Props) => {
  const getPopupContent = () => {
    switch (type) {
      case 'Cancel':
      case 'Return': {
        const claimTypeCode = type === 'Cancel' ? CLAIM_TYPE_CODES.Cancel : CLAIM_TYPE_CODES.Return;

        const filteredList = data.data.claimList.filter((item: ClaimList) => {
          return item.claimTypeEnum.code === claimTypeCode;
        });

        return (
          <PopupRefund
            claimDetails={filteredList}
            claimType={type}
          />
        );
      }
      case 'Reject': {
        const rejectList = data.data.rejectList;
        return <PopupReject rejectDetails={rejectList} />;
      }
      case 'Delay': {
        const delayList = data.data.shippingDelayList;
        return <PopupDelay delayDetails={delayList} />;
      }
      case 'AddtionalPay': {
        const addtionalPayList = data.data.addPaymentList;
        return <PopupAdditionalPay addtionalPayDetails={addtionalPayList} />;
      }
    }
  };

  return (
    <Modal
      type='full'
      onHide={onHide}
    >
      {getPopupContent()}
    </Modal>
  );
};

export default OrderClaimPopup;
