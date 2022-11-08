import '@/assets/styles/globals.css';
import localFont from '@next/font/local';
import { Suspense } from 'react';

const satoshiFont = localFont({
  src: [
    {
      path: '../assets/fonts/Satoshi-Light.woff2',
      weight: '300',
    },
    {
      path: '../assets/fonts/Satoshi-Regular.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/Satoshi-Medium.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/Satoshi-Bold.woff2',
      weight: '700',
    },
  ],
});

const sfuiFont = localFont({
  src: [
    {
      path: '../assets/fonts/SFUIText-Light.woff',
      weight: '300',
    },
    {
      path: '../assets/fonts/SFUIText-Regular.woff',
      weight: '400',
    },
    {
      path: '../assets/fonts/SFUIText-Medium.woff',
      weight: '500',
    },
    {
      path: '../assets/fonts/SFUIText-Semibold.woff',
      weight: '600',
    },
    {
      path: '../assets/fonts/SFUIText-Bold.woff',
      weight: '700',
    },
  ],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? (({ children }) => <>{children}</>);

  return (
    <main className={sfuiFont.className}>
      <Suspense fallback={<>Loading...</>}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Suspense>
    </main>
  );
}
