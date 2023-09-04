import { Box } from '@mui/material'
import { ContainerBox, Title } from '../tokenLocker'
import { H4 } from '../../../../components/Text'
import Search from '../../../../bounceComponents/common/Header/Search'
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
          <Title
            sx={{
              alignSelf: 'center',
              marginBottom: '48px'
            }}
          >
            My Disperse
          </Title>
          <H4>Select token</H4>
          <Search />
        </Box>
      </ContainerBox>
    </Box>
  )
}
