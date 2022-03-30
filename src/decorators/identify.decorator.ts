import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { decode } from 'next-auth/jwt';

export const Identify = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const token = await decode({
    token: req.cookies[process.env.NEXTAUTH_COOKIE as string],
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  return typeof token?.exp === 'number' && token?.exp > Date.now() / 1000 ? token?.id : undefined;
});
