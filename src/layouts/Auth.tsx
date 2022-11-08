interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-red-200 via-neutral-200 to-rose-100 bg-center bg-no-repeat bg-cover px-5">
      {children}
    </div>
  );
}
