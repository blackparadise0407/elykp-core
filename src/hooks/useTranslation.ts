import { useRouter } from 'next/router';

import { get } from '@/utils';

import en from '../../public/locales/en.json';
import vi from '../../public/locales/vi.json';

export default function useTranslation() {
  const { locale } = useRouter();

  const trans = (locale === 'en' ? en : vi) as Record<string, any>;

  function t(key?: string) {
    return get(trans, key, '');
  }

  return {
    t,
  };
}
