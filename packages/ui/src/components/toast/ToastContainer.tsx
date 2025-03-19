'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useToastStore } from '@ui/stores';
import Toast from './Toast';
import * as S from './Toast.style';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    if (window !== undefined) {
      return;
    }
  }, [toasts]);

  return createPortal(
    <>
      {toasts && (
        <S.ToastContainerWrapper>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              duration={toast.duration}
              bottom={toast.bottom || 10}
              onClose={removeToast}
            />
          ))}
        </S.ToastContainerWrapper>
      )}
    </>,
    document.body,
  );
}
