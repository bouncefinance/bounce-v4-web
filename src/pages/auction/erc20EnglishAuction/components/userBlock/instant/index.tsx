import { Box } from '@mui/material'
import LeftBox from '../../creatorBlock/left'
import RightBox from '../right'
import { useIsMDDown } from 'themes/useTheme'
const UserBlock = () => {
  const isMd = useIsMDDown()
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: isMd ? 'column nowrap' : 'row nowrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '30px'
      }}
      gap={'30px'}
    >
      <Box
        sx={{
          width: isMd ? '100%' : 'unset',
          flex: isMd ? 'unset' : 400
        }}
      >
        <LeftBox />
      </Box>
      <Box
        sx={{
          width: isMd ? '100%' : 'unset',
          flex: isMd ? 'unset' : 474
        }}
      >
        <RightBox />
      </Box>
    </Box>
  )
}
export default UserBlock
