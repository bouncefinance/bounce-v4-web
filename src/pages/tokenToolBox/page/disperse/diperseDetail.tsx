import { Box } from '@mui/material'
import { ContainerBox } from '../tokenlocker/tokenLocker'
import { H4 } from '../../../../components/Text'
import BackButton from '../../../../bounceComponents/common/BackButton'

export default function MyDisperse() {
  return (
    <Box>
      <ContainerBox>
        <BackButton />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '25px',
            background: '#fff',
            padding: '56px'
          }}
        >
          <H4>Disperse Detail</H4>
        </Box>
      </ContainerBox>
    </Box>
  )
}
