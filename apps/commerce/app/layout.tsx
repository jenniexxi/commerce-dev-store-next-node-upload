import type { Metadata } from 'next';
import GlobalUiProvider from 'providers/GlobalUiProvider';
import QueryProviders from 'providers/QueryProvider';
import { StoreProvider } from 'providers/StoreProvider';

export const metadata: Metadata = {
  title: 'Commerce | Rround',
  description: 'Commerce',
  icons: [], // NOTE: favicon 정의
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <QueryProviders>
          <StoreProvider>
            <GlobalUiProvider>{children}</GlobalUiProvider>
          </StoreProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
