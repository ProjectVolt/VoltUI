'use client';

import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { SWRConfig } from 'swr';
import { tokenAtom } from '@/atoms/tokenAtom';

export function SwrWrapper({ children }: { children: any }) {
  const [token] = useAtom(tokenAtom);
  const router = useRouter();
  return (
    <SWRConfig
      value={{
        onError: (err) => {
          if (err.status === 401) {
            router.push('/logout');
          }
        },
        fetcher: (url: string) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
            credentials: 'include',
            headers: {
              Authorization: token ?? '',
            },
          }).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
