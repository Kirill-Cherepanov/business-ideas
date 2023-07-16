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
    <AppBar color="secondary" position="relative" sx={{ zIndex: 10 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Business Ideas
          </Typography>

          {session?.user && (
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
                <MenuItem onClick={closeNav} component={Link} href="/create" textAlign="center">
                  Create Post
                </MenuItem>
              </Menu>
            </Box>
          )}

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
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Business Ideas
          </Typography>

          {session?.user ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  href="/create"
                  component={Link}
                  onClick={closeNav}
                  color="inherit"
                  sx={{ ml: 'auto', mr: 4 }}
                >
                  Create post
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={openUser} sx={{ p: 0 }}>
                    <Avatar>
                      <Image alt={session.user.username} src={session.user.image} fill />
                    </Avatar>
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
                  <MenuItem onClick={closeUser} component={Link} href="/profile" noLinkStyle>
                    Profile
                  </MenuItem>
                  <MenuItem component="button" onClick={() => !!signOut() && closeUser()}>
                    Sign out
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            Object.values(providers).map((provider) => (
              <Button
                variant="contained"
                color="secondary"
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                sx={{ ml: 'auto' }}
              >
                Sign in
              </Button>
            ))
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
