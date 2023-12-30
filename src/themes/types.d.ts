import type { IThemeColor } from './options/color'

declare module '@mui/material/styles/createPalette' {
  interface CommonColors extends IThemeColor {
    black: string
    white: string
  }
  interface ThemeOptions {
    gradient: Gradient
    height: Height
    width: Width
  }
  interface Theme {
    gradient: Gradient
    height: Height
    width: Width
  }
}

declare module '@mui/material/styles/createTheme' {
  interface ThemeOptions {
    gradient: Gradient
    height: Height
    width: Width
  }
  interface Theme {
    gradient: Gradient
    height: Height
    width: Width
  }
}
declare module '@mui/material/styles' {
  interface TypographyVariants {
    lotteryh1: React.CSSProperties
    lotteryh2: React.CSSProperties
    lotteryh3: React.CSSProperties
    lotteryh4: React.CSSProperties
    lotteryh5: React.CSSProperties
    lotteryh6: React.CSSProperties
  }
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    lotteryh1: React.CSSProperties
    lotteryh2: React.CSSProperties
    lotteryh3: React.CSSProperties
    lotteryh4: React.CSSProperties
    lotteryh5: React.CSSProperties
    lotteryh6: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    lotteryh1: true
    lotteryh2: true
    lotteryh3: true
    lotteryh4: true
    lotteryh5: true
    lotteryh6: true
  }
}
