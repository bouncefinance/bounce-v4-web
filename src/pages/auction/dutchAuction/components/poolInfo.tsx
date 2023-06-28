import { Box, Typography, styled } from '@mui/material'
import ChainIcon from 'assets/imgs/dutchAuction/chainIcon.png'
import LogoIcon from 'assets/imgs/dutchAuction/logoIcon.png'
import { ReactComponent as Icon1 } from 'assets/imgs/dutchAuction/icon1.svg'
import { ReactComponent as Icon2 } from 'assets/imgs/dutchAuction/icon2.svg'
import { ReactComponent as Icon3 } from 'assets/imgs/dutchAuction/icon3.svg'
import { ReactComponent as Icon4 } from 'assets/imgs/dutchAuction/icon4.svg'
import { ReactComponent as Icon5 } from 'assets/imgs/dutchAuction/icon5.svg'
import Collect from './collect'
import { ReactNode, useState } from 'react'
const ChainType = styled(Box)(() => ({
  height: '32px',
  lineHeight: '32px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
  background: '#20201E',
  backdropFilter: 'blur(5px)',
  borderRadius: '100px',
  padding: '0 14px',
  '.img': {
    width: '20px',
    height: '20px',
    marginRight: '10px'
  },
  '.text': {
    fontFamily: `'Public Sans'`,
    fontWeight: 600,
    fontSize: '14px',
    textAlign: 'center',
    letterSpacing: '-0.02em',
    color: '#FFFFFF'
  }
}))
export enum CollectStatus {
  'collect' = 1,
  'discontent' = 2,
  'inital' = 3
}
const LinkItem = styled(Box)(() => ({
  width: '40px',
  height: '40px',
  background: '#121212',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '50%',
  '&:hover': {
    background: '#E1F25C',
    'svg path': {
      stroke: '#121212'
    },
    'svg circle': {
      stroke: '#121212'
    }
  }
}))

const SocialLink = () => {
  const links: ReactNode[] = [
    <Icon1 key={0} />,
    <Icon2 key={1} />,
    <Icon3 key={2} />,
    <Icon4 key={3} />,
    <Icon5 key={4} />
  ]
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
      gap={'6px'}
    >
      {links.map((item, index) => {
        return <LinkItem key={index}>{item}</LinkItem>
      })}
    </Box>
  )
}
const PoolInfo = () => {
  const [collectStatus, setCollectStatus] = useState<CollectStatus>(CollectStatus.inital)
  const handleCollectChange = (status: CollectStatus) => {
    setCollectStatus(status)
  }
  return (
    <Box
      sx={{
        width: '280px',
        background: 'rgba(18, 18, 18, 0.6)',
        backdropFilter: 'blur(5px)',
        borderRadius: '20px',
        padding: '20px 24px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        mb={'12px'}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: '14px',
            color: '#E1F25C'
          }}
        >
          #000123
        </Typography>
        <ChainType>
          <img className="img" src={ChainIcon} alt="" srcSet="" />
          <Typography className="text">Ethereum</Typography>
        </ChainType>
      </Box>
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: '20px',
          color: '#fff'
        }}
        mb={'12px'}
      >
        Monica Fixed Price Auction Pool
      </Typography>
      <Collect collectStatus={collectStatus} setCollectStatus={handleCollectChange} />
      <Box
        sx={{
          width: '100%',
          height: '0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          margin: '30px 0'
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
        mb={'24px'}
      >
        <img
          style={{
            width: '48px',
            height: '48px',
            marginRight: '16px'
          }}
          src={LogoIcon}
          alt=""
        />
        <Typography
          sx={{
            flex: 1,
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: '20px',
            color: '#E1F25C',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          Dyson Project
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: `'Inter'`,
          fontWeight: 400,
          fontSize: '14px',
          color: '#626262',
          marginBottom: '28px'
        }}
      >
        AWS provides customers with the broadest and deepest cloud platform cloud platform cloud platform the broadest
        and deepest cloud platform...
      </Typography>
      <SocialLink />
    </Box>
  )
}
export default PoolInfo
