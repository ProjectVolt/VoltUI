import { Problem } from './useProblem';

export const updateProblem = async (token: string, problemId: number, data: Partial<Problem>) => {
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
