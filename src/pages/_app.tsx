import '@/assets/styles/globals.css';

import localFont from '@next/font/local';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import React from 'react';

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
  const router = useRouter();
  const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());

  const Layout = Component.Layout ?? (({ children }) => <>{children}</>);

  React.useEffect(() => {
    async function eff() {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!session && Component.isPrivate) {
        router.push('/login');
      }
    }

    eff();

    const subscription = supabaseClient.auth.onAuthStateChange((_, session) => {
      if (!session && Component.isPrivate) {
        console.log('router', router);
        router.push('/login');
        return;
      }

      if (session && Component.preventAuthAccess) {
        router.push('/');
        return;
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <main className={sfuiFont.className}>
        <React.Suspense fallback={<>Loading...</>}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </React.Suspense>
      </main>
    </SessionContextProvider>
  );
}
