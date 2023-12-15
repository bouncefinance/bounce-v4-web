import { TypographyOptions } from '@mui/material/styles/createTypography'

export const TypographyComponent = {
  fontFamily: [`"Sharp Grotesk DB Cyr Book 20"`, 'sans-serif'].join(','),

  h1: { fontSize: 36, lineHeight: 46 / 36, fontFamily: '"Sharp Grotesk DB Cyr Medium 22"' },
  h2: { fontSize: 22, lineHeight: 28 / 22, fontFamily: '"Sharp Grotesk DB Cyr Medium 22"' },
  h3: { fontSize: 18, lineHeight: 26 / 18, fontFamily: '"Sharp Grotesk DB Cyr Medium 22"' },
  h4: { fontSize: 16, lineHeight: 24 / 16, fontFamily: '"Sharp Grotesk DB Cyr Medium 22"' },
  h5: { fontSize: 14, lineHeight: 22 / 14, fontFamily: '"Sharp Grotesk DB Cyr Medium 22"' },
  h6: { fontSize: 12, lineHeight: 15 / 12, fontFamily: '"Sharp Grotesk DB Cyr Medium 22"' },
  // caption: { fontSize: 12, lineHeight: 32 / 24, fontFamily: '"Sharp Grotesk DB Cyr Medium 22"' },
  body1: { fontSize: 14, lineHeight: 20 / 14, fontFamily: `"Sharp Grotesk DB Cyr Book 20"` },
  body2: { fontSize: 12, lineHeight: 15 / 12, fontFamily: `"Sharp Grotesk DB Cyr Book 20"` },
  lotteryh1: { fontSize: 36, lineHeight: 46 / 36, fontFamily: '"Cormorant SC" !important' },
  lotteryh2: { fontSize: 22, lineHeight: 28 / 22, fontFamily: '"Cormorant SC" !important' },
  lotteryh3: { fontSize: 18, lineHeight: 26 / 18, fontFamily: '"Cormorant SC" !important' },
  lotteryh4: { fontSize: 16, lineHeight: 24 / 16, fontFamily: '"Cormorant SC" !important' },
  lotteryh5: { fontSize: 14, lineHeight: 22 / 14, fontFamily: '"Cormorant SC" !important' },
  lotteryh6: { fontSize: 12, lineHeight: 15 / 12, fontFamily: '"Cormorant SC" !important' }
} as TypographyOptions

export default TypographyComponent
