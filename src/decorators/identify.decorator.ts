import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { decode } from 'next-auth/jwt';

export const Identify = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const token = await decode({
    token: req.cookies['next-auth.session-token'],
    secret: process.env.NEXTAUTH_SECRET as string,
  });
  const expires = token?.exp as number | undefined;

  return expires && expires <= Date.now() / 1000 ? undefined : token?.client;
});
