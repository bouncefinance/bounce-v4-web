import { IBasicInfoParams, IPoolInfoParams } from '../create-launchpad/type'
import { Box, Link, Stack } from '@mui/material'
import { useMemo } from 'react'
import { IPrivatePadProp, IPrivatePricesInfo, IProjectInfo } from '../PrivatePadDataList'
import { PoolType } from 'api/pool/type'
import { getLabelById } from 'utils'
import { useOptionDatas } from 'state/configOptions/hooks'
import Image from 'components/Image'
import { socialMap } from 'pages/account/AccountPrivateLaunchpad'
import { ProjectHead, Tabs } from 'pages/projectIntro'
import FooterPc from 'components/Footer/FooterPc'
import { H3 } from 'components/Text'
import useBreakpoint from 'hooks/useBreakpoint'
import { useNavigate } from 'react-router-dom'

import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import NoService from 'components/NoService'
import usePoolInfo from 'bounceHooks/auction/usePoolInfo'
import UserMainBlock from 'bounceComponents/fixed-swap/MainBlock/UserMainBlock'

import ActionHistory from 'bounceComponents/fixed-swap/ActionHistory'
import { useCurrentRegionBlock } from 'state/application/hooks'

import { PoolStatus } from 'pages/launchpad/create-launchpad/type'
interface IShowProps {
  basicInfo: IBasicInfoParams
  poolInfo?: IPoolInfoParams
  isPooleEmpty?: boolean
  poolListEl?: JSX.Element
}

const ShowLaunchpad = ({ basicInfo, poolInfo, isPooleEmpty = false, poolListEl }: IShowProps) => {
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
    const privatePrices: IPrivatePricesInfo[] = []
    const moreData: {
      title: string
      content: string
    }[] = []
    if (poolInfo.token0Name) {
      moreData.push({
        title: 'Token Name',
        content: poolInfo.token0Name
      })
      privatePrices.push({
        title: 'Token Name',
        value: poolInfo.token0Name
      })
    }
    if (poolInfo.ratio) {
      moreData.push({
        title: 'Token Price',
        content: poolInfo.ratio
      })
      privatePrices.push({
        title: 'Token Price',
        value: poolInfo.ratio || '--'
      })
    }
    if (poolInfo.totalAmount0) {
      moreData.push({
        title: 'Token Amount',
        content: poolInfo.totalAmount0
      })
      privatePrices.push({
        title: 'Token Amount',
        value: poolInfo.totalAmount0 || '--'
      })
    }
    if (poolInfo.chainId) {
      const ethChainName = getLabelById(poolInfo.chainId, 'chainName', optionDatas?.chainInfoOpt || [])
      moreData.push({
        title: 'Blockchain',
        content: ethChainName
      })
      privatePrices.push({
        title: 'Blockchain',
        value: ethChainName || '--'
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
      moreData: moreData,
      privatePrices: privatePrices
    }
    return privateDate
  }, [poolInfo, basicInfo, ethChainId, optionDatas])
  const isSm = useBreakpoint('sm')
  const navigate = useNavigate()
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
      {!!poolInfo && !poolListEl && poolInfo.status === PoolStatus.On_Chain && poolInfo.poolsId && (
        <Box sx={{ background: '#F6F7F3', marginTop: 50, padding: 80 }}>
          {
            <>
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
              <UserBlock backedId={Number(poolInfo.poolsId)} />
            </>
          }
        </Box>
      )}
      {/* {isPooleEmpty && <Box>111</Box>} */}
      <Tabs item={privatePadData} />
      {!!poolListEl && poolListEl}
      <FooterPc />
    </Box>
  )
}
function UserBlock({ backedId }: { backedId: number }) {
  const isSm = useBreakpoint('sm')
  const { data: poolInfo, run: getPoolInfo } = usePoolInfo(backedId)
  const isBlock = useCurrentRegionBlock(poolInfo?.ethChainId, poolInfo?.poolId)

  if (isBlock) {
    return <NoService />
  }

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
        maxWidth: '1296px',
        margin: '0 auto'
      }}
    >
      <UserMainBlock
        style={{
          maxWidth: '1296px',
          margin: '0 auto 40px',
          padding: isSm ? 20 : '48px 56px'
        }}
        poolInfo={poolInfo}
        getPoolInfo={getPoolInfo}
      />
      <ActionHistory backedChainId={poolInfo.chainId} category={poolInfo.category} poolId={poolInfo.poolId} />
    </Box>
  )
}
export default ShowLaunchpad
