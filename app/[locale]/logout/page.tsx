'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@mantine/core';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { tokenAtom } from '@/atoms/tokenAtom';

export default function LogoutPage() {
  const [, setToken] = useAtom(tokenAtom);
  const router = useRouter();
  useEffect(() => {
    setToken(RESET);
    router.push('/login');
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Loader color="teal" />
    </div>
  );
}
