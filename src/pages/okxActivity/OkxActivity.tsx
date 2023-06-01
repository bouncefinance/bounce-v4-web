import { Box, Stack, Typography, keyframes, styled } from '@mui/material'
import BounceOkxIcon from 'assets/images/bounceOkxIcon.png'
import MNftLogo from 'assets/images/nftLogo.png'
import TokenImage from 'bounceComponents/common/TokenImage'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { shortenAddress } from 'utils'
import { useCallback } from 'react'
import BidButtonBlock from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/BidButtonBlock'
import usePoolInfo from 'bounceHooks/auction/usePoolInfo'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import CounterDownBox from './components/CounterDownBox'
import { PoolStatus } from 'api/pool/type'

const PoolCard = styled(Box)({
  borderRadius: '12px',
  backgroundColor: '#20201E',
  padding: '24px 20px',
  marginTop: 32,
  marginBottom: 24,
  '& .poolTitle': {
    fontFamily: 'Public Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
    color: '#fff',
    lineHeight: '140%',
    paddingBottom: 12,
    textAlign: 'left',
    width: '100%',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
  }
})

const myAnimation = keyframes`
  0% {
    transform: translateX(0px,0px); }
  10% {
    transform: translate(-100px, 100px);
  }
  20% {
    transform: translate(150px, -100px);
  }
  30% {
    transform: translate(-100px,100px);
  }
  40% {
    transform: translate(100px, -150px);
  }
  50% {
    transform: translate(-100px, 200px);
  }
  60% {
    transform: translate(-200px, -100px);
  }
  70% {
    transform: translateY(50px, 100px);
  }
  80% {
    transform: translate(100px, -150px);
  }
  90% {
    transform: translate(0px, 200px);
  }
  100% {
    transform: translate(-100px, 100px);
  }
`

export default function OkxActivity() {
  const handlePlaceBid = useCallback(() => {}, [])
  const { data: poolInfo } = usePoolInfo()

  if (!poolInfo) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <BounceAnime />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        position: 'relative',
        padding: 0,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        '& .noise-wrapper': {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          opacity: 1,
          overflow: 'hidden',
          zIndex: -1,
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            // background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%,rgba(0,0,0,0.75) 100%)'
            background: '#121212'
          },
          '& .noise': {
            position: 'absolute',
            zIndex: 1,
            top: '-500px',
            right: '-500px',
            bottom: '-500px',
            left: '-500px',
            background: 'transparent url(https://www.dropbox.com/s/h7ab1c82ctzy83n/noise.png?raw=1) 0 0',
            backgroundSize: '230px 230px',
            opacity: 0.35,
            animation: `${myAnimation} 1s steps(8,end) infinite both`
          }
        },
        '& .content': {
          width: '100%',
          padding: '32px 16px'
        }
      }}
    >
      <Box className="noise-wrapper">
        <Box className="noise"></Box>
      </Box>
      <Box className="content">
        <img width={193} src={BounceOkxIcon} alt="bounce" />
        <Typography
          mt={40}
          color={'#fff'}
          fontSize={20}
          fontWeight={600}
          lineHeight={'26px'}
          fontFamily={'Public Sans'}
        >
          ZKsync Era Profile Mint
        </Typography>
        <Typography
          mt={7}
          color={'#959595'}
          fontSize={13}
          fontWeight={600}
          lineHeight={'19.5px'}
          fontFamily={'Public Sans'}
        >
          Limited offer during activity
        </Typography>
        <img width={182.5} style={{ marginTop: 40 }} src={MNftLogo} alt="bounce" />
        <CounterDownBox
          style={{ marginTop: 16 }}
          status={PoolStatus.Live}
          openTime={1685589495}
          closeTime={1685589495 + 7 * 86400}
          claimAt={1685589495 + 7 * 86400}
        />
        <PoolCard>
          <Box className="poolTitle">Join The Pool</Box>
          <PoolInfoItem
            sx={{ marginTop: 12 }}
            title="Successful Sold Amount"
            tip="The amount of token you successfully secured."
          >
            <Stack direction="row" spacing={6}>
              <Typography color={'#E1F25C'}>0</Typography>
              <Typography color={'#959595'}>NFT</Typography>
            </Stack>
          </PoolInfoItem>
          <PoolInfoItem
            sx={{ marginTop: 12 }}
            title="Successful Fund Raised"
            tip="The amount of token you successfully secured."
          >
            <Stack direction="row" spacing={6}>
              <Typography color={'#E1F25C'}>0</Typography>
              <TokenImage alt="" src={''} size={20} />
              <Typography color={'#959595'}>ETH</Typography>
            </Stack>
          </PoolInfoItem>
          <PoolInfoItem
            sx={{ marginTop: 12 }}
            title="Fund Receiving Wallet"
            tip="The amount of token you successfully secured."
          >
            <Stack direction="row" spacing={6}>
              <Typography color={'#E1F25C'}>{shortenAddress('0x8127c9680F8fd394330f1A14eA508aA89333E72D')}</Typography>
              <CopyToClipboard text={''} />
            </Stack>
          </PoolInfoItem>
          <PoolInfoItem
            sx={{ marginTop: 12 }}
            title="Platform Fee Charged"
            tip="The amount of token you successfully secured."
          >
            <Stack direction="row" spacing={6}>
              <Typography>
                <span style={{ color: '#E1F25C' }}>0</span>
                <span style={{ color: '#959595' }}> / 0</span>
              </Typography>
              <Typography color={'#959595'}> ETH</Typography>
            </Stack>
          </PoolInfoItem>
        </PoolCard>
        <BidButtonBlock
          action={'FIRST_BID'}
          bidAmount={'0.001'}
          handlePlaceBid={handlePlaceBid}
          isBidding={false}
          handleGoToCheck={() => {}}
          handleCancelButtonClick={() => {}}
          poolInfo={poolInfo}
        />
      </Box>
    </Box>
  )
}
