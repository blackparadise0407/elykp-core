import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';

export function withAuth(gssp: GetServerSideProps) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<
    GetServerSidePropsResult<{
      [key: string]: any;
    }>
  > => {
    const { req } = ctx;
    const token = req.cookies?.['supabase-auth-token'];
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    return await gssp(ctx);
  };
}
