import clsx from 'clsx';

interface AuthContainerProps {
  children: React.ReactNode;
  bgCls?: string;
}

export default function AuthContainer({ children, bgCls }: AuthContainerProps) {
  return (
    <div className="flex max-w-5xl w-full h-[66vh] rounded-3xl shadow-2xl bg-white overflow-hidden">
      <div
        className={clsx(
          'hidden md:block w-1/2 h-full bg-no-repeat bg-center bg-cover',
          bgCls || 'bg-blobBg',
        )}
      ></div>
      <div className="flex-1 flex flex-col items-center justify-center p-5 gap-2 md:gap-3">
        {children}
      </div>
    </div>
  );
}
