import { yupResolver } from '@hookform/resolvers/yup';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import Head from 'next/head';
import { useForm } from 'react-hook-form';

import { AuthContainer } from '@/components';
import useTranslation from '@/hooks/useTranslation';
import AuthLayout from '@/layouts/Auth';

import { ForgotPasswordForm, forgotPasswordSchema } from './schema';

const ForgotPassword: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (formData: ForgotPasswordForm) => {
    try {
      await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: window.location.origin + '/reset-password',
      });
    } catch (e) {}
  };

  return (
    <>
      <Head>
        <title>{t('forgot_password')}</title>
      </Head>
      <AuthContainer>
        <div className="grow"></div>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          {t('forgot_password')}
        </h1>
        <p className="max-w-xs text-center text-gray-500 text-xs md:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
          doloremque esse.
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

          <button className="btn mt-5" type="submit">
            {t('send_me_reset_password_link')}
          </button>
        </form>
        <div className="grow"></div>
      </AuthContainer>
      ;
    </>
  );
};

ForgotPassword.Layout = AuthLayout;
ForgotPassword.preventAuthAccess = true;

export default ForgotPassword;
