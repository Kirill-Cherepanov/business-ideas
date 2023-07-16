'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const defaultTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#d97706',
        // pink: '',
      },
      secondary: {
        main: '#000',
      },
      custom: {
        orange: '#d97706',
        blue: '#096a90',
        pink: '#f03070',
        contrastText: 'rgba(0, 0, 0, 0.9)',
      },
    },
  })
);
