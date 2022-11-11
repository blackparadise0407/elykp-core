import {
  SupabaseClient,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import useSWR from 'swr';

export function useUser(client?: SupabaseClient<any, 'public', any>) {
  const supabase = useSupabaseClient();
  const _client = 'auth' in supabase ? supabase : client;
  const { data, error } = useSWR('user_me', () => _client?.auth?.getUser());

  return {
    isLoading: !error && !data,
    isError: error,
    user: data?.data.user,
  };
}
