'use client';

import { PropsWithChildren, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { tokenAtom } from '@/atoms/tokenAtom';
import { useAtomEffect } from '@/utils/useAtomEffect';

export function RedirectNotLoggedIn({ children }: PropsWithChildren) {
  const router = useRouter();
  useAtomEffect(
    useCallback(
      (get) => {
        const currentToken = get(tokenAtom);
        if (!currentToken) {
          router.push('/login');
        }
      },
      [tokenAtom]
    )
  );
  return <>{children}</>;
}
