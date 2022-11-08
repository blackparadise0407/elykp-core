import clsx from 'clsx';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import useTranslation from '@/hooks/useTranslation';
import AuthLayout from '@/layouts/Auth';

interface LoginForm {
  email: string;
  password: string;
}

const Login: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (formData: LoginForm) => {
    console.log(formData);
  };

  return (
    <div className="flex max-w-5xl w-full h-[66vh] rounded-3xl shadow-2xl bg-white overflow-hidden">
      <div className="hidden md:block bg-blobBg w-1/2 h-full bg-no-repeat bg-center bg-cover"></div>
      <div className="flex-1 flex flex-col items-center justify-center p-5 gap-2 md:gap-3">
        <div className="grow"></div>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          {t('hello')}
        </h1>
        <p className="max-w-xs text-center text-gray-500 text-xs md:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
          doloremque esse. Alias eaque debitis numquam.
        </p>
        <form
          className="mt-5 max-w-xs w-full flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              className={clsx('input w-full', errors.email && 'error')}
              type="text"
              placeholder={t('your_email')}
              {...register('email', {
                required: t('validation.please_enter_email'),
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('password')}</label>
            <input
              className={clsx('input w-full', errors.password && 'error')}
              type="password"
              placeholder={t('your_password')}
              {...register('password', {
                required: t('validation.please_enter_password'),
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="flex flex-wrap items-center text-xs md:text-sm">
            <div className="grow"></div>
            <Link href="/forgot-password">{t('forgot_password')}?</Link>
          </div>
          <button className="btn mt-5" type="submit">
            {t('sign_in')}
          </button>
        </form>
        <div className="grow"></div>
        <p className="text-xs md:text-sm text-gray-500">
          {t('doesnt_have_an_account')}?{' '}
          <Link className="font-medium" href="/register">
            {t('sign_up_now')}
          </Link>
        </p>
      </div>
    </div>
  );
};

Login.Layout = AuthLayout;

export default Login;
