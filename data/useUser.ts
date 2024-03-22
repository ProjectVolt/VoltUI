'use client';

import useSWR from 'swr';
import { useJwtData } from './useJwtData';

export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  github: string | null;
  school: string | null;
  submissionCount: number;
  acceptedSubmissions: number;
  totalScore: number;
};

export function useUser(): { user: User | null; isLoading: boolean; error: string | null } {
  const { jwtData, error: jwtError } = useJwtData();

  const { data, error, isLoading } = useSWR(
    `user/?${new URLSearchParams({ search: jwtData ? jwtData.sub : '', page: '0', pageSize: '10' })}`
  );

  if (jwtError) {
    return {
      user: null,
      isLoading: false,
      error: jwtError,
    };
  }

  if (data && Array.isArray(data) && data.length === 0) {
    return {
      user: null,
      isLoading: false,
      error: 'User not found',
    };
  }

  return {
    user:
      data && Array.isArray(data) ? data.find((user: User) => user.username === jwtData.sub) : null,
    isLoading,
    error,
  };
}
