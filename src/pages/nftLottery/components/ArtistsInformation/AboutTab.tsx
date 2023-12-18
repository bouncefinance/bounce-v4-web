import { Box, Typography } from '@mui/material'
import useBreakpoint from 'hooks/useBreakpoint'
import Text from './Text'
import Image from 'components/Image'

export default function AboutTab({ value, name, imgSrc }: { value?: string; name?: string; imgSrc?: string }) {
  const isSm = useBreakpoint('sm')

  return (
    <Box marginTop={isSm ? 24 : 48}>
      <Typography
        variant="lotteryh2"
        fontSize={isSm ? 18 : 32}
        fontWeight={700}
        lineHeight={isSm ? '130%' : '90%'}
        textTransform={'uppercase'}
        color={'var(--AI-dark-01, var(--AI-black-02, #3D3A32))'}
      >
        {name}
      </Typography>
      <Text style={{ margin: isSm ? '16px 0' : '16px 0 24px' }}>{value}</Text>
      <Image src={imgSrc ? imgSrc : ''} width={isSm ? 328 : 600} />
    </Box>
  )
}
