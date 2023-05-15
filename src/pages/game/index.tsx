import { Box, Container, styled, Typography, Tabs, Tab } from '@mui/material'
import { CenterRow, Row } from '../../components/Layout'
import { ReactComponent as LeftArrow } from 'assets/svg/chevron-left.svg'
// import { ReactComponent as ThumbsUp } from 'assets/svg/thumbsUp.svg'
// import { ReactComponent as ThumbsDown } from 'assets/svg/thumbsDown.svg'
// import TokenImage from '../../bounceComponents/common/TokenImage'
// import { ChainId, ChainListMap } from '../../constants/chain'
import GhostieRunner from 'components/GhostieRunner'
import { useCallback, useState } from 'react'
import { useSignMessage } from 'hooks/useWeb3Instance'
import { useActiveWeb3React } from 'hooks'
import { useUserInfo } from 'state/users/hooks'
import InterNetIcon from 'assets/imgs/game/internet.png'
import TwitterIcon from 'assets/imgs/game/twitter.png'
import IgIcon from 'assets/imgs/game/ig.png'
import EditIcon from 'assets/imgs/game/edit.png'
import GithubIcon from 'assets/imgs/game/github.png'
import NormalIcon from 'assets/imgs/game/normal.png'
import ErrorIcon from 'assets/imgs/game/error.png'
import WarningIcon from 'assets/imgs/game/warning.png'
import { getAllrank, sendScore, getUserRank } from 'api/game/index'
import { useRequest } from 'ahooks'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import EmptyData from 'bounceComponents/common/EmptyData'
import Image from 'components/Image'
import { useShowLoginModal } from 'state/users/hooks'
import PoolLogo from 'assets/imgs/game/poolLogo.png'
import { useCountDown } from 'ahooks'
import moment from 'moment'
import UserIcon from 'assets/imgs/profile/yellow_avatar.svg'
import { shortenAddress } from 'utils'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
export function Game() {
  const signMessage = useSignMessage()
  const { account } = useActiveWeb3React()
  const { token } = useUserInfo()

  const uploadGameScore = useCallback(
    async (score: number) => {
      const resultScore = score.toFixed(2)
      const message = `Bounce would like you to sign the game score: ${resultScore}`
      try {
        if (!account || !token) {
          return
        }
        const signature = await signMessage(message)
        const req = {
          message,
          payableId: 1,
          address: account,
          signature
        }
        const res = await sendScore(req)
        console.log('🚀 ~ file: index.tsx:25 ~ uploadGameScore ~ req:', req)
      } catch (error) {}
    },
    [account, signMessage, token]
  )
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const [countdown, { days, hours, minutes }] = useCountDown({
    targetDate: moment('2023-07-25', 'YYYY-MM-DD').valueOf()
  })
  return (
    <Container maxWidth="lg">
      <Title />
      <Step />
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
              Ghostie Game
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
          </Box>
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
            />
            <img
              style={{
                width: 36,
                cursor: 'pointer'
              }}
              src={TwitterIcon}
              alt=""
            />
            <img
              style={{
                width: 36,
                cursor: 'pointer'
              }}
              src={IgIcon}
              alt=""
            />
          </Box>
        </Box>
        <StatusTitle status={!account ? StatusType.NeedLogin : StatusType.Rules} />
        <GhostieRunner scoreUpload={uploadGameScore} />
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
          <Tab label="Leaderboard" {...a11yProps(0)} />
          <Tab label="Auction Details" {...a11yProps(1)} />
          <Tab label="Auction History" {...a11yProps(2)} />
        </NewTabs>
        {value === 0 && <RankSection />}
        {value === 1 && <PoolDetail />}
        {value === 2 && (
          <Box
            sx={{
              padding: '100px 0 100px'
            }}
          >
            <EmptyData title={`No History Data`} />
          </Box>
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
  width: 556px;
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
function Title() {
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
            background: 'white'
          }}
        >
          <LeftArrow />
        </Box>
        <Typography ml={20} variant={'h3'}>
          Ghistie Fixed Price Auction Pool
        </Typography>
        {/* <ThumbBg ml={35}>
          <ThumbsUp />
          <Typography variant={'body1'}>16</Typography>
        </ThumbBg>
        <ThumbBg ml={6}>
          <ThumbsDown />
          <Typography variant={'body1'}>16</Typography>
        </ThumbBg> */}
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
function Step() {
  return (
    <Row alignItems={'center'} mt={47}>
      <StepBg>
        <StepText>1</StepText>
        <Typography sx={{ color: 'white' }} variant={'h4'}>
          Stage One: Game Competition
        </Typography>
      </StepBg>
      <Box
        sx={{
          border: '2px dashed #171717',
          width: 89
        }}
      />
      <StepBgLine>
        <StepText2>2</StepText2>
        <Typography variant={'h4'}>Stage Two: Token Auction</Typography>
      </StepBgLine>
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
            </span>{' '}
            Play the game and try to get higher scores. The top 50 players before Jul 25 will get allocation.
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
function RankSection() {
  const { data: rankData, loading: rankLoading } = useRequest(async () => {
    const resp = await getAllrank({
      payableId: 1
    })
    return {
      list: resp.data?.list || [],
      total: resp.data?.total || 0
    }
  })
  const { data: userRankData } = useRequest(async () => {
    const resp = await getUserRank({
      payableId: 1
    })
    return resp
  })
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
          My rank: {userRankData?.data?.rank + 1}
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
          {userRankData?.data?.score || '--'} SCORE
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
                  score={`${rankData.list[1]?.totalCreated}SCORE`}
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
                  score={`${rankData.list[0]?.totalCreated}SCORE`}
                  userIcon={rankData.list[0]?.avatar || UserIcon}
                  isNo1={true}
                  rank={1}
                />
              )}
              {rankData && rankData.list && rankData.list.length >= 3 ? (
                <RankTopItem
                  userId={rankData.list[2]?.userId || ''}
                  name={rankData.list[2]?.name || shortenAddress(rankData.list[2]?.address) || '--'}
                  score={`${rankData.list[2]?.totalCreated}SCORE`}
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
                      {item?.totalCreated || '--'} SCORE
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
          src={PoolLogo}
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
          Elon Musk
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
          AWS provides customers with the broadest and deepest cloud platform cloud platform cloud platform the broadest
          and deepest cloud platform...
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
          />
          <Image
            style={{
              cursor: 'pointer'
            }}
            src={IgIcon}
            width={36}
            height={36}
          />
          <Image
            style={{
              cursor: 'pointer'
            }}
            src={InterNetIcon}
            width={36}
            height={36}
          />
          <Image
            style={{
              cursor: 'pointer'
            }}
            src={GithubIcon}
            width={36}
            height={36}
          />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: '30px 0 0'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
            fontWeight: 500,
            fontSize: 14,
            color: '#000000',
            marginBottom: 17
          }}
        >
          Auction Background
          <Image
            style={{
              cursor: 'pointer'
            }}
            src={EditIcon}
            width={20}
            height={20}
          />
        </Typography>
        <Typography
          sx={{
            fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
            fontSize: 14,
            color: 'var(--ps-gray-700)',
            marginBottom: 20
          }}
        >
          {`Hello, nice to meet you ^^... My Name is Eleanor Pena. I work as an Comic Artist, Freelance Illustrator, and
          concepting Character Design. I can do drawing for personal or business. I started my career as an illustrator
          in 2018. I'm an expert at manga and anime style artworks. `}
        </Typography>
        <Typography
          sx={{
            fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
            fontSize: 14,
            color: 'var(--ps-gray-700)',
            marginBottom: 20
          }}
        >
          {`Hello, nice to meet you ^^... My Name is Eleanor
          Pena. I work as an Comic Artist, Freelance Illustrator, and concepting Character Design. I can do drawing for
          personal or business. I started my career as an illustrator in 2018. I'm an expert at manga and anime style
          artworks. `}
        </Typography>
        <Typography
          sx={{
            fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
            fontSize: 14,
            color: 'var(--ps-gray-700)',
            marginBottom: 20
          }}
        >
          {`Hello, nice to meet you ^^... My Name is Eleanor Pena. I work as an Comic Artist, Freelance
          Illustrator, and concepting Character Design. I can do drawing for personal or business. I started my career
          as an illustrator in 2018. I'm an expert at manga and anime style artworks.`}
        </Typography>
      </Box>
    </Box>
  )
}
