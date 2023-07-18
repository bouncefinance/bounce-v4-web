import { Box } from '@mui/material'
import LeftBox from '../../creatorBlock/left'
import RightBox from '../right'

const UserBlock = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '30px'
      }}
      gap={'30px'}
    >
      <Box
        sx={{
          flex: 400
        }}
      >
        <LeftBox />
      </Box>
      <Box
        sx={{
          flex: 474
        }}
      >
        <RightBox />
      </Box>
    </Box>
  )
}
export default UserBlock
