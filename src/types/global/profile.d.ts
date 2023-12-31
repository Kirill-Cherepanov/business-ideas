import type { Profile } from 'next-auth';

declare module 'next-auth' {
  interface Profile extends Profile {
    id: string;
    picture?: string;
  }
}
