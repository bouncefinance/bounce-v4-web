import { Box, Container, styled, Tab, Tabs, Typography } from '@mui/material'
import { CenterRow, Row } from '../../components/Layout'
import { ReactComponent as LeftArrow } from 'assets/svg/chevron-left.svg'
import GhostieRunner from 'components/GhostieRunner'
import { useCallback, useMemo, useState } from 'react'
import { useActiveWeb3React } from 'hooks'
import { useShowLoginModal, useUserInfo } from 'state/users/hooks'
import InterNetIcon from 'assets/imgs/game/internet.png'
import TwitterIcon from 'assets/imgs/game/twitter.png'
import NormalIcon from 'assets/imgs/game/normal.png'
import ErrorIcon from 'assets/imgs/game/error.png'
import WarningIcon from 'assets/imgs/game/warning.png'
import { getAllrank, getUserRank } from 'api/game/index'
import { useCountDown, useRequest } from 'ahooks'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import EmptyData from 'bounceComponents/common/EmptyData'
import Image from 'components/Image'
import moment from 'moment'
import UserIcon from 'assets/imgs/profile/yellow_avatar.svg'
import { shortenAddress } from 'utils'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import usePoolInfo from 'bounceHooks/auction/usePoolInfo'
import UserMainBlock from 'bounceComponents/fixed-swap/MainBlock/UserMainBlock'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { useQueryParams } from 'hooks/useQueryParams'
import ActionHistory from 'bounceComponents/fixed-swap/ActionHistory'
import { useBladeDaoSharer } from 'hooks/useBladeDaoShare'
import Favorite from 'bounceComponents/common/Favorite'
import { PoolInfoProp } from 'bounceComponents/fixed-swap/type'
import ReactMarkdown, { ReactNode } from 'react-markdown'
import EquilibriaAvatar from '../launchpad/avatar/equilibria-logo.png'
import useUploadGameScoreCrypto from 'hooks/useUploadGameScoreCrypto'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const NoData = () => {
  return (
    <Box
      sx={{
        padding: '100px 0 100px'
      }}
    >
      <EmptyData title={`No History Data`} />
    </Box>
  )
}

const payableId = 2

const gameTimeStamp = {
  start: 1684494000000,
  end: 1684821600000
}

export function Equilibria() {
  const { account } = useActiveWeb3React()
  const { poolId } = useQueryParams()
  const uploadGameScoreCrypto = useUploadGameScoreCrypto()
  const [step] = useState(poolId ? 1 : 0)
  const [score, setScore] = useState(0)
  const { data: poolInfo, run: getPoolInfo } = usePoolInfo()
  const isLive = new Date().valueOf() > gameTimeStamp.start && new Date().valueOf() < gameTimeStamp.end

  const uploadGameScore = useCallback(
    async (score: number) => {
      if (!isLive) return
      const resultScore = score.toFixed(2)
      await uploadGameScoreCrypto(score, payableId)

      setScore(Number(resultScore))
    },
    [isLive, uploadGameScoreCrypto]
  )
  useBladeDaoSharer()
  // useEffect(() => {
  //   return () => {
  //     if (!loading) {
  //       setStep(poolInfo ? 1 : 0)
  //     }
  //   }
  // }, [poolInfo, loading])
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const [countdown, { days, hours, minutes }] = useCountDown({
    targetDate: moment(gameTimeStamp.end).valueOf()
  })
  return (
    <Container maxWidth="lg">
      <Title step={step} poolInfo={poolInfo} />
      <Step step={step} />
      <Box
        sx={{
          borderRadius: 20,
          background: '#fff',
          width: 1200,
          margin: '24px auto 24px'
        }}
      >
        <Box
          sx={{
            height: 83,
            width: '100%',
            padding: '0 40px',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {/* title */}
          <Box
            sx={{
              height: 83,
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                fontWeight: 500,
                fontSize: 20,
                marginRight: 10
              }}
            >
              Ghostie Runner Game
            </Typography>
            <Typography
              sx={{
                height: 26,
                lineHeight: '26px',
                marginRight: 10,
                padding: '0 12px',
                background: 'rgba(222, 81, 245, 0.2)',
                borderRadius: '20px',
                color: '#DE51F5',
                fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                fontWeight: 400,
                fontSize: 14
              }}
            >
              Game Live {countdown > 0 ? `${days}d : ${hours}h : ${minutes}m` : '0'}
            </Typography>
            {poolInfo && (
              <PoolStatusBox
                status={poolInfo.status}
                claimAt={poolInfo.claimAt}
                openTime={poolInfo.openAt}
                closeTime={poolInfo.closeAt}
                onEnd={getPoolInfo}
              />
            )}
          </Box>
          {/* socia link */}
          <Box
            sx={{
              height: 83,
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
            gap={9}
          >
            <img
              style={{
                width: 36,
                cursor: 'pointer'
              }}
              src={InterNetIcon}
              alt=""
              onClick={() => {
                window.open('https://equilibria.fi', '_blank')
              }}
            />
            <img
              style={{
                width: 36,
                cursor: 'pointer'
              }}
              src={TwitterIcon}
              alt=""
              onClick={() => {
                window.open('https://twitter.com/Equilibriafi', '_blank')
              }}
            />
            {/* <img
              style={{
                width: 36,
                cursor: 'pointer'
              }}
              src={IgIcon}
              alt=""
            /> */}
          </Box>
        </Box>
        {step === 0 && (
          <>
            <StatusTitle status={!account ? StatusType.NeedLogin : StatusType.Rules} />
            <GhostieRunner scoreUpload={uploadGameScore} />
          </>
        )}
        {step === 1 && (
          <>
            <UserBlock />
          </>
        )}
      </Box>
      <Box
        sx={{
          width: 1200,
          margin: '0 auto',
          background: '#FFFFFF',
          borderRadius: 20,
          padding: '30px 20px 100px'
        }}
      >
        <NewTabs value={value} onChange={handleChange}>
          <Tab label="Auction Details" {...a11yProps(1)} />
          <Tab label="Leaderboard" {...a11yProps(0)} />
          <Tab label="Auction History" {...a11yProps(2)} />
        </NewTabs>
        {value === 0 && <PoolDetail />}
        {value === 1 && <RankSection score={score} />}
        {value === 2 && (
          <ActionHistory noTitle={true}>
            <NoData />
          </ActionHistory>
        )}
      </Box>
    </Container>
  )
}

// const ThumbBg = styled(Box)`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 6px 16px;
//   gap: 6px;
//   width: auto;
//   height: 32px;
//   background: #ffffff;
//   border-radius: 50px;
// `
const StepBg = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 18px 140px 18px 30px;
  gap: 67px;
  width: 560px;
  height: 56px;
  background: #171717;
  border-radius: 10px;
`
const StepText = styled(Typography)`
  font-family: 'Sharp Grotesk DB Cyr Medium 22';
  font-style: normal;
  font-weight: 500;
  font-size: 78px;
  display: flex;
  align-items: center;
  color: #ffffff;
  opacity: 0.4;
`
const StepText2 = styled(StepText)`
  color: #898989;
  opacity: 0.1;
`
const StepBgLine = styled(StepBg)`
  background: #ffffff;
  border: 1px solid #171717;
`
const ParticipateBtn = styled(Box)(() => ({
  height: 40,
  lineHeight: '40px',
  padding: '0 20px',
  background: '#171717',
  borderRadius: 36,
  color: '#fff',
  fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
  fontWeight: 400,
  fontSize: 14,
  cursor: 'pointer'
}))

const NewTabs = styled(Tabs)(() => ({
  '.MuiTab-root': {
    fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
    color: '#171717 !important',
    opacity: 0.5
  },
  '.Mui-selected': {
    fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
    color: '#171717 !important',
    opacity: 1
  }
}))

function Title({ step, poolInfo }: { step: number; poolInfo?: PoolInfoProp }) {
  const { userId } = useUserInfo()
  const navigate = useNavigate()

  return (
    <Row mt={67} width={'100%'} justifyContent={'space-between'}>
      <CenterRow>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 23,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            cursor: 'pointer'
          }}
          onClick={() => {
            navigate(-1)
          }}
        >
          <LeftArrow />
        </Box>
        <Typography ml={20} variant={'h3'}>
          Equilibria Playable Auction Pool
        </Typography>
      </CenterRow>
      <CenterRow>
        {step === 1 && (
          <>
            {/* <ThumbBg ml={35}>
              <ThumbsUp />
              <Typography variant={'body1'}>16</Typography>
            </ThumbBg>
            <ThumbBg ml={6} mr={6}>
              <ThumbsDown />
              <Typography variant={'body1'}>16</Typography>
            </ThumbBg> */}
            {!!userId && poolInfo && (
              <Favorite collectionId={Number(poolInfo.id)} defaultCollected={poolInfo.ifCollect} />
            )}
          </>
        )}
        {/*<ShareBtn*/}
        {/*  style={{*/}
        {/*    border: '1px solid var(--ps-gray-900)',*/}
        {/*    color: 'var(--ps-gray-900)',*/}
        {/*    marginLeft: 6*/}
        {/*  }}*/}
        {/*  isDefaultBlackIcon={true}*/}
        {/*></ShareBtn>*/}
      </CenterRow>
      {/* <CenterRow>
        <Typography variant={'h3'}>#000123</Typography>
        <ThumbBg ml={12}>
          <TokenImage src={ChainListMap?.[0 as ChainId]?.logo} size={12} />
          <Typography variant={'h4'}>Ethereum</Typography>
        </ThumbBg>
      </CenterRow> */}
    </Row>
  )
}

function Step({ step, hanldeChange }: { step: number; hanldeChange?: (num: number) => void }) {
  const { poolId, chainShortName } = useQueryParams()
  const stepChange = (num: number) => {
    if (poolId && chainShortName) {
      hanldeChange && hanldeChange(num)
    }
  }
  return (
    <Row alignItems={'center'} mt={47}>
      {step === 0 && (
        <StepBg onClick={() => stepChange(0)}>
          <StepText>1</StepText>
          <Typography sx={{ color: 'white' }} variant={'h4'}>
            Stage One: Game Competition
          </Typography>
        </StepBg>
      )}
      {step === 1 && (
        <StepBgLine onClick={() => stepChange(0)}>
          <StepText2>1</StepText2>
          <Typography variant={'h4'} sx={{ color: 'var(--ps-gray-900)', width: 'max-content' }}>
            Stage One: Game Competition
          </Typography>
        </StepBgLine>
      )}
      <Box
        sx={{
          border: '2px dashed #171717',
          width: 89
        }}
      />
      {step === 0 && (
        <StepBgLine onClick={() => stepChange(1)}>
          <StepText2>2</StepText2>
          <Typography variant={'h4'} sx={{ color: 'var(--ps-gray-900)' }}>
            Stage Two: Token Auction
          </Typography>
        </StepBgLine>
      )}
      {step === 1 && (
        <StepBg onClick={() => stepChange(0)}>
          <StepText>2</StepText>
          <Typography sx={{ color: 'white' }} variant={'h4'}>
            Stage Two: Token Auction
          </Typography>
        </StepBg>
      )}
    </Row>
  )
}

export enum StatusType {
  'Rules' = 0,
  'NotWhitelist' = 1,
  'Warning' = 2,
  'NeedLogin' = 3
}

function RankTopItem({
  name,
  score,
  userIcon,
  isNo1,
  rank,
  userId
}: {
  userId?: string
  name: string
  score: string
  userIcon: string
  isNo1: boolean
  rank: number
}) {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        height: 250,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: isNo1 ? 120 : 80,
          height: isNo1 ? 120 : 80,
          marginBottom: 10
        }}
      >
        <Image
          style={{
            borderRadius: '50%',
            cursor: 'pointer'
          }}
          src={userIcon}
          width={isNo1 ? 120 : 80}
          height={isNo1 ? 120 : 80}
          onClick={() => {
            userId && navigate(`${routes.profile.summary}?id=${userId}`)
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            background: '#171717',
            borderRadius: '50%',
            width: 40,
            height: 40,
            lineHeight: '40px',
            fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
            fontWeight: 400,
            fontSize: 20,
            textAlign: 'center',
            margin: '0 -10px -10px 0',
            color: '#fff'
          }}
        >
          {rank}
        </Box>
      </Box>
      <Typography
        sx={{
          fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
          fontSize: isNo1 ? 16 : 14,
          fontWeight: 400,
          color: 'var(--ps-blue)',
          textAlign: 'center'
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
          fontSize: isNo1 ? 16 : 14,
          fontWeight: 500,
          color: '#000',
          textAlign: 'center'
        }}
      >
        {score}
      </Typography>
      {/* <Typography
        sx={{
          fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
          fontSize: isNo1 ? 16 : 14,
          fontWeight: 500,
          color: '#000',
          textAlign: 'center'
        }}
      >
        {winNum}
      </Typography> */}
    </Box>
  )
}

function StatusTitle({ status = StatusType.NotWhitelist }: { status: StatusType }) {
  const showLoginModal = useShowLoginModal()

  return (
    <>
      {status === StatusType.Rules && (
        <Box
          sx={{
            width: 1160,
            margin: '0 auto',
            height: 58,
            background: `#F5F5F5`,
            borderRadius: 20,
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0 20px'
          }}
        >
          <img
            src={NormalIcon}
            style={{
              width: 20,
              marginRight: 8
            }}
            alt=""
            srcSet=""
          />
          <Typography
            sx={{
              fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
              fontWeight: 400,
              fontSize: 14,
              color: 'var(--ps-gray-900)'
            }}
          >
            <span
              style={{
                fontWeight: 500
              }}
            >
              Rules:
            </span>
            Play the game and try to get higher scores. The top 50 Ranked Players will receive a Whitelist to join stage
            2.
          </Typography>
        </Box>
      )}
      {status === StatusType.NotWhitelist && (
        <Box
          sx={{
            width: 1160,
            margin: '0 auto',
            height: 58,
            background: `#FFF4F5`,
            borderRadius: 20,
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0 20px'
          }}
        >
          <img
            src={ErrorIcon}
            style={{
              width: 20,
              marginRight: 8
            }}
            alt=""
            srcSet=""
          />
          <Typography
            sx={{
              fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
              fontWeight: 500,
              fontSize: 14,
              color: '#908E96'
            }}
          >
            <span
              style={{
                color: '#FF0000'
              }}
            >
              You are not eligible.
            </span>{' '}
            You are not whitelisted for this auction.
          </Typography>
        </Box>
      )}
      {status === StatusType.Warning && (
        <Box
          sx={{
            width: 1160,
            margin: '0 auto',
            height: 58,
            background: `#FFF8E8`,
            borderRadius: 20,
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0 20px'
          }}
        >
          <img
            src={WarningIcon}
            style={{
              width: 20,
              marginRight: 8
            }}
            alt=""
            srcSet=""
          />
          <Typography
            sx={{
              fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
              fontWeight: 500,
              fontSize: 14,
              color: '#908E96'
            }}
          >
            <span
              style={{
                color: 'var(--ps-gray-900)'
              }}
            >
              Please pay attention.
            </span>{' '}
            Check the auction creator, token contract and price. Bounce auction is a decentralized tool where anyone can
            launch.
          </Typography>
        </Box>
      )}
      {status === StatusType.NeedLogin && (
        <Box
          sx={{
            width: 1160,
            margin: '0 auto',
            height: 58,
            background: `#FFF8E8`,
            borderRadius: 20,
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <img
              src={WarningIcon}
              style={{
                width: 20,
                marginRight: 8
              }}
              alt=""
              srcSet=""
            />
            <Typography
              sx={{
                fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                fontWeight: 500,
                fontSize: 14,
                color: '#908E96'
              }}
            >
              <span
                style={{
                  color: 'var(--ps-gray-900)'
                }}
              >
                Please connect your wallet
              </span>{' '}
              to participate in the leaderboard
            </Typography>
          </Box>
          <ParticipateBtn onClick={showLoginModal}>Connect Wallet</ParticipateBtn>
        </Box>
      )}
    </>
  )
}

const RankList = styled(Box)(() => ({
  position: 'relative',
  '.row': {
    width: '100%',
    height: 68,
    borderRadius: 20,
    cursor: 'pointer',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 30
  },
  '.row:nth-child(odd)': {
    background: '#F5F5F5'
  }
}))

function RankSection({ score }: { score: number | string }) {
  const { account } = useActiveWeb3React()
  const { data: rankData, loading: rankLoading } = useRequest(
    async () => {
      const resp = await getAllrank({
        payableId
      })
      return {
        list: resp.data?.list || [],
        total: resp.data?.total || 0
      }
    },
    {
      refreshDeps: [score]
    }
  )
  const { data: userRankData } = useRequest(
    async () => {
      return await getUserRank({
        payableId
      })
    },
    {
      refreshDeps: [score]
    }
  )
  const loginUserData = useMemo(() => {
    const list = rankData?.list || []
    let resultData
    resultData = userRankData?.data
    if (!resultData && list.length > 0) {
      list.map((item, index) => {
        if (item.address === account) {
          resultData = {
            address: item.address,
            rank: index + 1,
            score: item?.totalCreated
          }
        }
      })
    }
    return resultData
  }, [account, rankData?.list, userRankData])
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        padding: '30px 0 0'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          padding: '0 40px',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 68,
          borderRadius: 20,
          background: '#D6DFF6'
        }}
      >
        <Box
          sx={{
            width: 17,
            height: 17,
            background: '#D9D9D9',
            marginRight: 16
          }}
        ></Box>
        <Typography
          sx={{
            fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
            fontWeight: 500,
            fontSize: 20
          }}
        >
          My rank: {loginUserData?.rank}
        </Typography>
        <Typography
          component={'span'}
          sx={{
            position: 'absolute',
            right: '40px',
            top: 0,
            height: 64,
            lineHeight: '64px',
            fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
            fontWeight: 500,
            fontSize: 20
          }}
        >
          {loginUserData?.score || '--'} SCORE
        </Typography>
      </Box>
      {rankLoading ? (
        <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BounceAnime />
        </Box>
      ) : rankData && rankData.total === 0 ? (
        <>
          <EmptyData title={`No Rank Data`} />
        </>
      ) : (
        <>
          {rankData && rankData.list && rankData.list.length >= 1 && (
            <Box
              sx={{
                position: 'relative',
                height: 250,
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30
              }}
              gap={80}
            >
              {rankData && rankData.list && rankData.list.length >= 2 ? (
                <RankTopItem
                  userId={rankData.list[1]?.userId || ''}
                  name={rankData.list[1]?.name || shortenAddress(rankData.list[1]?.address) || '--'}
                  score={`${rankData.list[1]?.score}SCORE`}
                  userIcon={rankData.list[1]?.avatar || UserIcon}
                  isNo1={false}
                  rank={2}
                />
              ) : (
                <Box
                  sx={{
                    width: 180
                  }}
                ></Box>
              )}
              {rankData && rankData.list && rankData.list.length >= 1 && (
                <RankTopItem
                  userId={rankData.list[0]?.userId || ''}
                  name={rankData.list[0]?.name || shortenAddress(rankData.list[0]?.address) || '--'}
                  score={`${rankData.list[0]?.score}SCORE`}
                  userIcon={rankData.list[0]?.avatar || UserIcon}
                  isNo1={true}
                  rank={1}
                />
              )}
              {rankData && rankData.list && rankData.list.length >= 3 ? (
                <RankTopItem
                  userId={rankData.list[2]?.userId || ''}
                  name={rankData.list[2]?.name || shortenAddress(rankData.list[2]?.address) || '--'}
                  score={`${rankData.list[2]?.score}SCORE`}
                  userIcon={rankData.list[2]?.avatar || UserIcon}
                  isNo1={false}
                  rank={3}
                />
              ) : (
                <Box
                  sx={{
                    width: 180
                  }}
                ></Box>
              )}
              <Typography
                sx={{
                  position: 'absolute',
                  top: 30,
                  left: 73,
                  fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                  fontWeight: 500,
                  fontSize: 20
                }}
              >
                Top Ranks
              </Typography>
            </Box>
          )}
          {rankData && rankData.list && rankData.list.length >= 4 && (
            <RankList>
              {rankData.list.slice(3).map((item, index) => {
                return (
                  <Box className={'row'} key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                      }}
                    >
                      <Typography
                        sx={{
                          width: 105,
                          height: 68,
                          lineHeight: '68px',
                          textAlign: 'center',
                          fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                          fontWeight: 400,
                          fontSize: 14,
                          marginRight: 5,
                          color: '#171717'
                        }}
                      >
                        {index + 4}
                      </Typography>
                      <Image
                        style={{
                          borderRadius: '50%',
                          marginRight: 15,
                          cursor: 'pointer'
                        }}
                        src={item?.avatar || UserIcon}
                        width={52}
                        height={52}
                        onClick={() => {
                          item.userId && navigate(`${routes.profile.summary}?id=${item.userId}`)
                        }}
                      />
                      <Typography
                        sx={{
                          textAlign: 'center',
                          fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                          fontWeight: 400,
                          fontSize: 14,
                          color: '#2663FF'
                        }}
                      >
                        {item?.name || shortenAddress(item?.address) || '--'}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        height: 68,
                        lineHeight: '68px',
                        textAlign: 'right',
                        fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                        fontWeight: 500,
                        fontSize: 14,
                        color: '#000'
                      }}
                    >
                      {item?.score || '--'} SCORE
                    </Typography>
                  </Box>
                )
              })}
            </RankList>
          )}
        </>
      )}
    </Box>
  )
}

function PoolDetail() {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '30px 60px',
        display: 'flex',
        flexFlow: 'row nowrap'
      }}
      gap={50}
    >
      <Box
        sx={{
          width: 270,
          minHeight: 521,
          padding: '0 20px',
          background: `var(--ps-gray-50)`,
          borderRadius: 20,
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 30
        }}
      >
        <Image
          style={{
            borderRadius: '50%',
            margin: '0 auto 24px'
          }}
          src={EquilibriaAvatar}
          width={120}
          height={120}
        />
        <Typography
          sx={{
            marginBottom: 10,
            color: 'var(--ps-gray-900)',
            fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
            fontSize: 20,
            fontWeight: 500
          }}
        >
          Equilibria
        </Typography>
        <Typography
          sx={{
            marginBottom: 24,
            color: 'var(--ps-gray-700)',
            fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
            fontSize: 14,
            fontWeight: 400,
            textAlign: 'center'
          }}
        >
          Equilibria Finance is designed exclusively for $PENDLE holders and liquidity providers, offering an
          easy-to-use platform to maximize your profits.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          gap={9}
        >
          <Image
            style={{
              cursor: 'pointer'
            }}
            src={TwitterIcon}
            width={36}
            height={36}
            onClick={() => {
              window.open('https://twitter.com/Equilibriafi', '_blank')
            }}
          />
          <Image
            style={{
              cursor: 'pointer'
            }}
            src={InterNetIcon}
            width={36}
            height={36}
            onClick={() => {
              window.open('https://equilibria.fi', '_blank')
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: '30px 0 0'
        }}
      >
        <ReactMarkdown
          components={{
            a({ children, href }: { children: ReactNode; href: string }) {
              return (
                <a href={href} style={{ color: 'blue', textDecoration: 'underline' }}>
                  {children}
                </a>
              )
            }
          }}
        >
          {EquilibriaIntroMd}
        </ReactMarkdown>
      </Box>
    </Box>
  )
}

function UserBlock() {
  const { data: poolInfo, run: getPoolInfo } = usePoolInfo()
  if (!poolInfo) {
    return (
      <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BounceAnime />
      </Box>
    )
  }
  return (
    <UserMainBlock
      style={{
        marginTop: '-25px'
      }}
      contentGap={50}
      poolInfo={poolInfo}
      getPoolInfo={getPoolInfo}
    />
  )
}

const EquilibriaIntroMd = `
## 1. Introduction:

- Equilibria Finance is designed exclusively for $PENDLE holders and liquidity providers, offering an easy-to-use platform to maximize your profits. It leverages the veToken/boosted yield model adopted by Pendle Finance to provide a boosted yield for LPs and extra reward to PENDLE holders with a tokenized version of vePENDLE, ePENDLE. If you are not familiar with veToken/boosted yield model, read the Pendle Finance doc [here](https://docs.pendle.finance/Governance/vePENDLE).
- Inspired by the fast swing of a pendulum at its equilibrium position that represents the point of maximum kinetic energy in the system, Equilibria Finance is on a mission to help you achieve your maximum potential.
- Led by a team of DeFi OGs with years of experience in the industry, our platform is customized and optimized for Pendle Finance. And with the support of our community, we plan to extend our platform to other leading protocols in the future.
- Join us today and swing into action with Equilibria Finance!

## 2. Benefits for different participants:

- For Pendle Finance
  1. Provide a more attractive yield for wider user base who don’t have any Pendle position;
  2. Make boosting yield more effective and fair, which means without us the LPs may have huge differences from PENDLE holders, so the PENDLE boosting power may be somehow wasted;
  3. Lock PENDLE forever, this will reduce the selling pressure of PENDLE;
- For LPs
  1. Receive higher yield including boosting PENDLE/other reward and EQB emission.
- For PENDLE holders
  1. Receive extra PENDLE reward and EQB emission rather than the normal reward from vePENDLE, such as YT swap fees;
  2. Liquid version of vePENDLE, and can exit position back to PENDLE anytime from the ePENDLE/PENDLE liquidity on the DEX.

## 3. Why Equilibria?

- Proven veToken Model

  The efficacy of the veToken model has been proven by successful projects such as Curve/Convex and Balancer/Aura. As we enter the era of vePendle, we are confident that this model will create long-term alignment between stakers and the protocol, leading to exponential growth and huge potential for our project.

- **Uncovered Market Opportunities**

  Pendle Finance brings the trillion-dollar traditional finance interest derivative market into DeFi, making it accessible to all. As the industry leader in this space, Pendle Finance is well-positioned to capture billions of TVL and take a significant share of the market as the DeFi space grows. With its innovative approach and commitment to driving value for users, we are poised to revolutionize the world of interest derivatives and drive the DeFi industry forward.

- Beyond the Curve Wars.

  Equilibria’s vision is to drive innovation in the field. Our goal is not just to create a Convex layer on Pendle. We also intend to introduce several novel features, such as the YT market for vlEQB, limit order for the PT/YT trading, cross chain implementation.

- Professional Team

  Our team of contributors are DeFi experts, with a deep understanding of the veToken model and successful experience in developing and operating veToken aggregators. With multiple years of web2/web3 development experience, we have the skill and will to drive Equilibria Finance to success.

## 4. Protocol Overviews:

- Check [here](https://equilibria-finance.gitbook.io/equilibria-finance/mechanism/boost-usdpendle-lp-yield)

## 5. Tokenomics:

- The total supply will be 100,000,000 and more than 70% will be used for incentives and community.
- More details cannot disclose right now because still discussing some very important things with 3rd parties. Will announce in 1 or 2 weeks.

## 6. Core team intro:

- Core team combines of DeFi degens who have much experience on yield booster; They have built yield booster on BNB chain and cross chain infrastructures on Cosmos ecosystem;
- Before the DeFi experience, core team graduated from the top CS university in US and worked for Facebook, Airbnb, Microsoft, Huobi;
- They have lots of experience on Web2/3 development and operations.

`
