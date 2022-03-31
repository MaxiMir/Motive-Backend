import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getToken } from 'src/lib/token';

export const Identify = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const token = await getToken(req);

  return token?.id;
});
