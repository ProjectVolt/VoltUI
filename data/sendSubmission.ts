import { Submission } from './useSubmission';

export type CreateSubmissionData = {
  problemId: number;
  sourceCode: string;
  language: 'c' | 'cpp' | 'python';
};

export const createSubmission = async (
  token: string,
  data: CreateSubmissionData
): Promise<Submission> => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submission/`, {
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
