import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ClerkService } from 'src/module/clerk/clerk.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly clerkService: ClerkService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const result = await this.clerkService.validateToken(request);

    if (result?.success) {
      request['user'] = result.userDetails;
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
