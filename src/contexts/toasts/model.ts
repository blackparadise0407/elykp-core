export type ToastVariant = 'success' | 'warning' | 'error';

export type ToastEnqueueOptions = Pick<IToast, 'variant'>;

export interface ToastEnqueueFn {
  (message: string, opts?: ToastEnqueueOptions): void;
}

export interface ToastCtx {
  enqueue: ToastEnqueueFn;
}

export interface IToast {
  uid: string;
  message: string;
  variant?: ToastVariant;
  autoClose?: number;
}
