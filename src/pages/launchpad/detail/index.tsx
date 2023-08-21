import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { useRequest } from 'ahooks'
import { useQueryParams } from 'hooks/useQueryParams'
import { getUserLaunchpadInfo } from 'api/user'
import { useUserInfo } from 'state/users/hooks'
import { useMemo } from 'react'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { IPrivatePadProp, IProjectInfo } from '../PrivatePadDataList'
import { PoolType } from 'api/pool/type'
import { getLabelById, shortenAddress } from 'utils'
import { useOptionDatas } from 'state/configOptions/hooks'
import Image from 'components/Image'
import { socialMap } from 'pages/account/AccountPrivateLaunchpad'
import { ProjectHead, Tabs } from 'pages/projectIntro'
import FooterPc from 'components/Footer/FooterPc'
import { H3 } from 'components/Text'
import useBreakpoint from 'hooks/useBreakpoint'
import { useNavigate } from 'react-router-dom'
import GreenWarn from 'assets/imgs/auction/green-warn.png'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import CertifiedTokenImage from 'components/CertifiedTokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import TokenImage from 'bounceComponents/common/TokenImage'
import { useActiveWeb3React } from 'hooks'
import { addTokenToWallet } from 'utils/addTokenToWallet'
import useTokenList from 'bounceHooks/auction/useTokenList'
const LaunchpadDetail = () => {
  const { chainId } = useActiveWeb3React()
  const { id } = useQueryParams()
  const { token } = useUserInfo()
  const { data } = useRequest(
    async () => {
      const res = await getUserLaunchpadInfo({})
      return {
        list: res.data.list,
        basicInfo: res.data.basicInfo,
        total: res.data.total
      }
    },
    { ready: !!token }
  )
  const curPoolInfo = useMemo(() => {
    const pool = data?.list.find(item => item.id === Number(id))
    return pool
  }, [id, data])
  console.log('curPoolInfo')
  console.log(curPoolInfo)
  const optionDatas = useOptionDatas()
  const ethChainId = useMemo(() => {
    if (!curPoolInfo || !curPoolInfo.chainId) return undefined
    const ethChainId = getLabelById(curPoolInfo.chainId, 'ethChainId', optionDatas?.chainInfoOpt || [])
    return ethChainId
  }, [curPoolInfo, optionDatas])
  const privatePadData = useMemo<IPrivatePadProp | undefined>(() => {
    if (!curPoolInfo || !data?.basicInfo) return undefined
    const projectInfo: IProjectInfo[] = []
    if (data?.basicInfo.description) {
      projectInfo.push({
        title: `What is ${data.basicInfo.projectName}`,
        info: [data.basicInfo.description]
      })
    }
    if (data?.basicInfo.tokennomics) {
      projectInfo.push({
        title: `Tokenomics`,
        info: [data.basicInfo.tokennomics]
      })
    }
    if (data?.basicInfo.roadmap) {
      projectInfo.push({
        title: `Roadmap`,
        info: [data.basicInfo.roadmap]
      })
    }
    let social: JSX.Element[] = []
    if (data?.basicInfo.community.filter(item => !!item.communityLink)) {
      social = data?.basicInfo.community
        .filter(item => !!item.communityLink)
        .map(item => (
          <Link key={item.communityLink} href={item.communityLink} target="_blank">
            <Image width={40} height={40} src={socialMap[item.communityName]} />
          </Link>
        ))
    }
    const moreData: {
      title: string
      content: string
    }[] = []
    if (curPoolInfo.token0Name) {
      moreData.push({
        title: 'Token Name',
        content: curPoolInfo.token0Name
      })
    }
    if (curPoolInfo.ratio) {
      moreData.push({
        title: 'Token Price',
        content: curPoolInfo.ratio
      })
    }
    if (curPoolInfo.totalAmount0) {
      moreData.push({
        title: 'Token Amount',
        content: curPoolInfo.totalAmount0
      })
    }
    if (curPoolInfo.chainId) {
      const ethChainName = getLabelById(curPoolInfo.chainId, 'chainName', optionDatas?.chainInfoOpt || [])
      moreData.push({
        title: 'Token Amount',
        content: ethChainName
      })
    }
    const privateDate: IPrivatePadProp = {
      keyId: curPoolInfo.id,
      liveTimeStamp: {
        start: curPoolInfo.openAt || 0,
        end: curPoolInfo.closeAt || 0
      },
      poolTypeName: curPoolInfo.category ? PoolType[curPoolInfo.category] : '',
      img: curPoolInfo.picture1,
      avatar: data?.basicInfo.projectLogo || '',
      title: data?.basicInfo.projectName || '',
      desc: data?.basicInfo.description || '',
      chainId: ethChainId,
      tokenName: curPoolInfo.token0Name || '',
      projectInfo: projectInfo,
      tokenMetrics: [],
      social: social,
      moreData: moreData
    }
    return privateDate
  }, [curPoolInfo, data, ethChainId, optionDatas])
  console.log('privatePadData')
  console.log(privatePadData)
  console.log(!curPoolInfo || !privatePadData)
  const isSm = useBreakpoint('sm')
  const navigate = useNavigate()
  const { tokenList } = useTokenList(ethChainId, 2, '', true)
  const curToken1 = tokenList.find(item => item.address === curPoolInfo?.token1)
  console.log('tokenList')
  console.log(tokenList)

  if (!curPoolInfo || !privatePadData) {
    return (
      <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BounceAnime />
      </Box>
    )
  }
  return (
    <Box>
      <ProjectHead item={privatePadData} />
      <Box sx={{ background: '#F6F7F3', marginTop: 50, padding: 80 }}>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <H3 sx={{ color: '#121212', fontSize: isSm ? 22 : 36 }}>Join The Pool</H3>
          <Box
            onClick={() => navigate('/account/private_launchpad')}
            sx={{
              width: 'max-content',
              padding: '12px 24px',
              color: '#171717',
              fontSize: 14,
              fontFamily: 'Inter',
              borderRadius: 100,
              border: '1px solid #20201E',
              cursor: 'pointer',
              background: 'transparent',
              '&:hover': {
                background: '#E1F25C',
                transition: 'all .5s'
              }
            }}
          >
            My private launchpad
          </Box>
        </Stack>
        {/*
        UserBlock：1. not on chain 2. on chain
        */}
        {/* not ont chain */}
        {curPoolInfo && privatePadData && (
          <Stack
            my={40}
            sx={{
              maxWidth: '1296px',
              gap: 24,
              margin: '0 auto 40px',
              padding: isSm ? 20 : '48px 56px',
              background: '#FFF',
              borderRadius: 24
            }}
          >
            <Stack
              mt={32}
              sx={{
                padding: 16,
                background: '#F9FCDE',
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16
              }}
            >
              <Image src={GreenWarn} style={{ width: 27, height: 24 }} />
              <Typography
                sx={{
                  maxWidth: '100%',
                  color: '#908E96',
                  leadingTrim: 'both',
                  textEdge: 'cap',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%'
                }}
              >
                <span style={{ color: '#171717' }}>Please pay attention.</span> Check the auction creator, token
                contract and price. Bounce auction is a decentralized tool where anyone can launch.
              </Typography>
            </Stack>
            <Stack>
              {/* left box */}
              <Box sx={{ borderRadius: 20, bgcolor: '#F5F5F5', px: 16, py: 36, flex: 1, height: 'fit-content' }}>
                <Stack spacing={36}>
                  <Stack spacing={10}>
                    <Typography variant="h6" sx={{ mb: 10 }}>
                      Token Information
                    </Typography>

                    <PoolInfoItem title="Contract Address" tip="Token Contract Address.">
                      <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                        {curPoolInfo.token0 && (
                          <>
                            <CertifiedTokenImage
                              address={curPoolInfo?.token0}
                              ethChainId={ethChainId}
                              backedChainId={curPoolInfo.chainId}
                              coingeckoId={''}
                            />

                            <Typography>{shortenAddress(curPoolInfo.token0)}</Typography>

                            <CopyToClipboard text={curPoolInfo.token0} />
                          </>
                        )}
                        {!curPoolInfo.token0 && '-- -- --'}
                      </Stack>
                    </PoolInfoItem>

                    <PoolInfoItem title="Token Symbol">
                      <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                        {curPoolInfo.token0Logo && (
                          <TokenImage src={curPoolInfo.token0Logo as string} alt={curPoolInfo.token0Name} size={20} />
                        )}
                        {!curPoolInfo.token0Logo && '--'}
                        {curPoolInfo.token0Symbol && <Typography>{curPoolInfo.token0Symbol}</Typography>}
                        {!curPoolInfo.token0Symbol && '--'}
                      </Stack>
                    </PoolInfoItem>
                    {ethChainId &&
                      chainId === ethChainId &&
                      curPoolInfo.token0 &&
                      curPoolInfo.token0Symbol &&
                      curPoolInfo.token0Decimals && (
                        <Button
                          variant="outlined"
                          onClick={() =>
                            addTokenToWallet(
                              curPoolInfo.token0 as string,
                              curPoolInfo.token0Symbol as string,
                              curPoolInfo.token0Decimals as number
                            )
                          }
                          sx={{
                            width: 140,
                            height: 20
                          }}
                        >
                          Add To Wallet
                        </Button>
                      )}
                  </Stack>

                  <Stack spacing={10}>
                    <Typography variant="h6" sx={{ mb: 10 }}>
                      Auction Information
                    </Typography>
                    <PoolInfoItem title="Auction Type">Fixed-Price</PoolInfoItem>
                    <PoolInfoItem title="Participant">
                      {curPoolInfo.whitelistEnabled ? 'Whitelist' : 'Public'}
                    </PoolInfoItem>
                    <PoolInfoItem title="Allocation per Wallet">
                      {Number(curPoolInfo.maxAmount1PerWallet) > 0
                        ? Number(curPoolInfo.maxAmount1PerWallet) + ' ' + curToken1?.symbol
                        : 'No Limit'}
                    </PoolInfoItem>
                    {/* <PoolInfoItem title="Total available Amount">
                      {poolInfo.currencyAmountTotal0.toSignificant()} {poolInfo.token0.symbol}
                    </PoolInfoItem>
                    <PoolInfoItem title="Price per unit, $">
                      {new BigNumber(poolInfo.poolPrice).decimalPlaces(6, BigNumber.ROUND_DOWN).toFormat()}
                    </PoolInfoItem> */}
                  </Stack>
                  {/*
                <Box>
                  <PoolInfoItem title="Progress">
                    <Box>
                      <Typography component="span" sx={{ color: AuctionProgressPrimaryColor[poolInfo.status] }}>
                        {poolInfo.currencySwappedAmount0.toSignificant()} {poolInfo.token0.symbol}
                      </Typography>
                      <Typography component="span">
                        &nbsp;/ {poolInfo.currencyAmountTotal0.toSignificant()} {poolInfo.token0.symbol}
                      </Typography>
                    </Box>
                  </PoolInfoItem>

                  <PoolProgress value={swapedPercent} sx={{ mt: 12 }} poolStatus={poolInfo.status} />
                </Box>
               */}
                </Stack>
              </Box>
            </Stack>
          </Stack>
        )}
        <Tabs item={privatePadData} />
      </Box>
      <FooterPc />
    </Box>
  )
}

export default LaunchpadDetail
