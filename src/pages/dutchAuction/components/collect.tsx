import { Box, styled, Typography } from '@mui/material'
import { CollectStatus } from './poolInfo'
import { ReactComponent as UpIcon } from 'assets/imgs/dutchAuction/up.svg'
import { ReactComponent as DownIcon } from 'assets/imgs/dutchAuction/down.svg'

const CollectBox = styled(Box)(() => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '.collectItem': {
    width: '66px',
    height: '32px',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 16px',
    marginRight: '8px',
    border: '1px solid #FFFFFF',
    backdropFilter: 'blur(5px)',
    borderRadius: '50px',
    cursor: 'pointer',
    '.img': {
      width: '13px',
      height: '13px',
      marginRight: '6px',
      display: 'inline-block'
    },
    '.num': {
      fontFamily: `'Public Sans'`,
      fontWeight: 600,
      fontSize: '14px',
      letterSpacing: '-0.02em',
      color: '#FFFFFF'
    }
  },
  '.collectItem.collected': {
    border: '1px solid #20994B',
    '.img path': {
      fill: '#20994B'
    },
    '.num': {
      color: '#20994B'
    }
  },
  '.collectItem.collect:hover': {
    border: '1px solid #20994B',
    '.img path': {
      fill: '#20994B'
    },
    '.num': {
      color: '#20994B'
    }
  },
  '.collectItem.discontented': {
    border: '1px solid #FD3333',
    '.img path': {
      fill: '#FD3333'
    },
    '.num': {
      color: '#FD3333'
    }
  },
  '.collectItem.discontent:hover': {
    border: '1px solid #FD3333',
    '.img path': {
      fill: '#FD3333'
    },
    '.num': {
      color: '#FD3333'
    }
  }
}))
const Collect = ({
  setCollectStatus,
  collectStatus
}: {
  setCollectStatus: (type: CollectStatus) => void
  collectStatus: CollectStatus
}) => {
  return (
    <CollectBox>
      <Box
        className={collectStatus === CollectStatus.collect ? 'collectItem collected' : ' collectItem collect'}
        onClick={() => {
          if (collectStatus === CollectStatus.collect) {
            setCollectStatus(CollectStatus.inital)
          } else {
            setCollectStatus(CollectStatus.collect)
          }
        }}
      >
        <UpIcon className="img" />
        <Typography className="num">16</Typography>
      </Box>
      <Box
        className={collectStatus === CollectStatus.discontent ? 'collectItem discontented' : ' collectItem discontent'}
        onClick={() => {
          if (collectStatus === CollectStatus.discontent) {
            setCollectStatus(CollectStatus.inital)
          } else {
            setCollectStatus(CollectStatus.discontent)
          }
        }}
      >
        <DownIcon className="img" />
        <Typography className="num">12</Typography>
      </Box>
    </CollectBox>
  )
}
export default Collect
