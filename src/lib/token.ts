import { decode } from 'next-auth/jwt';

export const getToken = async (req: any) => {
  const { NEXTAUTH_SECRET, NEXTAUTH_COOKIE } = process.env;

  if (!NEXTAUTH_SECRET || !NEXTAUTH_COOKIE || !req.cookies[NEXTAUTH_COOKIE]) {
    return null;
  }

  const token = await decode({
    token: req.cookies[NEXTAUTH_COOKIE],
    secret: NEXTAUTH_SECRET,
  });

  return typeof token?.exp === 'number' && token?.exp > Date.now() / 1000 ? token : null;
};
