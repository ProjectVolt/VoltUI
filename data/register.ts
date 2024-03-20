export const register = async (
  email: string,
  username: string,
  password: string,
  school?: string
) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password, school }),
  });
  if (req.status === 409) {
    const msg = await req.text();
    if (msg.toLowerCase().startsWith('username')) {
      throw new Error('username-already-exists');
    } else {
      throw new Error('email-already-exists');
    }
  }
  if (req.status === 403) {
    throw new Error('registration-not-allowed');
  }
  if (req.status === 400) {
    throw new Error('invalid-data');
  }
  if (req.status !== 201) {
    throw new Error('unexpected-error');
  }
};
