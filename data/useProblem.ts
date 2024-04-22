'use client';

import useSWR from 'swr';

export type Tag = {
  id: number;
  name: string;
};

export type Problem = {
  id: number;
  visible: boolean;
  name: string;
  description: string;
  languages: string[];
  template: string;
  addedBy: number;
  timeLimit: number;
  memoryLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: Tag[];
  author: string;
  transparentTestCases: number;
  totalScore: number;
  submissionCount: number;
  acceptedSubmissions: number;
  wrongSubmissions: number;
  partiallyAccepted: number;
  runtimeErrors: number;
  compileErrors: number;
};

export type AdminProblem = Problem & {
  testCases: {
    id: number;
    name: string;
    input: string;
    output: string;
    maxScore: number;
  }[];
};

export function useProblems(
  search: string,
  page: number,
  pageSize: number
): {
  problems: Problem[] | null;
  isLoading: boolean;
  error: string | null;
  mutate: () => void;
} {
  const { data, error, isLoading, mutate } = useSWR(
    `problem/?${new URLSearchParams({ search, page: page.toString(), pageSize: pageSize.toString() })}`
  );
  return {
    problems: Array.isArray(data) ? data : [],
    isLoading,
    error: error ?? (Array.isArray(data) ? undefined : 'An error occurred'),
    mutate,
  };
}

export function useAdminProblem(id: number): {
  problem: AdminProblem | null;
  isLoading: boolean;
  error: string | null;
  mutate: () => void;
} {
  const { data, error, isLoading, mutate } = useSWR(`problem/admin/${id}`);
  return {
    problem: data,
    isLoading,
    error,
    mutate,
  };
}
