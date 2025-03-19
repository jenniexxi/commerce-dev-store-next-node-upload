import { ReactNode, JSX } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CustomModalShowOptions, ModalData, TextModalShowOptions } from '@ui/components/modal/Modal.type';

export type ModalState = {
  modalList: ModalData[];
};
export type ModalActions = {
  showModal: {
    text: (title: string | JSX.Element, id?: string, options?: TextModalShowOptions) => void;
    custom: (component: ReactNode, id?: string, options?: CustomModalShowOptions) => void;
  };
  hideModal: (id: string) => void;
  hideAllModals: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const initState: ModalState = {
  modalList: [],
};

export const useModalStore = create<ModalStore>()(
  devtools((set) => ({
    ...initState,
    showModal: {
      text: (title, id = uuidV4(), options) =>
        set(
          (state) => ({
            modalList: [
              ...state.modalList,
              {
                id,
                modalType: 'text',
                title,
                type: 'center',
                isAnimation: true,
                showCloseBtn: false,
                isEnableBackDropHide: true,
                backDropAnimation: false,
                radius: 20,
                buttonType: 'single',
                leftonClick: () => state.hideModal(id),
                rightonClick: () => state.hideModal(id),
                ...options,
              },
            ],
          }),
          undefined,
          'modalStore/setModal/text',
        ),
      custom: (component, id = uuidV4(), options) =>
        set(
          (state) => ({
            modalList: [
              ...state.modalList,
              {
                id,
                modalType: 'custom',
                component,
                type: 'center',
                isAnimation: true,
                showCloseBtn: true,
                isEnableBackDropHide: true,
                backDropAnimation: false,
                radius: 20,
                ...options,
              },
            ],
          }),
          undefined,
          'modalStore/setModal/custom',
        ),
    },
    hideModal: (id) =>
      set(
        (state) => ({ modalList: state.modalList.filter((modal) => modal.id !== id) }),
        undefined,
        'modalStore/hideModal',
      ),
    hideAllModals: () => set(() => ({ modalList: [] }), undefined, 'modalStore/hideAllModals'),
  })),
);
