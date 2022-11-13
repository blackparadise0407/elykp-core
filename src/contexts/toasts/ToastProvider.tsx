import React from 'react';
import { v4 } from 'uuid';

import { IToast, ToastEnqueueFn } from './model';
import Toast from './Toast';
import { ToastContext } from './ToastContext';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<IToast[]>([]);

  const handleEnqueue: ToastEnqueueFn = React.useCallback(
    (message, opts = {}) => {
      const { variant = 'success' } = opts;
      const toast = {
        uid: v4(),
        message,
        variant,
        autoClose: 5000,
      } as IToast;
      setToasts((prev) => [...prev, toast]);
    },
    [],
  );

  const handleRemove = React.useCallback((uid: string) => {
    setToasts((prev) => {
      const clone = [...prev];
      const foundIdx = clone.findIndex((it) => it.uid === uid);
      if (foundIdx > -1) {
        clone.splice(foundIdx, 1);
        return clone;
      }
      return prev;
    });
  }, []);

  return (
    <ToastContext.Provider value={{ enqueue: handleEnqueue }}>
      <div className="fixed top-3 right-3 space-y-3 z-[999]">
        {toasts.map((it) => (
          <Toast key={it.uid} data={it} onClose={handleRemove} />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
}
