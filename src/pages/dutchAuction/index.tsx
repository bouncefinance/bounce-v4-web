import { Box, Container, useTheme } from '@mui/material'
const DutchCreatePage = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: `calc(100vh - ${theme.height.header})`,
        minWidth: '1296px'
      }}
    >
      <Container
        sx={{
          width: '100%',
          height: '100%'
        }}
      >
        1
      </Container>
    </Box>
  )
}
export default DutchCreatePage
