'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { tokenAtom } from '@/atoms/tokenAtom';
import { useAtomEffect } from '@/utils/useAtomEffect';

export default function DashboardPage() {
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
  return <div>Dashboard</div>;
}
