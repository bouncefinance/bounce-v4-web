import { SxProps } from '@mui/material'

export default {
  tabsBox: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  menu: {
    borderRadius: '10px',
    cursor: 'pointer',
    color: 'rgba(23, 23, 23, 0.5)',
    padding: '16px 32px 40px',
    '&:hover': {
      background: 'var(--ps-yellow-1)'
    }
  },
  menuActive: {
    background: '#F6F6F3',
    color: 'var(--ps-gray-900)',
    '&:hover': {
      background: '#F6F6F3'
    }
  }
} as Record<string, SxProps>
