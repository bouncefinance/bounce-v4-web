import { Box } from '@mui/material'
import BackIcon from 'assets/imgs/dutchAuction/back.svg'
import { ShareBtn } from 'pages/projectIntro'
const Header = () => {
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
