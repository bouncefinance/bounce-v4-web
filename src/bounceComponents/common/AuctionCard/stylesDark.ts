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
      color: '#E1F25C'
    },
    '& .progress-left': {
      color: '#20994B'
    },
    '& .progress': {
      color: '#E1F25C'
    }
  },
  card: {
    pb: 16,
    borderRadius: 12,
    bgcolor: '#ffffff05',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    '.MuiCardHeader-root': {
      p: '20px 0 0 0',
      '.MuiCardHeader-content': {
        width: '100%',
        color: '#E1F25C',
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
    '.MuiChip-root': {
      background: 'transparent',
      color: '#ffffff',
      ml: 3,
      '& img': {
        margin: 2
      },
      '.MuiChip-label': {
        padding: 0
      },
      '&:after': {
        content: "'.'",
        color: '#ffffff',
        ml: 4
      },
      '&:last-of-type:after': {
        content: "''"
      }
    },
    '&>.MuiBox-root': {
      px: 16
    },
    '.progress-text': {
      color: '#ffffff'
    },
    '.top': {
      py: 16,
      background: '#ffffff05'
    },
    '.holder': {
      background: '#ffffff05',
      '& h6': {
        color: '#ffffff'
      },
      '& p': {
        color: ' var(--grey-03, #959595)'
      }
    },
    '.list li .MuiTypography-root:last-of-type': {
      color: '#ffffff',
      '& .MuiButtonBase-root svg': {
        fill: '#ffffff'
      }
    },
    '.MuiLinearProgress-root:before': {
      background: '#ffffff20'
    },
    '&:hover': {
      boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ffffff50'
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
