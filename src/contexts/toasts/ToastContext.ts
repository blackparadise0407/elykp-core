import React from 'react';

import { ToastCtx } from './model';

export const ToastContext = React.createContext<ToastCtx>({
  enqueue: () => {},
});

export const useToast = () => {
  return React.useContext(ToastContext);
};
