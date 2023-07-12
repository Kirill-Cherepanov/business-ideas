import type { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session extends Session {
    user?: Session['user'] & {
      id?: string;
    };
  }
}
