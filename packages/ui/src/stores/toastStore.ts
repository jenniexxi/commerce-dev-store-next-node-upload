import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ToastData {
  id: string;
  message: string;
  duration: number;
  bottom?: number;
}

export type ToastState = {
  toasts: ToastData[];
};
export type ToastActions = {
  addToast: (message: string, duration?: number, bottom?: number, id?: string) => void;
  removeToast: (id: string) => void;
};

export type ToastStore = ToastState & ToastActions;

export const initState: ToastState = {
  toasts: [],
};

export const useToastStore = create<ToastStore>()(
  devtools((set) => ({
    ...initState,
    addToast: (message: string, duration = 3000, bottom = 10, id = uuidv4()) =>
      set(
        (state) => {
          // 동일한 ID를 가진 토스트가 이미 존재하는지 확인
          const toastExists = state.toasts.some((toast) => toast.id === id);

          // 이미 존재하면 상태를 변경하지 않고 그대로 반환
          if (toastExists) {
            return { toasts: state.toasts };
          }

          // 존재하지 않으면 새로운 토스트 추가
          return { toasts: [...state.toasts, { id, message, duration, bottom }] };
        },
        undefined,
        'toastStore/addToast',
      ),
    removeToast: (id) =>
      set(
        (state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }),
        undefined,
        'toastStore/removeToast',
      ),
  })),
);
