import { Box } from '@mui/material'
import BackIcon from 'assets/imgs/dutchAuction/back.svg'
import { ShareBtn } from 'pages/projectIntro'
import { useNavigate } from 'react-router-dom'
import { useIsMDDown } from 'themes/useTheme'

const Header = () => {
  const isMd = useIsMDDown()
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMd ? '30px 16px 20px' : ''
      }}
      mb={isMd ? 0 : 30}
    >
      <Box
        sx={{
          width: '50px',
          cursor: 'pointer'
        }}
        onClick={goBack}
      >
        <img src={BackIcon} alt="" />
      </Box>
      <ShareBtn />
    </Box>
  )
}
export default Header
