'use client';

import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { tokenAtom } from '@/atoms/tokenAtom';
import { useAtomEffect } from '@/utils/useAtomEffect';
import { parseJwt } from '@/data';

export function RedirectNotLoggedIn({ children }: PropsWithChildren) {
  const router = useRouter();
  const check = (token: string | null) => {
    if (!token || !token.startsWith('Bearer ')) {
      router.push('/login');
    } else {
      const data = parseJwt(token.split('Bearer ')[1]);
      if (data.exp * 1000 < Date.now()) {
        router.push('/logout');
      }
    }
  };
  useAtomEffect(
    useCallback(
      (get) => {
        const currentToken = get(tokenAtom);
        check(currentToken);
      },
      [tokenAtom]
    )
  );
  const [token] = useAtom(tokenAtom);
  useEffect(() => {
    const interval = setInterval(() => {
      check(token);
    }, 5000);
    return () => clearInterval(interval);
  }, [token]);
  return <>{children}</>;
}
