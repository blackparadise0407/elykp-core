import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { IToast } from './model';

interface ToastProps {
  data: IToast;
  onClose: (uid: string) => void;
}

export default function Toast({ data, onClose }: ToastProps) {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (data.autoClose != undefined) {
        onClose(data.uid);
      }
    }, data.autoClose ?? 0);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative min-w-[200px] pl-3 pr-8 py-2 bg-white shadow rounded-lg overflow-hidden">
      {data.message}
      {data.autoClose != undefined && (
        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-500 bg-left bg-no-repeat"
          style={{
            animation: `decrease ${data.autoClose / 1000}s linear 0s forwards`,
          }}
        />
      )}
      <AiOutlineClose
        className="absolute top-1.5 right-1.5"
        onClick={() => {
          onClose(data.uid);
        }}
      />
    </div>
  );
}
