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
  addToast: (message: string, id?: string, duration?: number, bottom?: number) => void;
  removeToast: (id: string) => void;
};

export type ToastStore = ToastState & ToastActions;

export const initState: ToastState = {
  toasts: [],
};

export const useToastStore = create<ToastStore>()(
  devtools((set) => ({
    ...initState,
    addToast: (message: string, id = uuidv4(), duration = 3000, bottom = 10) =>
      set(
        (state) => ({ toasts: [...state.toasts, { id, message, duration, bottom }] }),
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
