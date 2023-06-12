import { Box, Typography, styled } from '@mui/material'
import AuctionCardImg from 'assets/imgs/realWorld/auctionCard.png'
import CursorIcon from 'assets/imgs/realWorld/cursor.png'
import DefaultHeadIgm from 'assets/imgs/realWorld/defaultHeadIgm.png'
import DescriptIcon from 'assets/imgs/realWorld/descript.png'

const AuctionItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '309px',
  height: '370',
  borderRadius: '24px',
  overflow: 'hidden',
  cursor: `url(${CursorIcon}), pointer`,
  '.bgImg': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  '.cardInfo': {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    padding: '24px',
    boxSizing: 'border-box',
    opacity: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    background: `rgba(18, 18, 18, 0.4)`,
    backdropFilter: `blur(5px)`,
    '.head': {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: '47px',
      background: `rgba(255, 255, 255, 0.2)`,
      backdropFilter: `blur(5px)`,
      borderRadius: '10px',
      padding: '0 8px',
      marginBottom: '12px',
      '.headImg': {
        display: 'block',
        width: '32px',
        minWidth: '32px',
        height: '32px',
        borderRadius: '50%',
        overflow: 'hidden',
        marginRight: '8px'
      },
      '.headText': {
        flex: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
        '.name': {
          fontFamily: `'Inter'`,
          fontWeight: 400,
          fontSize: '13px',
          color: '#fff',
          width: '100%',
          height: '18px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        },
        '.title': {
          fontFamily: `'Inter'`,
          fontWeight: 400,
          fontSize: '12px',
          color: 'var(--ps-text-5)',
          width: '100%',
          height: '17px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }
      }
    },
    '.status': {
      height: '25px',
      lineHeight: '25px',
      background: 'var(--ps-text-5)',
      backdropFilter: `blur(2px)`,
      borderRadius: `100px`,
      padding: '0 12px',
      fontFamily: `'Inter'`,
      fontSize: 12,
      color: 'var(--ps-text-1)'
    },
    '.time': {
      height: '25px',
      lineHeight: '25px',
      background: 'var(--ps-text-3)',
      backdropFilter: `blur(2px)`,
      borderRadius: `100px`,
      padding: '0 12px',
      fontFamily: `'Inter'`,
      fontSize: 12,
      color: '#fff'
    },
    '.price': {
      fontFamily: `'Inter'`,
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--ps-yellow-1)',
      marginRight: '12px'
    },
    '.value': {
      fontFamily: `'Inter'`,
      fontSize: 16,
      fontWeight: 400,
      color: 'var(--ps-text-5)'
    }
  },
  '&:hover .cardInfo': {
    opacity: 1
  },
  [theme.breakpoints.down('sm')]: {
    '.cardInfo': {
      opacity: 1
    },
    '.name, .title': {
      fontSize: '12px !important'
    },
    '.status, .time': {
      height: '21px !important',
      lineHeight: '25px !important'
    },
    '.price': {
      fontSize: '16px !important'
    },
    '.value': {
      fontSize: '14px !important'
    }
  }
}))
const upcomingCard = ({ isSm }: { isSm?: boolean }) => {
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '14px',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '12px'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '14px',
            height: '14px',
            background: '#B5E529',
            borderRadius: '50%',
            overflow: 'hidden'
          }}
        ></Box>
        <Box
          sx={{
            width: '100%',
            background: 'rgba(18, 18, 18, 0.06)',
            height: '4px',
            borderRadius: '4px'
          }}
        ></Box>
      </Box>
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 500,
          fontSize: isSm ? '14px' : '16px',
          marginBottom: '12px',
          color: 'var(--ps-text-4)',
          width: '100%',
          maxWidth: '310px'
        }}
      >
        {/* 2023.06.25 00:00 */}
      </Typography>
      <Typography
        sx={{
          fontFamily: `'Inter'`,
          fontWeight: 400,
          fontSize: isSm ? '13px' : '14px',
          marginBottom: '12px',
          color: 'rgba(18, 18, 18, 0.6)',
          width: '100%',
          maxWidth: '310px'
        }}
      >
        ROLEX SUBMARINER DATE WHITE GOLD 2021 41MM 126619LB - FULL BOXES & PAPERS
      </Typography>
      <AuctionItem>
        <img className="bgImg" src={AuctionCardImg} alt="" srcSet="" />
        <Box className={'cardInfo'}>
          <Box>
            <Box className={'head'}>
              <img className="headImg" src={DefaultHeadIgm} alt="" srcSet="" />
              <Box className={'headText'}>
                <Typography className="name">FOUNDO</Typography>
                <Typography className="title">Individual Investor, Defi Player</Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontWeight: 400,
                fontSize: isSm ? '12px' : '13px',
                marginBottom: '4px',
                color: '#fff',
                width: '100%'
              }}
            >
              {`Welcome To The First Series Of 'Daves', Officially The Worlds Most Exciting Collectible.`}
            </Typography>
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontWeight: 400,
                fontSize: '12px',
                marginBottom: '12px',
                color: 'var(--ps-text-5)'
              }}
            >
              {`NFT issued by 4K Alpha Vault`}
            </Typography>
            <img
              src={DescriptIcon}
              style={{
                height: isSm ? '21px' : '23px'
              }}
              alt=""
            />
          </Box>
          <Box className="otherInfo">
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
              mb={'12px'}
            >
              <Box className="status">Coming soon</Box>
              {/* <Box className="time">Start in 2h 30m</Box> */}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              {/* <Box className="price">10.00 BNB</Box> */}
              {/* <Box className="value">$1909.98</Box> */}
            </Box>
          </Box>
        </Box>
      </AuctionItem>
    </Box>
  )
}
export default upcomingCard
