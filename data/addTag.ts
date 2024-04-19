import { Tag } from './useProblem';

export const addTag = async (token: string, name: string): Promise<Tag> => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify({ name }),
  });
  if (req.status === 400) {
    throw new Error('invalid-data');
  }
  if (req.status !== 200) {
    throw new Error('unexpected-error');
  }
  return req.json();
};
