import ProjectBg from 'assets/images/project-bg.png'
import { Box, Button, Stack, styled, Typography } from '@mui/material'
import { H4, H5, H6 } from '../../components/Text'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IPrivatePadProp, IProjectInfo, PrivatePadList } from '../launchpad'
import { Row } from '../../components/Layout'
import { AlignBottomBG } from '../../bounceComponents/launchpad/LaunchCard'
import { ReactComponent as IconBook } from 'assets/svg/icon-book.svg'
// import { ReactComponent as QuestionMark } from 'assets/svg/icon-question-mark.svg'
import TokenImage from '../../bounceComponents/common/TokenImage'
import { ChainId, ChainListMap } from '../../constants/chain'
import { useState } from 'react'
import FooterPc from '../../components/Footer/FooterPc'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import { ReactComponent as CopySvg } from 'assets/svg/copy.svg'
import { ReactComponent as InviteSvg } from 'assets/svg/invite.svg'
import { ReactComponent as InviteBlackSvg } from 'assets/svg/invite-black.svg'
import { ReactComponent as CopyBlackSvg } from 'assets/svg/copy-black.svg'
import { ReactComponent as ColseSvg } from 'assets/imgs/common/closeIcon.svg'
import ReactCopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { useWalletModalToggle } from 'state/application/hooks'
import { useBladeDaoSharer } from 'hooks/useBladeDaoShare'
import LikeUnlike from 'bounceComponents/common/LikeUnlike'
import { LIKE_OBJ } from 'api/idea/type'
import usePoolInfo from 'bounceHooks/auction/usePoolInfo'
import Favorite from 'bounceComponents/common/Favorite'
import { useUserInfo } from 'state/users/hooks'
import { routes } from 'constants/routes'
import { PoolStatus } from 'api/pool/type'
import { useRequest } from 'ahooks'
import { getInviteList } from 'api/bladeDao/index'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import EmptyData from 'bounceComponents/common/EmptyData'

const GrayButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 12px 20px;
  gap: 12px;
  width: fit-content;
  margin-top: 91px;
  margin-left: 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 8px;

  :hover {
    background: rgba(255, 255, 255, 0.2);
    border: none;
  }
`
const WhiteButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
  width: fit-content;
  height: 32px;
  background: #ffffff;
  border-radius: 8px;
`
const Upcoming = styled(H6)`
  color: white;
  align-self: end;
  width: min-content;
  padding: 4px 12px;
  height: 32px;
  margin-right: 10px;
  background: rgba(18, 18, 18, 0.2);
  backdrop-filter: blur(2px);
  border-radius: 100px;
`
const Sharebtn = styled(Box)({
  color: 'white',
  width: 107,
  height: 32,
  lineHeight: '32px',
  textAlign: 'center',
  background: 'transparent',
  border: '1px solid white',
  borderRadius: '32px',
  cursor: 'pointer',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    background: 'var(--ps-gray-900)',
    border: '1px solid var(--ps-gray-900)',
    color: '#fff'
  }
})
const GrayBg = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
  gap: 10px;
  width: fit-content;
  height: 32px;
  background: rgba(18, 18, 18, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 100px;
`
const VerticalDivider = styled(Box)`
  width: 1px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.6);
`
const TabBg = styled(H4)`
  padding: 24px;
  min-width: 320px;
  height: 76px;
  border-radius: 20px 20px 0 0;
  color: #959595;
  &.select {
    background: #ffffff;
    color: #121212;
  }
`
function Price({ title, value }: { title: string; value: string }) {
  return (
    <Box gap={8} sx={{ color: 'white' }}>
      <Typography variant={'body2'}>{title}</Typography>
      <Typography variant={'h4'}>{value}</Typography>
    </Box>
  )
}

export function BladeDao() {
  const item = PrivatePadList[0]
  useBladeDaoSharer()
  return (
    <Box>
      <ProjectHead item={item} />
      <Tabs item={item} />
      <FooterPc />
    </Box>
  )
}
const RankList = styled(Box)(() => ({
  position: 'relative',
  '.row': {
    width: '100%',
    height: 53,
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px 0 24px'
  },
  '.row:nth-child(odd)': {
    background: '#F6F6F3'
  }
}))
export const InviteListDialog = ({ handleClose }: { handleClose: () => void }) => {
  const { data: inviteData, loading } = useRequest(async () => {
    const resp = await getInviteList({
      poolId: 1,
      side: 'BladeDao'
    })
    return resp?.data?.list
  })
  console.log('inviteData>>>', inviteData)
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#000000',
          opacity: 0.7
        }}
        onClick={() => {
          handleClose && handleClose()
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate3D(-50%, -50%, 0)',
          width: 800,
          background: '#fff',
          borderRadius: 20,
          padding: '48px'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: 28,
            textAlign: 'left',
            marginBottom: 15
          }}
        >
          InvitationStatus
        </Typography>
        <ColseSvg
          style={{
            position: 'absolute',
            top: 30,
            right: 30,
            width: 40,
            height: 40,
            cursor: 'pointer'
          }}
          onClick={() => {
            handleClose && handleClose()
          }}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowarap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
            height: 50,
            lineHeight: '50px',
            borderBottom: '1px solid var(--ps-gray-20)'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: 13,
              color: 'var(--ps-gray-600)'
            }}
          >
            Address
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: 13,
              color: 'var(--ps-gray-600)'
            }}
          >
            Status
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <BounceAnime />
          </Box>
        ) : Array.isArray(inviteData) && inviteData.length > 0 ? (
          <RankList
            sx={{
              width: '100%',
              maxHeight: 420,
              overflowY: 'auto'
            }}
          >
            {inviteData.map((item, index) => {
              return (
                <Box className={'row'} key={index}>
                  <Typography
                    component={'span'}
                    sx={{
                      fontFamily: `'Inter'`,
                      fontWeight: 400,
                      fontSize: 14,
                      color: 'var(--ps-text-3)'
                    }}
                  >
                    {item?.account || '--'}
                  </Typography>
                  <Typography
                    component={'span'}
                    sx={{
                      fontFamily: `'Public Sans'`,
                      fontWeight: 600,
                      fontSize: 14,
                      color: item.isValid ? 'var(--ps-green-1)' : '#FD3333'
                    }}
                  >
                    {item?.isValid ? 'Valid' : 'Invalid'}
                  </Typography>
                </Box>
              )
            })}
          </RankList>
        ) : (
          <EmptyData />
        )}
      </Box>
    </Box>
  )
}
export function ShareBtn({ style, isDefaultBlackIcon }: { style?: React.CSSProperties; isDefaultBlackIcon?: boolean }) {
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const copyValue = useMemo(() => {
    if (!account) {
      return ''
    }
    return window.location.href + `?sharer=${btoa(account)}`
  }, [account])
  const [isHover, setIsHover] = useState(false)
  if (account) {
    return (
      <ReactCopyToClipboard text={copyValue} onCopy={() => toast.success('Successfully copied')}>
        <Sharebtn
          sx={{ ...style }}
          onMouseEnter={() => {
            setIsHover(true)
          }}
          onMouseLeave={() => {
            setIsHover(false)
          }}
        >
          Share
          {isHover ? (
            <CopySvg
              style={{
                marginLeft: 7
              }}
            />
          ) : isDefaultBlackIcon ? (
            <CopyBlackSvg
              style={{
                marginLeft: 7
              }}
            />
          ) : (
            <CopySvg
              style={{
                marginLeft: 7
              }}
            />
          )}
        </Sharebtn>
      </ReactCopyToClipboard>
    )
  } else {
    return (
      <Sharebtn
        sx={{ ...style }}
        onMouseEnter={() => {
          setIsHover(true)
        }}
        onMouseLeave={() => {
          setIsHover(false)
        }}
        onClick={toggleWalletModal}
      >
        Share
        {isHover ? (
          <CopySvg
            style={{
              marginLeft: 7
            }}
          />
        ) : isDefaultBlackIcon ? (
          <CopyBlackSvg
            style={{
              marginLeft: 7
            }}
          />
        ) : (
          <CopySvg
            style={{
              marginLeft: 7
            }}
          />
        )}
      </Sharebtn>
    )
  }
}
export function InviteBtn({
  style,
  isDefaultBlackIcon
}: {
  style?: React.CSSProperties
  isDefaultBlackIcon?: boolean
}) {
  const { account } = useActiveWeb3React()
  const { token } = useUserInfo()
  const toggleWalletModal = useWalletModalToggle()
  const [isHover, setIsHover] = useState(false)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  if (account && token) {
    return (
      <>
        <Sharebtn
          sx={{
            borderRadius: '50%',
            ...style
          }}
          onMouseEnter={() => {
            setIsHover(true)
          }}
          onMouseLeave={() => {
            setIsHover(false)
          }}
          onClick={() => {
            setInviteDialogOpen(true)
          }}
        >
          {isHover ? <InviteSvg /> : isDefaultBlackIcon ? <InviteBlackSvg /> : <InviteSvg />}
        </Sharebtn>
        {inviteDialogOpen && <InviteListDialog handleClose={() => setInviteDialogOpen(false)} />}
      </>
    )
  } else {
    return (
      <Sharebtn
        sx={{
          borderRadius: '50%',
          ...style
        }}
        onMouseEnter={() => {
          setIsHover(true)
        }}
        onMouseLeave={() => {
          setIsHover(false)
        }}
        onClick={toggleWalletModal}
      >
        {isHover ? <InviteSvg /> : isDefaultBlackIcon ? <InviteBlackSvg /> : <InviteSvg />}
      </Sharebtn>
    )
  }
}
export function ProjectHead({ item }: { item: IPrivatePadProp }) {
  const { data: poolInfo, run: getPoolInfo } = usePoolInfo()
  const { userId } = useUserInfo()

  const prices = [
    {
      title: 'Token Name',
      value: 'BLADE'
    },
    {
      title: 'Blockchain',
      value: 'zkSync Era'
    }
    // {
    //   title: 'Hard Cap Per User',
    //   value: item.hardCapPerUser
    // },
    // {
    //   title: 'Single Initial Investment',
    //   value: item.singleInitialInvestment
    // }
  ]
  const poolStatusText = useMemo(() => {
    let result = 'Upcoming'
    if (!poolInfo) return result
    switch (Number(poolInfo.status)) {
      case PoolStatus.Live:
        result = 'Live'
        break
      case PoolStatus.Upcoming:
        result = 'Upcoming'
        break
      case PoolStatus.Closed || PoolStatus.Cancelled:
        result = 'Closed'
        break
      default:
        break
    }
    return result
  }, [poolInfo])
  const pricesComponent = prices.map((p, i) => <Price title={p.title} value={p.value} key={i} />)
  const nav = useNavigate()
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '600px',
        marginTop: '-76px'
      }}
    >
      <img
        src={ProjectBg}
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: -2,
          filter: 'blur(50px)',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      <Box
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          background: `url(${ProjectBg})`,
          top: 0,
          right: '40px',
          bottom: 0,
          borderRadius: '0 0 20px 20px',
          backgroundSize: 'cover',
          objectFit: 'scale-down',
          left: '40px'
        }}
      >
        <GrayButton
          onClick={() => {
            nav(routes.launchpad.index)
          }}
        >
          <ArrowBackIcon />
          <Typography variant={'h5'}>Launchpad homepage</Typography>
        </GrayButton>
        <Box
          sx={{
            alignSelf: 'end',
            marginRight: 40,
            display: 'flex',
            flexFlow: 'row nowrap'
          }}
          gap={8}
        >
          <Upcoming
            style={{
              marginRight: 0
            }}
          >
            {poolStatusText}
          </Upcoming>
          {poolInfo && (
            <LikeUnlike
              likeObj={LIKE_OBJ.pool}
              objId={poolInfo?.id}
              likeAmount={{
                dislikeCount: poolInfo?.likeInfo?.dislikeCount,
                likeCount: poolInfo?.likeInfo?.likeCount,
                myDislike: poolInfo?.likeInfo?.myDislike,
                myLike: poolInfo?.likeInfo?.myLike
              }}
              onSuccess={getPoolInfo}
              likeSx={{
                '&:hover': {
                  color: '#259C4A',
                  background: '#FFFFFF'
                }
              }}
              unlikeSx={{
                '&:hover': {
                  color: '#CA2020',
                  background: '#FFFFFF'
                }
              }}
            />
          )}
          {!!userId && poolInfo && (
            <Favorite collectionId={Number(poolInfo.id)} defaultCollected={poolInfo.ifCollect} />
          )}
          <ShareBtn
            style={{
              border: '1px solid #fff',
              color: '#fff'
            }}
          />
          <InviteBtn
            style={{
              border: '1px solid #fff',
              color: '#fff',
              width: 34,
              padding: 0,
              marginLeft: 6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
        </Box>
        <AlignBottomBG
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0 0 20px 20px',
            alignItems: 'center',
            paddingBottom: '80px',
            paddingTop: '20px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #000000 100%)'
          }}
        >
          <img src={item.avatar} style={{ width: 60, height: 60, borderRadius: 6 }} />
          <Typography mt={16} variant={'h1'} sx={{ color: 'white' }}>
            {item.title}
          </Typography>
          <Typography mt={14} variant={'body1'} sx={{ color: 'white', maxWidth: '800px', textAlign: 'center' }}>
            {item.desc}
          </Typography>
          <Row mt={32} alignItems={'center'} gap={16}>
            {item.detailSocial}
            <WhiteButton
              onClick={() => {
                window.open('https://bladedao.gitbook.io/bladedao/', '_blank')
              }}
            >
              <IconBook />
              <H6>Whitepaper</H6>
            </WhiteButton>
            {/*<WhiteButton>*/}
            {/*  <QuestionMark />*/}
            {/*  <H6>FAQ</H6>*/}
            {/*</WhiteButton>*/}
          </Row>
          <Row mt={16} gap={8}>
            <GrayBg>
              <TokenImage
                src={item.backendChainId ? ChainListMap?.[item.backendChainId as ChainId]?.logo : ''}
                size={12}
              />
              <Typography variant={'h6'} color={'white'}>
                zkSync Era
              </Typography>
            </GrayBg>
            {/*<GrayBg>*/}
            {/*  <Typography color={'#C8F056'}>Playable Auction</Typography>*/}
            {/*</GrayBg>*/}
          </Row>
          <Row gap={24} mt={16}>
            <>
              {pricesComponent.flatMap((element, index) => {
                if (index !== pricesComponent.length - 1) {
                  return [element, <VerticalDivider key={index} />]
                }
                return [element]
              })}
            </>
          </Row>
        </AlignBottomBG>
      </Box>
    </Box>
  )
}
export function Tabs({ item }: { item: IPrivatePadProp }) {
  // const tabs = ['Project Information', 'STEPN Token', 'Token Metrics']
  const tabs = ['Project Information', 'Investment and Partners']
  const [tab, setTab] = useState(tabs[0])
  console.log(setTab)

  return (
    <Box mt={120} mb={140}>
      <Row justifyContent={'center'}>
        {tabs.map((t, i) => (
          <TabBg key={i} /*onClick={() => setTab(t)}*/ className={tab === t ? 'select' : ''}>
            {t}
          </TabBg>
        ))}
      </Row>
      <Box
        sx={{
          background: 'white',
          padding: '20px 72px',
          minHeight: '486px'
        }}
      >
        {tab === tabs[0] && <ProjectInfo item={item} />}
        {/*{tab === tabs[1] && <STEPNToken item={item} />}*/}
        {tab === tabs[2] && <TokenMetrics item={item} />}
      </Box>
    </Box>
  )
}

const ProjectInfoSubtitle = styled(H5)`
  padding: 16px 20px;
  width: 360px;
  border-radius: 8px;
  color: #959595;

  &:hover {
    cursor: pointer;
    border: 1px solid #e1f25c;
    color: #121212;
    border-radius: 8px;
  }

  &.select {
    background: #e1f25c;
    color: #121212;
  }
`

const ProjectContentBg = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 80px 40px 120px;
  gap: 40px;
  width: 912px;
  min-height: 446px;
  background: #f6f7f3;
  border-radius: 30px;
`

function InfoList({ info }: { info: IProjectInfo[] }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1296px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Stack spacing={10}>
        {info.map((i, idx) => (
          <ProjectInfoSubtitle
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={idx === currentIdx ? 'select' : ''}
          >
            {i.title}
          </ProjectInfoSubtitle>
        ))}
      </Stack>
      <ProjectContentBg>
        <Typography variant={'h2'}>{info[currentIdx].title}</Typography>
        {Array.isArray(info[currentIdx].info) &&
          info[currentIdx].info.length > 0 &&
          info[currentIdx].info.map((item: string, index: number) => (
            <Typography key={index} variant={'body1'}>
              {item}
            </Typography>
          ))}
      </ProjectContentBg>
    </Box>
  )
}

function ProjectInfo({ item }: { item: IPrivatePadProp }) {
  return <InfoList info={item.projectInfo} />
}

// function STEPNToken({ item }: { item: IPrivatePadProp }) {
//   return <></>
// }

function TokenMetrics({ item }: { item: IPrivatePadProp }) {
  return <InfoList info={item.tokenMetrics} />
}
