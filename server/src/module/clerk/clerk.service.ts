import { verifyToken } from '@clerk/backend';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkService {
  constructor(private readonly configService: ConfigService) {}

  async validateToken(req: Request) {
    try {
      const bearerToken = req.headers['authorization']?.replace('Bearer ', '');
      if (!bearerToken) {
        return {
          success: false,
          message: 'Invalid token',
          userDetails: null,
        };
      }
      const verifiedToken = await verifyToken(bearerToken, {
        jwtKey: this.configService.get<string>('clerk.CLERK_JWKS_PUBLIC_KEY'),
        authorizedParties: [
          this.configService.get<string>('app.FRONTEND_APP_URL')!,
        ], // Replace with your authorized parties
      });

      return {
        success: true,
        message: 'Token is valid',
        userDetails: {
          userId: verifiedToken.sub,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message ?? 'Invalid token',
        userDetails: null,
      };
    }
  }
}
