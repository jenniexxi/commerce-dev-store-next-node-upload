import type { Metadata } from 'next';
import Layout from 'components/layouts/Layout';
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
      <head>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'
        />
      </head>
      <body>
        <QueryProviders>
          <StoreProvider>
            <GlobalUiProvider>
              <div id='root'>
                <Layout>{children}</Layout>
              </div>
            </GlobalUiProvider>
          </StoreProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
