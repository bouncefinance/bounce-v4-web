import { Box } from '@mui/material'
import BackIcon from 'assets/imgs/dutchAuction/back.svg'
import { ShareBtn } from 'pages/projectIntro'
import { useNavigate } from 'react-router-dom'
const Header = () => {
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
        alignItems: 'center'
      }}
      mb={30}
    >
      <Box
        onClick={goBack}
        sx={{
          width: '50px',
          cursor: 'pointer'
        }}
      >
        <img src={BackIcon} alt="" />
      </Box>
      <ShareBtn />
    </Box>
  )
}
export default Header
