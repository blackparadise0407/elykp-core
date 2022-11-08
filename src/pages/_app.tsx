import '@/assets/styles/globals.css';
import localFont from '@next/font/local';

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

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? (({ children }) => <>{children}</>);

  return (
    <main className={satoshiFont.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
