import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getToken } from 'next-auth/jwt';

export const Identify = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  return typeof token?.exp === 'number' && token?.exp > Date.now() / 1000 ? token?.id : undefined;
});
