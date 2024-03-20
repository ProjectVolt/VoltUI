export const login = async (username: string, password: string) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (req.status === 401) {
    throw new Error('invalid-credentials');
  }
  if (req.status === 400) {
    throw new Error('invalid-data');
  }
  if (req.status !== 201) {
    throw new Error('unexpected-error');
  }
  const token = req.headers.get('Authorization');
  if (!token || !token.startsWith('Bearer ')) {
    throw new Error('token-not-found');
  }
  return token;
};
