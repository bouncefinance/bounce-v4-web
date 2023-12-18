import { Typography } from '@mui/material'

export default function Title({ text }: { text: string }) {
  return (
    <Typography
      variant="lotteryh1"
      color={'var(--AI-dark-02, #4C483A)'}
      textTransform={'uppercase'}
      lineHeight={'90%'}
      fontSize={44}
      fontWeight={700}
      paddingBottom={30}
      borderBottom={'1px solid #858780'}
    >
      {text}
    </Typography>
  )
}
