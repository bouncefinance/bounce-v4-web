import { Stack, Typography } from '@mui/material'
import { ReactComponent as GoBackIcon } from 'assets/imgs/nftLottery/banner/goback.svg'
import useBreakpoint from 'hooks/useBreakpoint'
import { useNavigate } from 'react-router-dom'
const Goback = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  const isSm = useBreakpoint('sm')
  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        position: 'fixed',
        top: isSm ? 80 : 100,
        left: isSm ? 20 : 80,
        cursor: 'pointer',
        borderRadius: 8,
        background: 'rgba(255, 255, 255, 0.20)',
        backdropFilter: `blur(5px)`,
        padding: '12px 20px'
      }}
      gap={12}
      onClick={handleBack}
    >
      <GoBackIcon />
      <Typography
        sx={{
          fontSize: 16,
          fontFamily: `'Public Sans'`,
          color: '#C3A16D'
        }}
      >
        Launchpad homepage
      </Typography>
    </Stack>
  )
}
export default Goback
