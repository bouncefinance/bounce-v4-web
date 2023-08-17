import { Box, Typography } from '@mui/material'
import { ComBtn } from './claimBlock'
import { useEffect, useState, useMemo } from 'react'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
import { DisableBtn } from './bidBlock'
import { useCountDown } from 'ahooks'
import { useErc20EnglishUserClaim } from 'bounceHooks/auction/useErc20EnglishAuctionCallback'
import { ClaimStatus } from './claimBlock'
import BigNumber from 'bignumber.js'
import { useActiveWeb3React } from 'hooks'

enum FixBtnStatus {
  'show' = 0,
  'hiden' = 1
}
const FixedBottomBtn = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isUserJoined = useErc20EnglishUserClaim(poolInfo)
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const [showFixedBtn, setShowFixedBtn] = useState<FixBtnStatus>(FixBtnStatus.show)
  const { status, openAt, closeAt, claimAt } = poolInfo
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate:
      status === PoolStatus.Upcoming
        ? openAt * 1000
        : status === PoolStatus.Live
        ? closeAt * 1000
        : status === PoolStatus.Closed
        ? claimAt * 1000
        : undefined
  })
  const claimStatus = useMemo(() => {
    if (poolInfo.status === PoolStatus.Closed && countdown > 0) {
      return ClaimStatus.NotTimeToClaim
    } else if (
      poolInfo.status === PoolStatus.Closed &&
      BigNumber(poolInfo?.participant?.currencyCurClaimableAmount?.toExact() || '0').isGreaterThan(0)
    ) {
      return ClaimStatus.NeedClaim
    } else {
      return ClaimStatus.Claimed
    }
  }, [countdown, poolInfo?.participant?.currencyCurClaimableAmount, poolInfo.status])
  const scrollTopBtn = () => {
    const claimBtnEl = document.getElementById('claimBtn')
    const bidBtnEl = document.getElementById('bidBtn')
    if (bidBtnEl) {
      bidBtnEl.scrollIntoView({ block: 'end', inline: 'nearest', behavior: 'smooth' })
    }
    if (claimBtnEl) {
      claimBtnEl.scrollIntoView({ block: 'end', inline: 'nearest', behavior: 'smooth' })
    }
  }
  useEffect(() => {
    const winH = window.innerHeight
    const handleBtnDisabled = () => {
      const bidBtnSectionTop = document.getElementById('bidBtn')?.getBoundingClientRect().top || undefined
      const claimSectionTop = document.getElementById('claimBtn')?.getBoundingClientRect().top || undefined
      if (bidBtnSectionTop !== undefined) {
        if (bidBtnSectionTop < winH && bidBtnSectionTop > 0) {
          setShowFixedBtn(FixBtnStatus.hiden)
        } else {
          setShowFixedBtn(FixBtnStatus.show)
        }
      } else if (claimSectionTop !== undefined) {
        if (claimSectionTop < winH && claimSectionTop > 0) {
          setShowFixedBtn(FixBtnStatus.hiden)
        } else {
          setShowFixedBtn(FixBtnStatus.show)
        }
      }
    }
    window.addEventListener('scroll', handleBtnDisabled)
    return () => {
      window.removeEventListener('scroll', handleBtnDisabled)
    }
  }, [])
  if (!account) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          display: showFixedBtn === FixBtnStatus.show ? 'block' : 'none'
        }}
      >
        <ComBtn fullWidth onClick={() => scrollTopBtn()}>
          Connect Wallet
        </ComBtn>
      </Box>
    )
  }
  if (!isCurrentChainEqualChainOfPool) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          display: showFixedBtn === FixBtnStatus.show ? 'block' : 'none'
        }}
      >
        <ComBtn fullWidth onClick={() => scrollTopBtn()}>
          Switch network
        </ComBtn>
      </Box>
    )
  }
  if (poolInfo.status === PoolStatus.Upcoming) {
    return (
      <DisableBtn
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          display: showFixedBtn === FixBtnStatus.show ? 'flex' : 'none',
          flexFlow: 'row nowrap',
          justifyContent: 'center !important',
          alignItems: 'center !important'
        }}
        onClick={scrollTopBtn}
      >
        <Typography
          sx={{
            fontFamily: `'Inter'`,
            color: '#fff',
            fontSize: '16px',
            textAlign: 'center'
          }}
        >
          Bid {countdown > 0 ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s` : 'Upcoming'}
        </Typography>
      </DisableBtn>
    )
  }
  if (poolInfo.status === PoolStatus.Live) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          display: showFixedBtn === FixBtnStatus.show ? 'block' : 'none'
        }}
      >
        <ComBtn fullWidth onClick={() => scrollTopBtn()}>
          Bid
        </ComBtn>
      </Box>
    )
  }
  if (poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled) {
    if (!isUserJoined) return <Box></Box>
    if (claimStatus === ClaimStatus.NeedClaim) {
      return (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 999,
            display: showFixedBtn === FixBtnStatus.show ? 'block' : 'none'
          }}
        >
          <ComBtn fullWidth disabled={poolInfo.participant.claimed} onClick={() => scrollTopBtn()}>
            Claim
          </ComBtn>
        </Box>
      )
    }
  }
  return <Box></Box>
}
export default FixedBottomBtn
