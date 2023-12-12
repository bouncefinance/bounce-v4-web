import { Box, Button, Stack, useTheme } from '@mui/material'
import { ReactComponent as AddSvg } from 'assets/imgs/user/add.svg'

export default function MyCredentialTab() {
  const theme = useTheme()
  return (
    <Box display={'flex'} flexDirection={'column'} gap={30}>
      <Button
        sx={{
          width: 198,
          height: 48,
          borderRadius: 50,
          border: 'none',
          background: '#F6F6F3',
          marginLeft: 'auto',
          color: theme.palette.text.primary,
          '&:hover': {
            color: '#121212'
          }
        }}
        onClick={() => {}}
        startIcon={<AddSvg />}
      >
        Create Credential
      </Button>
      <Stack
        sx={{
          borderRadius: '20px',
          background: '#F6F6F3',
          padding: '48px 56px'
        }}
      ></Stack>
      <Stack
        sx={{
          borderRadius: '20px',
          background: '#F6F6F3',
          padding: '48px 56px'
        }}
      ></Stack>
    </Box>
  )
}
