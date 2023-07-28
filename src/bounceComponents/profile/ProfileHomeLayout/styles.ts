import { SxProps } from '@mui/material'

export default {
  contain: {
    position: 'relative',
    width: '100%',
    borderRadius: 20,
    background: 'var(--ps-primary)'
  },
  tabsBox: {
    marginTop: 40,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    paddingLeft: 48,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 48px'
  },
  menu: {
    fontFamily: 'Public Sans',
    fontWeight: 500,
    paddingBottom: 9,
    color: 'rgba(23, 23, 23, 0.5)'
  },
  menuActive: {
    borderBottom: '2px solid #000',
    color: 'var(--ps-gray-900)'
  },
  followerItemStyle: {
    background: '#FFFFFF',
    border: `1px solid rgba(0, 0, 0, 0.1)`,
    borderRadius: `20px`,
    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '538px',
    minHeight: '92px',
    padding: '20px',
    marginBottom: '12px',
    '.name': {
      fontFamily: '"Sharp Grotesk DB Cyr Medium 22"',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '15px',
      color: '#171717',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    '.description': {
      width: '100%',
      fontFamily: "'Sharp Grotesk DB Cyr Book 20'",
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '15px',
      color: '#878A8E',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    '.followerBtn': {
      background: '#FFFFFF',
      border: '1px solid #D7D6D9',
      borderRadius: '22px',
      cursor: 'pointer',
      padding: '8px 16px',
      fontFamily: 'Sharp Grotesk DB Cyr Book 20',
      '.following': {
        display: 'inline-block'
      },
      '.unfollow': {
        display: 'none'
      },
      '&:hover': {
        background: `rgba(245, 48, 48, 0.1)`,
        border: `1px solid rgba(245, 48, 48, 0.3)`,
        color: '#F53030',
        '.unfollow': {
          display: 'inline-block'
        },
        '.following': {
          display: 'none'
        }
      }
    },
    '.unfollowerBtn': {
      background: '#171717',
      border: '1px solid #171717',
      color: '#fff',
      borderRadius: '22px',
      cursor: 'pointer',
      padding: '8px 16px',
      fontFamily: 'Sharp Grotesk DB Cyr Book 20',
      '.following': {
        display: 'none'
      },
      '.unfollow': {
        display: 'inline-block'
      },
      '&:hover': {
        background: `#404040`,
        border: `1px solid #171717`,
        color: '#fff',
        '.unfollow': {
          display: 'none'
        },
        '.following': {
          display: 'inline-block'
        }
      }
    },
    '.followingBtn': {
      background: '#FFFFFF',
      border: '1px solid #D7D6D9',
      borderRadius: '22px',
      cursor: 'pointer',
      padding: '8px 16px',
      fontFamily: 'Sharp Grotesk DB Cyr Book 20',
      '.following': {
        display: 'inline-block'
      },
      '.unfollow': {
        display: 'none'
      },
      '&:hover': {
        background: `rgba(245, 48, 48, 0.1)`,
        border: `1px solid rgba(245, 48, 48, 0.3)`,
        color: '#F53030',
        '.unfollow': {
          display: 'inline-block'
        },
        '.following': {
          display: 'none'
        }
      }
    },
    '.unfollowingBtn': {
      background: '#FFFFFF',
      border: '1px solid #D7D6D9',
      borderRadius: '22px',
      cursor: 'pointer',
      padding: '8px 16px',
      fontFamily: 'Sharp Grotesk DB Cyr Book 20',
      '.following': {
        display: 'none'
      },
      '.unfollow': {
        display: 'inline-block'
      },
      '&:hover': {
        background: `#404040`,
        border: `1px solid #404040`,
        color: '#fff',
        '.unfollow': {
          display: 'none'
        },
        '.following': {
          display: 'inline-block'
        }
      }
    }
  },
  followerBtn: {
    background: '#FFFFFF',
    border: '1px solid #D7D6D9',
    borderRadius: '22px',
    cursor: 'pointer',
    padding: '8px 16px',
    fontFamily: 'Sharp Grotesk DB Cyr Book 20',
    '.following': {
      display: 'inline-block'
    },
    '.unfollow': {
      display: 'none'
    },
    '&:hover': {
      background: `rgba(245, 48, 48, 0.1)`,
      border: `1px solid rgba(245, 48, 48, 0.3)`,
      color: '#F53030',
      '.unfollow': {
        display: 'inline-block'
      },
      '.following': {
        display: 'none'
      }
    }
  },
  unfollowerBtn: {
    background: '#171717',
    border: '1px solid #171717',
    color: '#fff',
    borderRadius: '22px',
    cursor: 'pointer',
    padding: '8px 16px',
    fontFamily: 'Sharp Grotesk DB Cyr Book 20',
    '.following': {
      display: 'none'
    },
    '.unfollow': {
      display: 'inline-block'
    },
    '&:hover': {
      background: `#404040`,
      border: `1px solid #171717`,
      color: '#fff',
      '.unfollow': {
        display: 'none'
      },
      '.following': {
        display: 'inline-block'
      }
    }
  },
  followingBtn: {
    background: '#FFFFFF',
    border: '1px solid #D7D6D9',
    borderRadius: '22px',
    cursor: 'pointer',
    padding: '8px 16px',
    fontFamily: 'Sharp Grotesk DB Cyr Book 20',
    '.following': {
      display: 'inline-block'
    },
    '.unfollow': {
      display: 'none'
    },
    '&:hover': {
      background: `rgba(245, 48, 48, 0.1)`,
      border: `1px solid rgba(245, 48, 48, 0.3)`,
      color: '#F53030',
      '.unfollow': {
        display: 'inline-block'
      },
      '.following': {
        display: 'none'
      }
    }
  },
  unfollowingBtn: {
    background: '#171717',
    border: '1px solid #171717',
    borderRadius: '22px',
    cursor: 'pointer',
    padding: '8px 16px',
    fontFamily: 'Sharp Grotesk DB Cyr Book 20',
    color: '#fff',
    '.following': {
      display: 'none'
    },
    '.unfollow': {
      display: 'inline-block'
    },
    '&:hover': {
      background: `#404040`,
      border: `1px solid #404040`,
      color: '#fff',
      '.unfollow': {
        display: 'none'
      },
      '.following': {
        display: 'inline-block'
      }
    }
  }
} as Record<string, SxProps>
