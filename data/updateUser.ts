export const updateUser = async (
  token: string,
  id: number | string,
  values: { github: string; school: string }
) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(values),
  });
  if (req.status === 400) {
    throw new Error('invalid-data');
  }
  if (req.status !== 200) {
    throw new Error('unexpected-error');
  }
};
