import { Box, Button, Container, Stack, Typography, styled, Pagination } from '@mui/material'
import { Add } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import { useEffect, useState } from 'react'
import tabStyles from './tabStyles'
import ChainSelect from 'bounceComponents/common/ChainSelect'
import AuctionTypeSelect from 'bounceComponents/common/AuctionTypeSelect'
import { PoolType } from 'api/pool/type'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import useBreakpoint from 'hooks/useBreakpoint'
import { usePagination } from 'ahooks'
import { getUserLaunchpadInfo } from 'api/user'
import { Params } from 'ahooks/lib/usePagination/types'
import { getLabelById } from 'utils'
import { useActiveWeb3React } from 'hooks'
import { useOptionDatas } from 'state/configOptions/hooks'
import { IBasicInfoParams, IPoolInfoParams } from 'pages/launchpad/create-launchpad/type'
import Twitter from 'assets/imgs/auction/round-icon-twitter.svg'
import Telegram from 'assets/imgs/common/Telegram.png'
import Facebook from 'assets/imgs/common/Facebook-Blue-Logo.svg'
import YouTube from 'assets/imgs/common/YouTube-Icon-Full.svg'
import Medium from 'assets/imgs/common/Medium.png'
import Discord from 'assets/socialLinksIcon/Discord.svg'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import EmptyData from 'bounceComponents/common/EmptyData'

import LaunchpadMark from 'bounceComponents/pre-launchpad/LaunchpadMark'
enum ETabList {
  All = 'All',
  Upcoming = 'Upcoming',
  Live = 'Live',
  Close = 'Close'
}
export enum CardSize {
  Small = 1,
  Medium = 2,
  Large = 3
}

export const socialMap: { [key: string]: string } = {
  twitter: Twitter,
  telegram: Telegram,
  facebook: Facebook,
  youTube: YouTube,
  medium: Medium,
  discord: Discord
}

const tabList = [ETabList.All, ETabList.Close, ETabList.Live, ETabList.Upcoming]

const defaultPageSize = 4
export default function AccountPrivateLaunchpad() {
  const [curTab, setCurTab] = useState(ETabList.All)
  const [curChain, setCurChain] = useState(0)
  const [curPoolType, setCurPoolType] = useState<PoolType | 0>(0)
  const navigate = useNavigate()
  const { account } = useActiveWeb3React()
  const optionDatas = useOptionDatas()
  const isSm = useBreakpoint('sm')

  const {
    loading,
    data,
    pagination,
    run: getLaunchpadInfo
  } = usePagination<any, Params>(
    async ({ current, pageSize }) => {
      const chainInfoOptId = optionDatas?.chainInfoOpt?.find(item => item.ethChainId === curChain)
      if (!account) {
        return {
          total: 0,
          list: [],
          basicInfo: {}
        }
      }
      const res = await getUserLaunchpadInfo({
        limit: pageSize,
        offset: (current - 1) * pageSize,
        chainId: chainInfoOptId?.id,
        category: curPoolType
      })
      return {
        list: res.data.list.map(i => {
          const ethChainId = getLabelById(i.chainId, 'ethChainId', optionDatas?.chainInfoOpt || [])
          return { ...i, chainId: ethChainId, opId: i.chainId }
        }),
        total: res.data.total,
        basicInfo: res.data.basicInfo as IBasicInfoParams
      }
    },
    {
      defaultPageSize,
      ready: !!account,
      refreshDeps: [account, curChain, curPoolType],
      debounceWait: 100
    }
  )
  const handlePageChange = (_: any, p: number) => {
    pagination.changeCurrent(p)
  }
  useEffect(() => {
    pagination.changeCurrent(1)
    console.log('curPoolType', curPoolType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, curPoolType, curChain])
  return (
    <AccountLayout>
      <Box padding="40px 20px">
        <Container
          sx={{
            maxWidth: '1080px !important',
            position: 'relative'
          }}
        >
          <Typography variant="h3" fontSize={isSm ? 22 : 36} fontFamily={'Public Sans'} fontWeight={600}>
            Private Launchpad
          </Typography>
          <Row sx={{ justifyContent: 'flex-start' }} mt={28}>
            {tabList.map((item, index) => (
              <Typography
                onClick={() => setCurTab(item)}
                sx={{
                  ...tabStyles.menu,
                  ...(item === curTab ? tabStyles.menuActive : ({} as any)),
                  padding: '16px 32px 12px 32px',
                  fontFamily: 'Public Sans',
                  borderRadius: '12px 12px 0px 0px'
                }}
                key={index}
              >
                {item}
              </Typography>
            ))}
          </Row>
          <Box
            sx={{
              height: '100%',
              padding: '48px 40px',
              background: '#F6F6F3'
            }}
          >
            <Row sx={{ justifyContent: 'space-between' }}>
              <Row sx={{ gap: 8 }}>
                <AuctionTypeSelect curPoolType={curPoolType} setCurPoolType={v => setCurPoolType(v)} />
                <ChainSelect curChain={curChain} setCurChain={i => setCurChain(i)} />
              </Row>
              <Stack flexDirection={'row'} gap={20}>
                <Button
                  sx={{ height: 44 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`${routes.thirdPart.CreateLaunchpad}?tab=1`)}
                >
                  <EditIcon /> Edit BasicInfo
                </Button>
                <Button
                  sx={{ height: 44 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(routes.thirdPart.CreateLaunchpad)}
                >
                  <Add /> Create a pool
                </Button>
              </Stack>
            </Row>
            {loading ? (
              <Box
                sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <BounceAnime />
              </Box>
            ) : !loading && data && data.list.length > 0 ? (
              <>
                <Stack sx={{ flexDirection: 'column', gap: 48 }}>
                  {data?.list.map((item: IPoolInfoParams & { opId?: number }) => (
                    <LaunchpadMark
                      key={item.id}
                      poolInfo={item}
                      basicInfo={data.basicInfo}
                      getInfo={() => getLaunchpadInfo({ current: pagination.current, pageSize: pagination.pageSize })}
                      size={CardSize.Small}
                    />
                  ))}
                </Stack>
                <Stack mt={48} alignItems={'center'}>
                  <Pagination
                    onChange={handlePageChange}
                    page={pagination.current}
                    count={Math.ceil((data?.total || 0) / (defaultPageSize || 0))}
                  />
                </Stack>
              </>
            ) : (
              <EmptyData />
            )}
          </Box>
        </Container>
      </Box>
    </AccountLayout>
  )
}

const Row = styled(Box)({
  display: 'flex',
  flexDirection: 'row'
})
export const RoundedBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '2px 9px',
  background: 'rgba(18, 18, 18, 0.60)',
  borderRadius: 62
})
export const SansTitle = styled(Typography)({
  color: '#121212',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '150%',
  letterSpacing: -0.2,
  wordBreak: 'break-all'
})
export const InterTitle = styled(Typography)({
  color: '#121212',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '150%',
  fontFeatureSettings: 'calt',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textEdge: 'cap',
  textTransform: 'lowercase',
  leadingTrim: 'both'
})
