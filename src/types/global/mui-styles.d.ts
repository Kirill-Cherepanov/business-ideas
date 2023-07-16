import { Palette as MuiPalette, PaletteOptions as MuiPaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette extends MuiPalette {
    custom: { [color: string]: string };
  }

  interface PaletteOptions extends MuiPaletteOptions {
    custom: { [option: string]: string };
  }
}
