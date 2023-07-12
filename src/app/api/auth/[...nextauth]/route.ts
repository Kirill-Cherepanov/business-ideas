import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { User } from '@/database';
import { GOOGLE_CLIENT_SECRET, GOOGLE_ID } from '@/config';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user?.email });
      if (!sessionUser) return session;

      session.user!.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        if (!profile || !profile.name || !profile.image) {
          console.error('No profile was sent or profile was incomplete!');
          return false;
        }

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        if (userExists) return true;

        // if not, create a new document and save user in MongoDB
        await User.create({
          email: profile.email,
          username: profile.name.replace(' ', '').toLowerCase(),
          image: profile.image,
        });
        return true;
      } catch (error) {
        console.log('Error checking if user exists: ', (error as { message: string }).message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
