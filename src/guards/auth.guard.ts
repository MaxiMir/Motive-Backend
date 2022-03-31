import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getToken } from 'src/lib/token';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = await getToken(req);

    return !!token;
  }
}
