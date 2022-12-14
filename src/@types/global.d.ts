import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ElementType } from 'react';

export {};

declare global {
  type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    Layout?: ElementType;
    isPrivate?: boolean;
    preventAuthAccess?: boolean;
  };

  type AppPropsWithLayout = Omit<AppProps, 'Component'> & {
    Component: NextPageWithLayout;
  };
}
