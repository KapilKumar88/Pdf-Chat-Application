import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  user: {
    userId: string;
    clerkId: string;
  };
}
