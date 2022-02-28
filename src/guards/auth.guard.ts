import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { decode } from 'next-auth/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = await decode({
      token: req.cookies[process.env.NEXTAUTH_COOKIE as string],
      secret: process.env.NEXTAUTH_SECRET as string,
    });
    const expires = token?.exp as number | undefined;

    return !!expires && expires > Date.now() / 1000;
  }
}