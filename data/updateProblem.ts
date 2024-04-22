import { Problem } from './useProblem';

export type CreateTestCase = {
  name: string;
  input: string;
  output: string;
  maxScore: number;
};

export type CreateProblem = {
  visible: boolean;
  name: string;
  description: string;
  languages: string[];
  timeLimit: number;
  memoryLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: number[];
  testCases: CreateTestCase[];
  transparentTestCases: number;
  author: string | null;
};

export type PutProblem = CreateProblem;

export const addProblem = async (token: string, data: CreateProblem): Promise<Problem> => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problem/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (req.status === 400) {
    throw new Error('invalid-data');
  }
  if (req.status !== 201) {
    throw new Error('unexpected-error');
  }
  return req.json();
};

export const updateProblem = async (
  token: string,
  problemId: number,
  data: Partial<PutProblem>
) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problem/${problemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (req.status === 400) {
    throw new Error('invalid-data');
  }
  if (req.status !== 200) {
    throw new Error('unexpected-error');
  }
};
