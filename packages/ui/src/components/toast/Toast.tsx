'use client';

import { useEffect, useState } from 'react';
import * as S from './Toast.style';

interface ToastProps {
  id: string;
  message: string;
  duration: number;
  onClose: (id: string) => void;
  bottom: number;
}

export default function Toast({ message, duration, onClose, id, bottom }: ToastProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => onClose(id), 300); // Wait for fade out animation
    }, duration - 300);

    return () => clearTimeout(timer);
  }, [duration, onClose, id]);

  return (
    <S.ToastWrapper
      $isClosing={isClosing}
      $bottom={bottom}
    >
      {message}
    </S.ToastWrapper>
  );
}
