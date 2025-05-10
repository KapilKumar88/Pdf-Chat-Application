import { verifyToken } from '@clerk/backend';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClerkService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

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

      const userDetails = await this.prismaService.user.findFirstOrThrow({
        where: {
          clerkId: verifiedToken.sub,
        },
      });

      return {
        success: true,
        message: 'Token is valid',
        userDetails: {
          clerkId: verifiedToken.sub,
          userId: userDetails.id,
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
