import { Box, Typography, Stack, styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useIsMDDown } from 'themes/useTheme'
import A1 from 'assets/imgs/thirdPart/nfcDetail/a1.png'
import { useEffect, useState, useMemo, useCallback } from 'react'
import classnames from 'classnames'
require('@lottiefiles/lottie-player')
import { useShowLoginModal } from 'state/users/hooks'
import Icon1 from 'components/Fundo/assets/img/icon1.png'
import Icon2 from 'components/Fundo/assets/img/icon2.png'
import Icon3 from 'components/Fundo/assets/img/icon3.png'
import Icon4 from 'components/Fundo/assets/img/icon4.png'
import Icon5 from 'components/Fundo/assets/img/icon5.png'
import { ReactComponent as DoneStausSvg } from 'components/Fundo/assets/img/done.svg'
import ProductIcon1 from 'components/Fundo/assets/img/productIcon1.png'
import { getCurrentTimeStamp } from 'utils'
import { useMutantEnglishAuctionPool } from 'hooks/useMutantEnglishAuctionPool'
import { useBidderClaimEnglishAuctionNFT } from 'bounceHooks/auction/useCreatorClaimNFT'
import { useParams } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { MutantEnglishAuctionNFTPoolProp } from 'api/pool/type'
import { PageStep } from '../nfcDetail'
enum AnimateStep {
  'default' = 0,
  'lineDown' = 1,
  'imgUp' = 2,
  'black' = 3,
  'blockClose' = 4,
  'done' = 5
}
export const PlaceBidBtn = styled(LoadingButton)({
  display: 'flex',
  width: '100%',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  margin: '48px auto 0',
  alignItems: 'center',
  border: '1px solid #959595',
  backgroundColor: 'transparent',
  borderRadius: '100px',
  height: '56px',
  fontFamily: `'Public Sans'`,
  fontStyle: 'italic',
  fontWeight: 100,
  fontSize: 20,
  color: '#fff',
  '&:hover': {
    borderColor: '#fff',
    backgroundColor: 'transparent'
  },
  '&:disabled': {
    backgroundColor: 'transparent',
    opacity: 0.6
  }
})
const SpanText = styled(Typography)(() => ({
  color: '#D7D6D9',
  textAlign: 'right',
  fontFamily: `'Public Sans'`,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '21px',
  letterSpacing: '-0.28px'
}))
const FooterText = styled(Typography)(() => ({
  color: '#FFF',
  textAlign: 'center',
  leadingTrim: 'both',
  textdge: 'cap',
  fontVariantNumeric: 'lining-nums proportional-nums',
  fontFamily: `'Public Sans'`,
  fontSize: '56px',
  fontWeight: 600,
  lineHeight: '67px',
  textTransform: 'uppercase'
}))
const RowTextSectioin = ({ logo, label, value }: { logo: string; label: string; value: string }) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{
        margin: '0 0 16px 0'
      }}
    >
      <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
        <img src={logo} alt="" style={{ marginRight: '8px', width: 16, height: 16 }} />
        <Typography
          sx={{
            color: '#959595',
            fontFamily: `'Public Sans'`,
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '21px',
            letterSpacing: '-0.28px'
          }}
        >
          {label}
        </Typography>
      </Stack>
      <SpanText>{value}</SpanText>
    </Stack>
  )
}
const AnimationBlock = ({ animateStep }: { animateStep: AnimateStep }) => {
  const isMd = useIsMDDown()
  return (
    <Box
      className={classnames(
        { animation1: animateStep >= AnimateStep.lineDown },
        { animation2: animateStep >= AnimateStep.imgUp },
        { animation3: animateStep >= AnimateStep.black },
        { animation4: animateStep >= AnimateStep.blockClose }
      )}
      sx={{
        position: 'fixed',
        top: isMd ? 0 : 76,
        left: '50%',
        transform: 'translate3D(-50%, 0, 0)',
        width: isMd ? '100%' : '360px',
        height: '100vh',
        zIndex: 999999999,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#121212',
        '.lineBox': {
          flex: 1,
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          '.line': {
            width: '1px',
            height: 0,
            background: 'rgba(255, 255, 255, 0.80)'
          }
        },
        '.imgBox': {
          width: '100%',
          height: 0,
          overflow: 'hidden',
          '.imgEl': {
            display: 'block',
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            transform: 'scale(4)'
          },
          '.borderEl': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '0px solid #121212',
            boxSizing: 'border-box',
            background: 'transparent'
          }
        },
        '&.animation1': {
          '.line': {
            transition: 'height 1.6s',
            height: '100vh'
          }
        },
        '&.animation2': {
          '.line': {
            transition: 'height 1.6s',
            height: '0'
          },
          '.imgBox': {
            transition: 'all 1.6s',
            height: '100vh',
            '.imgEl': {
              transition: 'all 1.6s',
              transform: 'scale(1) translate3D(0, 0, 0)'
            }
          },
          '.borderEl': {
            transition: 'all 1.6s',
            border: '0 solid #121212'
          }
        },
        '&.animation3': {
          '.borderEl': {
            transition: 'all 1.6s',
            borderLeft: isMd ? `${window.innerWidth / 2 - 60}px solid #121212` : `60px solid #121212`,
            borderRight: isMd ? `${window.innerWidth / 2 - 60}px solid #121212` : `60px solid #121212`,
            borderTop: `${window.innerHeight / 2 - 60}px solid #121212`,
            borderBottom: `${window.innerHeight / 2 - 60}px solid #121212`
          },
          '.imgEl': {
            transition: 'all 1.6s',
            transform: 'scale(1) translate3D(0, 50px, 0) !important'
          }
        },
        '&.animation4': {
          '.borderEl': {
            transition: 'all 1s',
            borderLeft: isMd ? `${window.innerWidth / 2}px solid #121212` : `60px solid #121212`,
            borderRight: isMd ? `${window.innerWidth / 2}px solid #121212` : `60px solid #121212`,
            borderTop: `${window.innerHeight / 2}px solid #121212`,
            borderBottom: `${window.innerHeight / 2}px solid #121212`
          },
          '.imgEl': {
            transform: 'scale(1) translate3D(0, 50px, 0) !important'
          }
        }
      }}
    >
      <Box className={'lineBox'}>
        <Box className={'line'}></Box>
      </Box>
      <Box className={'imgBox'}>
        <img className={'imgEl'} src={A1} alt="" srcSet="" />
        <Box className={'borderEl'}></Box>
      </Box>
    </Box>
  )
}
const ClaimDetail = ({
  animateStep,
  poolInfo
}: {
  animateStep: AnimateStep
  poolInfo: MutantEnglishAuctionNFTPoolProp
}) => {
  const [animateClass, setAnimateClass] = useState('')
  const { run: bidderClaim, submitted } = useBidderClaimEnglishAuctionNFT(
    poolInfo?.poolId || '',
    poolInfo?.name || '',
    poolInfo?.contract
  )
  const showLoginModal = useShowLoginModal()
  const toBidderClaim = useCallback(async () => {
    showRequestConfirmDialog({ dark: true })
    try {
      const { transactionReceipt } = await bidderClaim()
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(
          () => {
            hideDialogConfirmation()
            rpt()
          },
          { dark: true }
        )
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully claim ${poolInfo?.token0?.symbol || 'NFT'} for ${poolInfo?.name}`
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toBidderClaim
      })
    }
  }, [bidderClaim, poolInfo?.name, poolInfo?.token0?.symbol])
  const switchNetwork = useSwitchNetwork()
  const isMd = useIsMDDown()
  const { account, chainId } = useActiveWeb3React()
  const isWinner = useMemo(
    () => account && poolInfo?.currentBidder?.toString() === account?.toString(),
    [account, poolInfo?.currentBidder]
  )
  useEffect(() => {
    if (animateStep === AnimateStep.done) {
      setAnimateClass('animation')
    }
    return () => {}
  }, [animateStep])
  const detailInfoList = [
    {
      logo: Icon1,
      label: 'Gemstone',
      value: 'Diamonds'
    },
    {
      logo: Icon3,
      label: 'Diamonds (Carats) ',
      value: '19.21'
    },
    {
      logo: Icon5,
      label: 'Material',
      value: '​White gold'
    },
    {
      logo: Icon2,
      label: 'Made In',
      value: 'Italy'
    },
    {
      logo: Icon4,
      label: 'Dimension',
      value: '40.5 cm'
    }
  ]
  const CliamBtn = () => {
    if (!account) {
      return (
        <PlaceBidBtn
          onClick={() => {
            showLoginModal()
          }}
        >
          Connect Wallet
        </PlaceBidBtn>
      )
    }
    if (chainId !== poolInfo?.ethChainId) {
      return <PlaceBidBtn onClick={() => switchNetwork(poolInfo?.ethChainId)}>Switch Network</PlaceBidBtn>
    }
    if (!isWinner) return <></>
    if (isWinner && poolInfo.participant.claimed)
      return (
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          gap={'24px'}
        >
          <DoneStausSvg />
          <Typography
            sx={{
              color: '#fff',
              leadingTrim: 'both',
              textEdge: 'cap',
              fontVariantNumeric: `'lining-nums proportional-nums'`,
              fontFamily: `'Public Sans'`,
              fontSize: '18px',
              fontStyle: `'italic'`,
              fontWeight: 100,
              lineHeight: '18px',
              textAlign: 'center'
            }}
          >
            You already CLAIMED
          </Typography>
        </Box>
      )
    return (
      <PlaceBidBtn
        onClick={() => toBidderClaim()}
        loadingPosition="start"
        loading={submitted.submitted}
        disabled={Number(poolInfo?.claimAt) > getCurrentTimeStamp()}
      >
        claim
      </PlaceBidBtn>
    )
  }
  return (
    <>
      {/* banner section */}
      <Box
        className={animateClass}
        sx={{
          width: '100%',
          minHeight: isMd ? '100vh' : '700px',
          padding: '88px 16px 63px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          '.down': {
            transform: 'translate3D(0, -70px, 0)'
          },
          '.up': {
            transform: 'translate3D(0, 70px, 0) !important'
          },
          '&.animation': {
            '.up': {
              transition: 'all 1s',
              transform: 'translate3D(0, 0 , 0) !important'
            },
            '.down': {
              transition: 'all 1s',
              transform: 'translate3D(0, 0 , 0)'
            }
          }
        }}
      >
        <Typography
          className={'down'}
          sx={{
            width: '100%',
            color: '#FFF',
            fontFamily: `'Public Sans'`,
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '22px',
            textAlign: 'center',
            marginBottom: '12px'
          }}
        >
          CLAIM
        </Typography>
        <Typography
          className={'down'}
          sx={{
            color: '#FFF',
            leadingTrim: 'both',
            textEdge: 'cap',
            fontVariantNumeric: 'lining-nums proportional-nums',
            fontFamily: `'Public Sans'`,
            fontSize: '160px',
            fontWeight: 500,
            lineHeight: '116px',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
        >
          NFT
        </Typography>
        <lottie-player
          class={'up'}
          autoplay={true}
          src={JSON.stringify('/lottie/animatinDm4.json')}
          loop={true}
          style={{
            position: 'relative',
            width: '60%',
            maxWidth: '200px',
            height: 'auto',
            cursor: 'pointer',
            margin: '40px auto'
          }}
        ></lottie-player>
        <Typography
          className={'up'}
          sx={{
            width: 215,
            color: '#FFF',
            leadingTrim: 'both',
            textEdge: 'cap',
            fontVariantNumeric: 'lining-nums proportional-nums',
            fontFamily: `'Public Sans'`,
            fontSize: '24px',
            fontWeight: 600,
            lineHeight: '33px',
            textAlign: 'center'
          }}
        >
          DIAMOND HAND NECKLACE
        </Typography>
      </Box>
      {/* main img */}
      <img
        style={{
          width: '100%'
        }}
        src={A1}
        alt=""
        srcSet=""
      />
      {/* detail info & cliam btn */}
      <Box
        sx={{
          padding: '64px 16px'
        }}
      >
        <Stack direction={'row'} justifyContent={'space-between'} mb={'24px'}>
          <Typography
            sx={{
              color: '#fff',
              leadingTrim: 'both',
              textEdge: 'cap',
              fontVariantNumeric: 'lining-nums proportional-nums',
              fontFamily: `'Public Sans'`,
              fontSize: 22,
              fontWeight: 600,
              lineHeight: '28px',
              letterSpacing: '-0.44px'
            }}
          >
            Details
          </Typography>
          <SpanText
            sx={{
              fontSize: '12px'
            }}
          >
            Ref: 356934
          </SpanText>
        </Stack>
        {detailInfoList.map((item, index) => (
          <RowTextSectioin key={index} logo={item.logo} label={item.label} value={item.value} />
        ))}
        <CliamBtn />
      </Box>
      {/* footer */}
      <Box
        sx={{
          padding: '64px 0 24px',
          background: '#121212'
        }}
      >
        <FooterText>DIAMOND</FooterText>
        <FooterText>HAND</FooterText>
        <FooterText>NECKLACE</FooterText>
        <img
          style={{
            display: 'block',
            width: 80,
            height: 80,
            margin: '40px auto 64px'
          }}
          src={ProductIcon1}
          alt=""
          srcSet=""
        />
        <Typography
          sx={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.80)',
            fontFamily: `'Inter'`,
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '18px',
            textTransform: 'capitalize'
          }}
        >
          ©2023 Bounce dao Ltd. All rights reserved.
        </Typography>
      </Box>
    </>
  )
}
const NfcDetail = ({ pageStep }: { pageStep: PageStep }) => {
  const isMd = useIsMDDown()
  const [animateStep, setAnimateStep] = useState<AnimateStep>(AnimateStep.default)
  const [onceTime, setOnceTime] = useState<boolean>(false)
  const { data: poolInfo, loading } = useMutantEnglishAuctionPool(18392)
  useEffect(() => {
    if (onceTime) return
    if (loading || pageStep !== PageStep.claimPage) return
    setAnimateStep(AnimateStep.lineDown)
    setTimeout(() => {
      setAnimateStep(AnimateStep.imgUp)
    }, 1600)
    setTimeout(() => {
      setAnimateStep(AnimateStep.black)
    }, 3200)
    setTimeout(() => {
      setAnimateStep(AnimateStep.blockClose)
    }, 5000)
    setTimeout(() => {
      setAnimateStep(AnimateStep.done)
    }, 6000)
    setOnceTime(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, pageStep, onceTime])
  if (!poolInfo) {
    return <></>
  }
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        maxWidth: isMd ? '100vw' : '360px',
        margin: '0 auto',
        background: '#000',
        boxSizing: 'border-box'
      }}
    >
      {animateStep !== AnimateStep.done && <AnimationBlock animateStep={animateStep} />}
      <ClaimDetail animateStep={animateStep} poolInfo={poolInfo} />
    </Box>
  )
}
export default NfcDetail
