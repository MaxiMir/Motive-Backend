import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { decode } from 'next-auth/jwt';

export const Identify = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const token = await decode({
    token: req.cookies['next-auth.session-token'],
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return token?.exp > Date.now() / 1000 ? token : undefined;
});
