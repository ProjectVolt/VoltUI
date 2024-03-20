import { atomWithStorage } from 'jotai/utils';

export const tokenAtom = atomWithStorage<string | null>('auth-token', null, undefined, {
  getOnInit: true,
});
