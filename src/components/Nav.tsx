'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useMenuDisclosure } from '@/hooks';
import Link from './Link';

export function Nav() {
  const { close: closeNav, open: openNav, anchor: elNav } = useMenuDisclosure();
  const { close: closeUser, open: openUser, anchor: elUser } = useMenuDisclosure();

  const session = useSession().data;
  const [providers, setProviders] = useState<Object>([]);
  useEffect(() => {
    async function manageProviders() {
      const res = await getProviders();
      setProviders(res || {});
    }
    manageProviders();
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Business ideas
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openNav}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={elNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={!!elNav}
              onClose={closeNav}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={closeNav}>
                <Typography textAlign="center" href="/create" component={Link}>
                  Create Post
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Business ideas
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              href="/create"
              component={Link}
              onClick={closeNav}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Create post
            </Button>
          </Box>

          {session?.user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={openUser} sx={{ p: 0 }}>
                  <Avatar alt={session.user.username} src={session.user.image || ''} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={elUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={!!elUser}
                onClose={closeUser}
              >
                <MenuItem onClick={closeUser}>
                  <Typography variant="button" component={Link} href="/profile" textAlign="center">
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={closeUser}>
                  <Typography
                    variant="button"
                    component="button"
                    onClick={() => signOut()}
                    textAlign="center"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            Object.values(providers).map((provider) => (
              <Button type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                Sign in
              </Button>
            ))
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// export function Nav() {
//   const { data: session } = useSession();

//   const [providers, setProviders] = useState<Object>([]);

//   useEffect(() => {
//     async function manageProviders() {
//       const res = await getProviders();
//       setProviders(res || {});
//     }
//     manageProviders();
//   }, []);

//   return (
//     <nav>
//       <Link href="/">
//         <p className="logo_text">Business Mania</p>
//       </Link>

//       <div>
//         {session?.user ? (
//           <div>
//             <Link href="/create">Create Post</Link>

//             <button type="button" onClick={() => signOut()}>
//               Sign Out
//             </button>

//             <Link href="/profile">
//               <Image src={session.user.image || ''} width={37} height={37} alt="profile" />
//             </Link>
//           </div>
//         ) : (
//           Object.values(providers).map((provider) => (
//             <button
//               type="button"
//               key={provider.name}
//               onClick={() => {
//                 signIn(provider.id);
//               }}
//             >
//               Sign in
//             </button>
//           ))
//         )}
//       </div>
//     </nav>
//   );
// }
