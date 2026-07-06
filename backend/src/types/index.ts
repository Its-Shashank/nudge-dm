export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  subscription?: {
    plan: string;
    status: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
