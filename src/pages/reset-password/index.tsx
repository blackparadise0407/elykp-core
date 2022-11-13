import AuthLayout from '@/layouts/Auth';

const ResetPassword: NextPageWithLayout = () => {
  return <div>RESET PASSWORD</div>;
};

ResetPassword.Layout = AuthLayout;
ResetPassword.preventAuthAccess = true;

export default ResetPassword;
