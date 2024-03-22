'use client';

import { useAtom } from 'jotai';
import { tokenAtom } from '@/atoms/tokenAtom';

export function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export function useJwtData() {
  const [token] = useAtom(tokenAtom);
  if (!token || !token.startsWith('Bearer ')) {
    return {
      jwtData: null,
      error: "Token doesn't exist",
    };
  }
  const jwt = token.split('Bearer ')[1];
  const jwtData = parseJwt(jwt);
  return {
    jwtData,
    error: null,
  };
}
