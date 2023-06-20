import { SxProps } from '@mui/material'

export default {
  avatar: {
    width: { xs: 72, sm: 120 },
    height: { xs: 72, sm: 120 },
    padding: 0,
    background: '#F6F7F3'
  },
  defaultAva: {
    width: { xs: 72, sm: 120 },
    height: { xs: 72, sm: 120 },
    padding: 0,
    background: '#F6F7F3',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&>svg': {
      height: { xs: 49, sm: 72 }
    }
  }
} as Record<string, SxProps>
