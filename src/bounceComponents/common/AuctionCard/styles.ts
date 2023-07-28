import { SxProps } from '@mui/material'

export default {
  2: {
    '& .pool-id': {
      color: '#20994B'
    },
    '& .progress-left': {
      color: '#20994B'
    },
    '& .progress': {
      color: '#E1F25C'
    }
  },
  4: {
    '& .pool-id': {
      color: '#2B51DA'
    },
    '& .progress-left': {
      color: '#2B51DA'
    },
    '& .progress': {
      color: '#2B51DA'
    }
  },
  card: {
    p: 16,
    borderRadius: 12,
    bgcolor: 'var(--ps-white)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    '.MuiCardHeader-root': {
      p: '20px 0 0 0',
      '.MuiCardHeader-content': {
        width: '100%',
        '> span': {
          fontFamily: `'Public Sans'`,
          fontWeight: 500,
          fontSize: 16,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }
    },
    '&:hover': {
      boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(23, 23, 23, 0.2)'
    }
  },
  statusTag: {
    height: 24,
    borderRadius: 20,
    px: 8,
    py: 4,
    fontSize: 12,
    backgroundColor: 'var(--ps-gray-200)'
  }
} as Record<string, SxProps>
