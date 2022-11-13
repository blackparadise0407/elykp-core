import { yupResolver } from '@hookform/resolvers/yup';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { AuthContainer } from '@/components';
import { useToast } from '@/contexts/toasts';
import { withPreventAuth } from '@/HOCs/withPreventAuth';
import useTranslation from '@/hooks/useTranslation';
import AuthLayout from '@/layouts/Auth';

import { LoginForm, loginSchema } from './schema';

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    query: { return_to },
  } = router;
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const { enqueue } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginForm) => {
    try {
      await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (return_to && typeof return_to === 'string') {
        router.push(return_to);
        return;
      }

      router.push('/');
    } catch (e) {}
  };

  return (
    <>
      <Head>
        <title>{t('sign_in')}</title>
      </Head>
      <AuthContainer>
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
              {...register('email')}
            />
            {errors.email && <p>{t(errors.email.message)}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('password')}</label>
            <input
              className={clsx('input w-full', errors.password && 'error')}
              type="password"
              placeholder={t('your_password')}
              {...register('password')}
            />
            {errors.password && <p>{t(errors.password.message)}</p>}
          </div>
          <div className="flex flex-wrap items-center text-xs md:text-sm">
            <div className="grow"></div>
            <Link href="/forgot-password">{t('forgot_password')}?</Link>
          </div>
          <button className="btn mt-5" type="submit">
            {t('sign_in')}
          </button>
        </form>
        <button
          className="btn"
          onClick={() => {
            enqueue('halo');
          }}
        >
          Toast
        </button>
        <div className="grow"></div>
        <p className="text-xs md:text-sm text-gray-500">
          {t('doesnt_have_an_account')}?{' '}
          <Link className="font-medium" href="/register">
            {t('sign_up_now')}
          </Link>
        </p>
      </AuthContainer>
    </>
  );
};

Login.Layout = AuthLayout;
Login.preventAuthAccess = true;

export const getServerSideProps = withPreventAuth(async (_) => {
  return {
    props: {},
  };
});

export default Login;
