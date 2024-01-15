/* eslint-disable @typescript-eslint/no-unused-vars */
// import ProjectBg from 'assets/images/project-bg.png'
import { Box, Button, Stack, styled, Typography } from '@mui/material'
import { H4, H5, H6 } from '../../components/Text'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IPrivatePadProp, IPrivatePricesInfo, IProjectInfo, PrivatePadDataList } from '../launchpad/PrivatePadDataList'
import { Row } from '../../components/Layout'
import { AlignBottomBG } from '../../bounceComponents/launchpad/LaunchCard'
import { ReactComponent as IconBook } from 'assets/svg/icon-book.svg'
import { ReactComponent as QuestionMark } from 'assets/svg/icon-question-mark.svg'
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
import useBreakpoint from 'hooks/useBreakpoint'
import { useIsMDDown } from 'themes/useTheme'
const ProjectInfoDarkStyle = {
  fontFamily: { it: 'Inter' },
  Head: {
    ButtonBg: 'linear-gradient(180deg, #5086FD 0%, #312C87 99.99%, #312C87 100%)',
    ButtonHoverBg: '#4f60fc',
    UpComBg: '#D7D6D9',
    UpComColor: '#626262',
    PoolTypeColor: '#4F5FFC',
    PriceTitleColor: '#959595'
  },
  Tabs: {
    TabColor: '#ffffff',
    InfoList: {
      BoxBg: '#121219',
      BoxBorderImage: 'linear-gradient(135deg,#4848c4,#000) 1 1'
    }
  }
}
export const GrayButton = styled(Button)`
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
export const LineStyleBtn = styled(Box)(({ theme }) => ({
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
  },
  [theme.breakpoints.down('md')]: {
    width: 88,
    height: 29,
    fontSize: 13
  }
}))
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
  font-size: 20px;
  &.select {
    background: #ffffff;
    color: #121212;
  }
`
const HeadPriceTitle = styled(Typography)({
  fontFamily: 'Inter',
  fontSize: 14,
  lineHeight: '140%',
  textTransform: 'capitalize'
})
const HeadPriceContext = styled(Typography)({
  fontFamily: 'Inter',
  fontSize: 16,
  lineHeight: '140%',
  letterSpacing: '-0.32px',
  fontWeight: 500
})
const STEPNTokenTitle = styled(Typography)({
  width: 220,
  color: '#626262',
  leadingTrim: 'both',
  textEdge: 'cap',
  fontSize: 16,
  fontFamily: 'Inter',
  lineHeight: '150%'
})

function Price({
  title,
  value,
  isDark
}: {
  title: any
  value: (string | JSX.Element)[] | (string | JSX.Element)
  isDark?: boolean
}) {
  return (
    <Box gap={8} sx={{ color: 'white' }}>
      <HeadPriceTitle sx={{ color: isDark ? ProjectInfoDarkStyle.Head.PriceTitleColor : '#D7D6D9' }} variant={'body2'}>
        {title}
      </HeadPriceTitle>
      <HeadPriceContext mt={8}>{value}</HeadPriceContext>
    </Box>
  )
}

export function BladeDao() {
  const item = PrivatePadDataList.find(i => i.keyId === 2) as IPrivatePadProp
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
      poolId: '6,13',
      side: 'BladeDao'
    })
    return resp?.data?.list
  })
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
            fontFamily: `'Inter'`,
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
                <Box className={'row'} key={'inviteData' + index}>
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
                      fontFamily: `'Inter'`,
                      fontWeight: 600,
                      fontSize: 14,
                      color: item.isValid ? 'var(--ps-green-1)' : '#FFC700'
                    }}
                  >
                    {item?.isValid ? 'Valid' : 'Waiting'}
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
        <LineStyleBtn
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
        </LineStyleBtn>
      </ReactCopyToClipboard>
    )
  } else {
    return (
      <LineStyleBtn
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
      </LineStyleBtn>
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
        <LineStyleBtn
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
        </LineStyleBtn>
        {inviteDialogOpen && <InviteListDialog handleClose={() => setInviteDialogOpen(false)} />}
      </>
    )
  } else {
    return (
      <LineStyleBtn
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
      </LineStyleBtn>
    )
  }
}

export function ProjectHead({ item, isDark }: { item: IPrivatePadProp; isDark?: boolean }) {
  console.log('🚀 ~ file: index.tsx:512 ~ ProjectHead ~ item:', item)
  const { data: poolInfo, run: getPoolInfo } = usePoolInfo(item.backedId)
  const { userId } = useUserInfo()
  const isMD = useIsMDDown()
  const isSm = useBreakpoint('sm')
  let prices: IPrivatePricesInfo[] = [
    {
      title: 'Token Name',
      value: item.tokenName
    },
    {
      title: 'Blockchain',
      value: ChainListMap[item.chainId]?.name || '--'
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

  item.privatePrices && (prices = item.privatePrices)
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
  const pricesComponent = prices.map((p, i) => (
    <Price isDark={isDark} title={p.title} value={p.value} key={'Price' + i} />
  ))
  const nav = useNavigate()

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: isMD ? 800 : 600,
        marginTop: { md: '-76px' }
      }}
    >
      <img
        src={item.pageInImg || item.img}
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
        sx={{
          position: 'relative',
          width: `calc(100% - ${isSm ? 40 : 80}px)`,
          display: 'flex',
          flexDirection: 'column',
          // background: `url(${item.pageInImg || item.img})`,
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(${
            item.pageInImg || item.img
          })`,
          top: 0,
          right: isDark && isSm ? '' : { xs: 20, sm: '40px' },
          bottom: 0,
          borderRadius: '0 0 20px 20px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          objectFit: 'scale-down',
          left: isDark && isSm ? '' : { xs: 20, sm: '40px' }
        }}
      >
        {!isMD && (
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
            <GrayButton
              sx={{
                background: isDark ? ProjectInfoDarkStyle.Head.ButtonBg : '',
                '&:hover': {
                  background: isDark ? ProjectInfoDarkStyle.Head.ButtonHoverBg : ''
                },
                height: { xs: 'auto' }
              }}
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
                mt: 10,
                display: 'flex',
                flexFlow: 'row nowrap'
              }}
              gap={8}
            >
              <Upcoming
                style={{
                  marginRight: 0,
                  background: isDark ? ProjectInfoDarkStyle.Head.UpComBg : '',
                  fontFamily: isDark ? ProjectInfoDarkStyle.fontFamily.it : '',
                  color: isDark ? ProjectInfoDarkStyle.Head.UpComColor : ''
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
            </Box>
          </Stack>
        )}
        {isMD && (
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'flex-start',
              alignItems: 'flex-start'
            }}
          >
            <GrayButton
              sx={{
                background: isDark ? ProjectInfoDarkStyle.Head.ButtonBg : '',
                '&:hover': {
                  background: isDark ? ProjectInfoDarkStyle.Head.ButtonHoverBg : ''
                },
                padding: '16px',
                marginLeft: '16px',
                width: '200px',
                height: '37px'
              }}
              onClick={() => {
                nav(routes.launchpad.index)
              }}
            >
              <ArrowBackIcon
                style={{
                  width: '16px'
                }}
              />
              <Typography
                variant={'h5'}
                sx={{
                  flex: 1,
                  fontSize: 12,
                  fontFamily: `'Inter'`,
                  wordBreak: 'break-all',
                  letterSpacing: '-0.28px'
                }}
              >
                Launchpad homepage
              </Typography>
            </GrayButton>
            <Box
              sx={{
                marginLeft: 16,
                mt: 10,
                display: 'flex',
                flexFlow: 'row nowrap'
              }}
              gap={8}
            >
              <Upcoming
                style={{
                  fontFamily: `'Inter'`,
                  marginRight: 0,
                  background: isDark ? ProjectInfoDarkStyle.Head.UpComBg : '',
                  color: isDark ? ProjectInfoDarkStyle.Head.UpComColor : ''
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
            </Box>
          </Box>
        )}
        <AlignBottomBG
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0 0 20px 20px',
            alignItems: 'center',
            paddingBottom: isMD ? '0' : '50px',
            paddingTop: '20px'
            // background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #000000 100%)'
          }}
        >
          {<img src={item.avatar} style={{ width: 60, height: 60, borderRadius: 6 }} />}
          <Typography mt={16} variant={'h1'} sx={{ color: 'white' }} textAlign={'center'}>
            {item.title}
          </Typography>
          <Typography
            mt={14}
            variant={'body1'}
            sx={{ color: 'white', maxWidth: '800px', textAlign: 'center', padding: '0 10px' }}
          >
            {item.desc}
          </Typography>
          <Row mt={32} alignItems={'center'} gap={16} flexWrap={'wrap'} justifyContent={'center'}>
            {item.social}
            {item.whitePaperLink && (
              <WhiteButton
                onClick={() => {
                  window.open(item.whitePaperLink, '_blank')
                }}
              >
                <IconBook />
                <H6>Whitepaper</H6>
              </WhiteButton>
            )}
            {item.isFAQ && (
              <WhiteButton>
                <QuestionMark />
                <H6>FAQ</H6>
              </WhiteButton>
            )}
          </Row>
          {!isMD && (
            <Row mt={16} gap={8}>
              <GrayBg>
                <TokenImage
                  src={item.chainId ? ChainListMap?.[item.chainId as ChainId]?.logo : ''}
                  size={isDark ? 24 : 12}
                />
                <Typography variant={'h6'} color={'white'}>
                  {item.chainId ? ChainListMap?.[item.chainId as ChainId]?.name : ''}
                </Typography>
              </GrayBg>
              {/* {isDark && (
                <GrayBg
                  sx={{
                    background: '#20201E',
                    borderRadius: '100px'
                  }}
                >
                  <Typography color={ProjectInfoDarkStyle.Head.PoolTypeColor}>{item.poolTypeName}</Typography>
                </GrayBg>
              )} */}
              {item.poolTypeName2 && (
                <GrayBg
                  sx={{
                    background: '#20201E',
                    borderRadius: '100px'
                  }}
                >
                  <Typography color={ProjectInfoDarkStyle.Head.PoolTypeColor}>{item.poolTypeName2}</Typography>
                </GrayBg>
              )}
              {/*<GrayBg>*/}
              {/*  <Typography color={'#B5E529'}>Playable Auction</Typography>*/}
              {/*</GrayBg>*/}
            </Row>
          )}
          {isMD && (
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              mt={16}
              gap={8}
            >
              <GrayBg>
                <TokenImage
                  src={item.chainId ? ChainListMap?.[item.chainId as ChainId]?.logo : ''}
                  size={isDark ? 24 : 12}
                />
                <Typography variant={'h6'} color={'white'}>
                  {item.chainId ? ChainListMap?.[item.chainId as ChainId]?.name : ''}
                </Typography>
              </GrayBg>
              {isDark && (
                <GrayBg
                  sx={{
                    background: '#20201E',
                    borderRadius: '100px'
                  }}
                >
                  <Typography color={ProjectInfoDarkStyle.Head.PoolTypeColor}>{item.poolTypeName}</Typography>
                </GrayBg>
              )}
              {/* {item.poolTypeName2 && (
                <GrayBg
                  sx={{
                    background: '#20201E',
                    borderRadius: '100px'
                  }}
                >
                  <Typography color={ProjectInfoDarkStyle.Head.PoolTypeColor}>{item.poolTypeName2}</Typography>
                </GrayBg>
              )} */}
            </Box>
          )}
          {item.multipleTokenInfo && (
            <Box my={16}>
              <Typography
                sx={{
                  color: 'var(--grey-04, #D7D6D9)',
                  fontFamily: 'Inter',
                  fontSize: 13,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '140% ',
                  textTransform: 'capitalize',
                  textAlign: 'center'
                }}
                mb={11}
              >
                {item.multipleTokenInfo.title}
              </Typography>
              <Row sx={{ gap: { xs: 16, md: 24 } }}>{item.multipleTokenInfo.social}</Row>
            </Box>
          )}
          {!isMD && (
            <Row
              gap={24}
              mt={16}
              alignItems={'center'}
              sx={{
                '@media(max-width:600px)': isDark
                  ? { flexWrap: 'nowrap', padding: '0 20px', flexDirection: 'column', alignItems: 'flex-start' }
                  : {}
              }}
            >
              <>
                {pricesComponent.flatMap((element, index) => {
                  if (index !== pricesComponent.length - 1) {
                    return [
                      element,
                      <VerticalDivider key={index} sx={{ display: isDark && isSm ? 'none' : 'block' }} />
                    ]
                  }
                  return [element]
                })}
              </>
            </Row>
          )}
          {isMD && (
            <Row
              gap={24}
              mt={51}
              alignItems={'flex-start'}
              justifyContent={'center'}
              sx={{
                width: '100%',
                '@media(max-width:600px)': isDark
                  ? { flexWrap: 'nowrap', padding: '0 20px', flexDirection: 'column', alignItems: 'flex-start' }
                  : { paddingBottom: '10px' }
              }}
            >
              <>
                {pricesComponent.flatMap((element, index) => {
                  if (index !== pricesComponent.length - 1) {
                    return [
                      element,
                      <VerticalDivider key={index} sx={{ display: isDark && isSm ? 'none' : 'block' }} />
                    ]
                  }
                  return [element]
                })}
              </>
            </Row>
          )}
        </AlignBottomBG>
      </Box>
    </Box>
  )
}

export function Tabs({ item, isDark, hideTitle }: { item: IPrivatePadProp; isDark?: boolean; hideTitle?: boolean }) {
  // const tabs = ['Project Information', 'STEPN Token', 'Token Metrics']
  const tabs = isDark ? ['Project Information', 'STEPN Token', 'Token Metrics'] : ['Project Information']
  const [tab, setTab] = useState(tabs[0])
  console.log(setTab)

  return (
    <Box
      className={isDark ? ' dark' : ''}
      mt={isDark ? 0 : 200}
      mb={140}
      sx={{ padding: isDark ? { xs: 0, sm: 72 } : 0, '&.dark': { width: '100%', maxWidth: 1296, margin: '0 auto' } }}
    >
      <Row
        justifyContent={isDark ? 'start' : 'center'}
        sx={{ overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}
        gap={isDark ? 24 : 0}
      >
        {tabs.map((t, i) => {
          if (t === 'STEPN Token') return null
          return (
            <TabBg
              sx={{
                minWidth: isDark ? 'auto' : 230,
                padding: isDark ? { xs: '24px 12px', sm: 24 } : '',
                whiteSpace: 'pre',
                '&.select': {
                  background: `${isDark ? 'transparent' : '#ffffff'}!important`,
                  color: `${isDark ? ProjectInfoDarkStyle.Tabs.TabColor : '#121212'} !important`
                },
                '&:hover': {
                  cursor: 'pointer',
                  color: `${isDark ? ProjectInfoDarkStyle.Tabs.TabColor : '#121212'} !important`
                },
                display: hideTitle ? 'none' : 'block'
              }}
              key={'projectHead' + i}
              onClick={() => tabs.length > 1 && setTab(t)}
              className={tab === t ? 'select' : ''}
            >
              {t}
            </TabBg>
          )
        })}
      </Row>
      {isDark && <DarkLine mb={30} />}
      <Box
        sx={{
          background: isDark ? 'transparent' : 'white',
          padding: { xs: 20, sm: isDark ? '0' : '20px 72px' },
          minHeight: '486px',
          marginTop: isDark ? 30 : 0
        }}
      >
        {tab === tabs[0] && <ProjectInfo isDark={isDark} item={item} />}
        {tab === tabs[1] && <STEPNTokenDark />}
        {tab === tabs[2] && <TokenMetrics isDark={isDark} item={item} />}
      </Box>
    </Box>
  )
}
const DarkLine = styled(Box)({
  width: '100vw',
  height: 1,
  background: 'rgba(255, 255, 255, 0.20)',
  position: 'absolute',
  left: 0
})
const ProjectInfoSubtitle = styled(H5)`
  padding: 16px 20px;
  width: 360px;
  border-radius: 8px;
  color: #959595;
  font-size: 16px;
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
  gap: 40px;
  width: 912px;
  min-height: 300px;
  background: #f6f7f3;
  border-radius: 30px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const ProjectContentBgDark = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 40,
  width: '100%',
  maxWidth: 912,
  minHeight: 300,
  background: '#121219',
  borderRadius: 6,
  color: 'white'
})
const ProjectLineDrak = styled(Box)({
  width: '100%',
  height: 2,
  background: 'rgba(255,255,255,.2)'
})

function InfoList({ info, isDark }: { info: IProjectInfo[]; isDark?: boolean }) {
  const [currentIdx, setCurrentIdx] = useState(0)

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1296px',
        margin: isDark ? '0' : '0 auto',
        display: 'flex',
        flexWrap: { xs: 'wrap', md: 'unset' },
        justifyContent: 'space-between',
        letterSpacing: 0.2,
        gap: 24
      }}
    >
      <Stack
        spacing={10}
        sx={{ marginBottom: { xs: '10px', sm: '0' }, width: isDark ? { xs: '100%', sm: '360px' } : '360px' }}
      >
        {info.length > 0 &&
          info.map((i, idx) => (
            <ProjectInfoSubtitle
              sx={{
                width: isDark ? { xs: 'auto' } : '360px',
                border: '1px solid transparent',
                background: isDark ? ProjectInfoDarkStyle.Tabs.InfoList.BoxBg : '',
                '&:hover,&.select': {
                  border: isDark ? '1px solid' : '',
                  borderImage: isDark ? ProjectInfoDarkStyle.Tabs.InfoList.BoxBorderImage : '',
                  color: isDark ? ProjectInfoDarkStyle.Tabs.TabColor : '',
                  background: isDark ? ProjectInfoDarkStyle.Tabs.InfoList.BoxBg : ''
                }
              }}
              key={'info' + idx}
              onClick={() => setCurrentIdx(idx)}
              className={idx === currentIdx ? 'select' : ''}
            >
              {i.title}
            </ProjectInfoSubtitle>
          ))}
      </Stack>
      {info.length > 0 && !isDark && (
        <ProjectContentBg
          sx={{
            width: { sm: '100%', md: 912 },
            padding: { xs: '40px 20px 60px', sm: '40px' }
          }}
        >
          <Typography variant={'h2'}>{info[currentIdx].title}</Typography>
          {Array.isArray(info[currentIdx].info) &&
            info[currentIdx].info.length > 0 &&
            info[currentIdx].info.map((item, index: number) => (
              <Typography style={{ width: '100%', wordWrap: 'break-word' }} key={'bg' + index} variant={'body1'}>
                {item}
              </Typography>
            ))}
        </ProjectContentBg>
      )}
      {info.length > 0 && isDark && (
        <ProjectContentBgDark
          sx={{ width: { sm: '100%', md: 912 }, padding: { xs: '40px 20px 60px', sm: '60px 40px 80px' } }}
        >
          <Typography variant={'h2'}>{info[currentIdx].title}</Typography>
          <ProjectLineDrak />
          {Array.isArray(info[currentIdx].info) &&
            info[currentIdx].info.length > 0 &&
            info[currentIdx].info.map((item, index: number) => (
              <Typography
                sx={{
                  color: '#959595',
                  leadingTrim: 'both',
                  textEdge: 'cap',
                  fontSize: 16,
                  fontFamily: 'Inter',
                  lineHeight: '150%'
                }}
                key={'Typography' + index}
                variant={'body1'}
              >
                {item}
              </Typography>
            ))}
        </ProjectContentBgDark>
      )}
    </Box>
  )
}

const STEPNTokenDark = () => {
  const tokenList: { [key: string]: string }[] = [
    // { 'Hard Cap': '4200000 USD' },
    // { 'Total Token Supply': '6000000000 GMT' },
    // { 'Initial Circulating Supply': '10% of Total Token Supply' },
    // { 'Public Sale Token Price': '0.01 USD (price in BB will be determined prior to the start of subscription)' },
    // { 'Tokens Offered': '420000000 GMT' },
    // { 'Hard Cap Per User': '15000 USD (price in BNB will be determined prior to the start of subscription)' },
    // { 'Token Sale Vesting Period': 'No lockup' },
    // { 'Token Type': 'SPL' },
    { 'Token Distribution': 'After the end of token sale' }
  ]
  return (
    <Box>
      <H4 sx={{ color: 'white', textAlign: 'center' }}>DIP Token Sale and Economics</H4>
      <Stack flexDirection={'column'} gap={10} mt={30}>
        {tokenList.map((t, i) => {
          return (
            <Stack flexDirection={'row'} gap={10} key={'Stack' + i} sx={{ background: '#121219', p: '10px 20px' }}>
              {Object.keys(t).map(k => (
                <>
                  <STEPNTokenTitle sx={{ width: 220, color: '#626262' }}>{k}</STEPNTokenTitle>
                  <STEPNTokenTitle sx={{ width: 'calc(100% - 220px  - 10px)', color: '#FFF' }}>{t[k]}</STEPNTokenTitle>
                </>
              ))}
            </Stack>
          )
        })}
      </Stack>
    </Box>
  )
}
function ProjectInfo({ item, isDark }: { item: IPrivatePadProp; isDark?: boolean }) {
  return <InfoList isDark={isDark} info={item.projectInfo} />
}

// function STEPNToken({ item }: { item: IPrivatePadProp }) {
//   return <></>
// }

function TokenMetrics({ item, isDark }: { item: IPrivatePadProp; isDark?: boolean }) {
  return <InfoList isDark={isDark} info={item.tokenMetrics} />
}
