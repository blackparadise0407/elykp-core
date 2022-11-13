import { yupResolver } from '@hookform/resolvers/yup';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

import { AuthContainer } from '@/components';
import { withPreventAuth } from '@/HOCs/withPreventAuth';
import useTranslation from '@/hooks/useTranslation';
import AuthLayout from '@/layouts/Auth';

import { RegisterForm, registerSchema } from './schema';

const Register: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const supabase = useSupabaseClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (formData: RegisterForm) => {
    setLoading(true);
    try {
      await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password.trim(),
        options: {
          data: {
            username: formData.username.trim(),
          },
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t('sign_up')}</title>
      </Head>
      <AuthContainer bgCls="bg-abstractBg">
        <div className="grow"></div>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          {t('sign_up')}
        </h1>
        <p className="max-w-xs text-center text-gray-500 text-xs md:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
          doloremque esse. Alias eaque debitis numquam.
        </p>
        <form
          className="w-full flex flex-col max-w-xs gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label htmlFor="username">{t('username')}</label>
            <input
              className={clsx('input w-full', errors.username && 'error')}
              type="text"
              placeholder={t('pick_a_name')}
              {...register('username')}
            />
            {errors.username && <p>{t(errors.username.message)}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              className={clsx('input w-full', errors.email && 'error')}
              type="text"
              placeholder={t('your_email')}
              {...register('email')}
            />
            {errors.email && <p>{t(errors.email.message)}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              className={clsx('input w-full', errors.password && 'error')}
              type="password"
              placeholder={t('your_password')}
              {...register('password')}
            />
            {errors.password && <p>{t(errors.password.message)}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">{t('confirm_password')}</label>
            <input
              className={clsx(
                'input w-full',
                errors.confirmPassword && 'error',
              )}
              type="password"
              placeholder={t('reenter_password')}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p>{t(errors.confirmPassword.message)}</p>
            )}
          </div>
          <button className="btn mt-5" type="submit">
            {t('sign_up')}
          </button>
        </form>
        <div className="grow"></div>
        <p className="text-xs md:text-sm text-gray-500">
          {t('already_have_an_account')}?{' '}
          <Link className="font-medium" href="/login">
            {t('sign_in_now')}
          </Link>
        </p>
      </AuthContainer>
    </>
  );
};

Register.Layout = AuthLayout;

export const getServerSideProps = withPreventAuth(async (_) => {
  return {
    props: {},
  };
});

export default Register;
