'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'styled-components';
import ResetStyles from '@ui/styles/ResetStyles';
import GlobalStyles from '@ui/styles/GlobalStyles';
import theme from '@ui/styles/theme';
import StyledComponentsProvider from 'providers/StyledComponentsProvider';

interface Props {
  children: ReactNode;
}

export default function GlobalUiProvider({ children }: Props) {
  const ToastContainer = dynamic(() => import('@ui/components/toast/ToastContainer'), { ssr: false });
  const ModalContainer = dynamic(() => import('@ui/components/modal/ModalContainer'), { ssr: false });

  return (
    <StyledComponentsProvider>
      <ThemeProvider theme={theme.lightTheme}>
        <ResetStyles />
        <GlobalStyles />
        {children}
        <ToastContainer />
        <ModalContainer />
      </ThemeProvider>
    </StyledComponentsProvider>
  );
}
