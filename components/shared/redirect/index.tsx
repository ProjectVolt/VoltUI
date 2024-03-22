'use client';

import { PropsWithChildren, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { tokenAtom } from '@/atoms/tokenAtom';
import { useAtomEffect } from '@/utils/useAtomEffect';
import { parseJwt } from '@/data';

export function RedirectNotLoggedIn({ children }: PropsWithChildren) {
  const router = useRouter();
  useAtomEffect(
    useCallback(
      (get) => {
        const currentToken = get(tokenAtom);
        if (!currentToken || !currentToken.startsWith('Bearer ')) {
          router.push('/login');
        } else {
          const data = parseJwt(currentToken.split('Bearer ')[1]);
          if (data.exp * 1000 < Date.now()) {
            router.push('/logout');
          }
        }
      },
      [tokenAtom]
    )
  );
  return <>{children}</>;
}
