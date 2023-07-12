'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

export function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Object>([]);

  useEffect(() => {
    async function manageProviders() {
      const res = await getProviders();
      setProviders(res || {});
    }
    manageProviders();
  }, []);

  return (
    <nav>
      <Link href="/">
        <p className="logo_text">Business Mania</p>
      </Link>

      <div>
        {session?.user ? (
          <div>
            <Link href="/create-prompt">Create Post</Link>

            <button type="button" onClick={() => signOut()}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image src={session.user.image || ''} width={37} height={37} alt="profile" />
            </Link>
          </div>
        ) : (
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => {
                signIn(provider.id);
              }}
            >
              Sign in
            </button>
          ))
        )}
      </div>
    </nav>
  );
}
