import { IBasicInfoParams, IPoolInfoParams } from '../create-launchpad/type'
import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { IPrivatePadProp, IProjectInfo } from '../PrivatePadDataList'
import { PoolStatus, PoolType } from 'api/pool/type'
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
import { addTokenToWallet } from 'utils/addTokenToWallet'
import useTokenList from 'bounceHooks/auction/useTokenList'
import { AuctionProgressPrimaryColor } from 'constants/auction/color'
import PoolProgress from 'bounceComponents/common/PoolProgress'
import { formatNumber } from 'utils/number'
import NoData from 'bounceComponents/common/NoData'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useActiveWeb3React } from 'hooks'
interface IShowProps {
  basicInfo: IBasicInfoParams
  poolInfo?: IPoolInfoParams
  isPooleEmpty?: boolean
  poolListEl?: JSX.Element
}

const ShowLaunchpad = ({ basicInfo, poolInfo, isPooleEmpty = false, poolListEl }: IShowProps) => {
  const { chainId } = useActiveWeb3React()
  const optionDatas = useOptionDatas()
  const ethChainId = useMemo(() => {
    if (!poolInfo || !poolInfo.chainId) return undefined
    const ethChainId = getLabelById(poolInfo.chainId, 'ethChainId', optionDatas?.chainInfoOpt || [])
    return ethChainId
  }, [poolInfo, optionDatas])
  const privatePadData = useMemo<IPrivatePadProp | undefined>(() => {
    if (!poolInfo || !basicInfo) return undefined
    const projectInfo: IProjectInfo[] = []
    if (basicInfo.description) {
      projectInfo.push({
        title: `What is ${basicInfo.projectName}`,
        info: [basicInfo.description]
      })
    }
    if (basicInfo.tokennomics) {
      projectInfo.push({
        title: `Tokenomics`,
        info: [basicInfo.tokennomics]
      })
    }
    if (basicInfo.roadmap) {
      projectInfo.push({
        title: `Roadmap`,
        info: [basicInfo.roadmap]
      })
    }
    let social: JSX.Element[] = []
    if (basicInfo.community.filter(item => !!item.communityLink)) {
      social = basicInfo.community
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
    if (poolInfo.token0Name) {
      moreData.push({
        title: 'Token Name',
        content: poolInfo.token0Name
      })
    }
    if (poolInfo.ratio) {
      moreData.push({
        title: 'Token Price',
        content: poolInfo.ratio
      })
    }
    if (poolInfo.totalAmount0) {
      moreData.push({
        title: 'Token Amount',
        content: poolInfo.totalAmount0
      })
    }
    if (poolInfo.chainId) {
      const ethChainName = getLabelById(poolInfo.chainId, 'chainName', optionDatas?.chainInfoOpt || [])
      moreData.push({
        title: 'Token Amount',
        content: ethChainName
      })
    }
    const privateDate: IPrivatePadProp = {
      keyId: poolInfo.id,
      liveTimeStamp: {
        start: poolInfo.openAt || 0,
        end: poolInfo.closeAt || 0
      },
      poolTypeName: poolInfo.category ? PoolType[poolInfo.category] : '',
      img: poolInfo.picture1,
      avatar: basicInfo.projectLogo || '',
      title: basicInfo.projectName || '',
      desc: basicInfo.description || '',
      chainId: ethChainId,
      tokenName: poolInfo.token0Name || '',
      projectInfo: projectInfo,
      tokenMetrics: [],
      social: social,
      moreData: moreData
    }
    return privateDate
  }, [poolInfo, basicInfo, ethChainId, optionDatas])
  const isSm = useBreakpoint('sm')
  const navigate = useNavigate()
  const { tokenList } = useTokenList(ethChainId, 2, '', true)
  const curToken1 = tokenList.find(item => item.address === poolInfo?.token1)
  if (!privatePadData) {
    return (
      <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BounceAnime />
      </Box>
    )
  }
  return (
    <Box>
      <ProjectHead item={privatePadData} />
      {!!poolInfo && !poolListEl && (
        <Box sx={{ background: '#F6F7F3', marginTop: 50, padding: 80 }}>
          <Stack
            sx={{
              maxWidth: '1296px',
              margin: '0 auto',
              marginBottom: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
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
          {poolInfo && privatePadData && (
            <Box sx={{ maxWidth: '1296px', margin: '0 auto' }}>
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
                <Box sx={{ display: 'flex', columnGap: 12, flexWrap: 'wrap', minWidth: '300px' }}>
                  {/* left box */}
                  <Box sx={{ borderRadius: 20, bgcolor: '#F5F5F5', px: 16, py: 36, flex: 1, height: 'fit-content' }}>
                    <Stack spacing={36}>
                      <Stack spacing={10}>
                        <Typography variant="h6" sx={{ mb: 10 }}>
                          Token Information
                        </Typography>

                        <PoolInfoItem title="Contract Address" tip="Token Contract Address.">
                          <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                            {poolInfo.token0 && (
                              <>
                                <CertifiedTokenImage
                                  address={poolInfo?.token0}
                                  ethChainId={ethChainId}
                                  backedChainId={poolInfo.chainId}
                                  coingeckoId={''}
                                />

                                <Typography>{shortenAddress(poolInfo.token0)}</Typography>

                                <CopyToClipboard text={poolInfo.token0} />
                              </>
                            )}
                            {!poolInfo.token0 && '-- -- --'}
                          </Stack>
                        </PoolInfoItem>

                        <PoolInfoItem title="Token Symbol">
                          <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                            {poolInfo.token0Logo && (
                              <TokenImage src={poolInfo.token0Logo as string} alt={poolInfo.token0Name} size={20} />
                            )}
                            {!poolInfo.token0Logo && '--'}
                            {poolInfo.token0Symbol && <Typography>{poolInfo.token0Symbol}</Typography>}
                            {!poolInfo.token0Symbol && '--'}
                          </Stack>
                        </PoolInfoItem>
                        {ethChainId &&
                          chainId === ethChainId &&
                          poolInfo.token0 &&
                          poolInfo.token0Symbol &&
                          poolInfo.token0Decimals && (
                            <Button
                              variant="outlined"
                              onClick={() =>
                                addTokenToWallet(
                                  poolInfo.token0 as string,
                                  poolInfo.token0Symbol as string,
                                  poolInfo.token0Decimals as number
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
                          {poolInfo.whitelistEnabled ? 'Whitelist' : 'Public'}
                        </PoolInfoItem>
                        <PoolInfoItem title="Allocation per Wallet">
                          {Number(poolInfo.maxAmount1PerWallet) > 0
                            ? Number(poolInfo.maxAmount1PerWallet) + ' ' + curToken1?.symbol
                            : 'No Limit'}
                        </PoolInfoItem>
                        <PoolInfoItem title="Total available Amount">
                          {poolInfo.totalAmount0} {poolInfo.token0Symbol}
                        </PoolInfoItem>
                        <PoolInfoItem title="Price per unit, $">
                          {/* {new BigNumber(poolInfo.poolPrice).decimalPlaces(6, BigNumber.ROUND_DOWN).toFormat()} */}0
                        </PoolInfoItem>
                      </Stack>

                      <Box>
                        <PoolInfoItem title="Progress">
                          <Box>
                            <Typography
                              component="span"
                              sx={{ color: AuctionProgressPrimaryColor[PoolStatus.Upcoming] }}
                            >
                              0 {poolInfo.token0Symbol}
                            </Typography>
                            <Typography component="span">
                              &nbsp;/ {poolInfo.totalAmount0} {poolInfo.token0Symbol}
                            </Typography>
                          </Box>
                        </PoolInfoItem>
                        <PoolProgress value={0} sx={{ mt: 12 }} poolStatus={PoolStatus.Upcoming} />
                      </Box>
                    </Stack>
                  </Box>
                  {/* right box */}
                  <Box sx={{ flex: 1, pt: 28 }}>
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <Typography variant="h2">{'Join The Pool'}</Typography>
                      <Box
                        style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          background: '#E6E6E6',
                          borderRadius: 20
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="var(--ps-gray-600)"
                          fontSize={12}
                          component="span"
                          style={{
                            marginRight: '5px'
                          }}
                        >
                          Upcoming
                        </Typography>
                      </Box>
                    </Box>
                    <Stack spacing={10} sx={{ mt: 24 }}>
                      <PoolInfoItem title="Bid swap ratio">
                        <Stack direction="row" spacing={8}>
                          <Typography>1</Typography>
                          <TokenImage
                            alt={poolInfo.token0Symbol}
                            src={(poolInfo.token0Logo as string) || ''}
                            size={20}
                          />
                          <Typography>
                            {poolInfo.token0Symbol} = {formatNumber(poolInfo.ratio, { unit: 0 })}
                          </Typography>
                          <TokenImage alt={curToken1?.symbol} src={curToken1?.logoURI} size={20} />
                          <Typography>{curToken1?.symbol}</Typography>
                        </Stack>
                      </PoolInfoItem>

                      <PoolInfoItem title="Successful bid amount" tip="The amount of token you successfully secured.">
                        <Stack direction="row" spacing={6}>
                          <Typography>{'0'}</Typography>
                          <TokenImage
                            alt={poolInfo.token0Symbol}
                            src={(poolInfo.token0Logo as string) || ''}
                            size={20}
                          />
                          <Typography>{poolInfo.token0Symbol}</Typography>
                        </Stack>
                      </PoolInfoItem>

                      <PoolInfoItem title="Creator wallet address">
                        <Stack direction="row" spacing={6}>
                          <Typography>{shortenAddress((poolInfo.creator as string) || '')}</Typography>
                          <CopyToClipboard text={(poolInfo.creator as string) || ''} />
                        </Stack>
                      </PoolInfoItem>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
              <Box sx={{ borderRadius: 20, px: 12, py: 20, bgcolor: '#fff' }}>
                <Typography variant="h2" sx={{ ml: 12 }}>
                  Auction History
                </Typography>
                <Box sx={{ width: '100%' }}>
                  <NoData />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
      {isPooleEmpty && <Box>111</Box>}
      <Tabs item={privatePadData} />
      {!!poolListEl && poolListEl}
      <FooterPc />
    </Box>
  )
}
export default ShowLaunchpad
