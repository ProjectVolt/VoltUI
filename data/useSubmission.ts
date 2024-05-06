import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

export type SubmissionStatus =
  | 'PENDING'
  | 'SUCCESS'
  | 'PARTIALLY_ACCEPTED'
  | 'WRONG_ANSWER'
  | 'CPU_TIME_LIMIT_EXCEEDED'
  | 'REAL_TIME_LIMIT_EXCEEDED'
  | 'MEMORY_LIMIT_EXCEEDED'
  | 'COMPILE_ERROR'
  | 'RUNTIME_ERROR'
  | 'SYSTEM_ERROR';

export type TestResult = {
  id: number;
  testCaseName: string;
  input: string;
  output: string | null;
  cpuTime: number;
  realTime: number;
  memory: number;
  signal: number;
  exitCode: number;
  error: string | null;
  result: SubmissionStatus;
  score: number;
  maxScore: number;
};

export type Submission = {
  id: number;
  problemId: number;
  createdOn: string;
  addedBy: number;
  sourceCode: string;
  language: 'c' | 'cpp' | 'python';
  status: SubmissionStatus;
  compileSuccess: boolean;
  runSuccess: boolean;
  answerSuccess: boolean;
  compileErrorMessage: string;
  compileErrorFatal: boolean;
  testResults: TestResult[];
  maxCpu: number;
  maxMemory: number;
  score: number;
};

export function useSubmissionById(id: number): {
  submission: Submission | null;
  isLoading: boolean;
  error: string | null;
  mutate: () => void;
} {
  const { data, error, isLoading, mutate } = useSWR(`submission/${id}`);
  return {
    submission: data ?? null,
    isLoading,
    error,
    mutate,
  };
}

export function useLastSubmission(problemId: number): {
  submission: Submission | null;
  isLoading: boolean;
  error: string | null;
  mutate: () => void;
} {
  const { data, error, isLoading, mutate } = useSWR(`submission/problem/${problemId}?limit=1`);
  return {
    submission: Array.isArray(data) && data.length > 0 ? data[0] : null,
    isLoading,
    error: error ?? (Array.isArray(data) ? undefined : 'not-array'),
    mutate,
  };
}

export function useSubmissionsInfinite(): {
  submissions: Submission[] | null;
  size: number;
  setSize: (size: number) => void;
  isLoading: boolean;
  error: string | null;
  mutate: () => void;
} {
  const getKey = (pageIndex: number, previousPageData: Submission[] | null) => {
    if (previousPageData && !previousPageData.length) return null;
    return `submission/?${new URLSearchParams({ page: pageIndex.toString(), pageSize: '10' })}`;
  };
  const { data, size, setSize, error, isLoading, mutate } = useSWRInfinite(getKey);
  return {
    submissions: Array.isArray(data) ? data.flatMap((i) => i) : [],
    size,
    setSize,
    isLoading,
    error: error ?? (Array.isArray(data) ? undefined : 'not-array'),
    mutate,
  };
}
