import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ElementType } from 'react';

export {};

declare global {
  type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    // getLayout?: (page: ReactElement) => ReactNode;
    Layout?: ElementType<P>;
  };

  type AppPropsWithLayout = Omit<AppProps, 'Component'> & {
    Component: NextPageWithLayout;
  };
}
