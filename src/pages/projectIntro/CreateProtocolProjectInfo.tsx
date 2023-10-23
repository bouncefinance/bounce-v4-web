import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { Box } from '@mui/material'
import FooterPc from '../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from './index'
import usePoolInfo from 'bounceHooks/auction/usePoolInfo'
import UserMainBlock from 'bounceComponents/fixed-swap/MainBlock/UserMainBlock'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import ActionHistory from 'bounceComponents/fixed-swap/ActionHistory'
import { useCurrentRegionBlock } from 'state/application/hooks'
import NoService from 'components/NoService'
import useBreakpoint from 'hooks/useBreakpoint'

export default function ProjectInfo() {
  const item = PrivatePadDataList.find(i => i.keyId === 14) as IPrivatePadProp

  return (
    <Box>
      <ProjectHead item={item} />
      <UserBlock />
      <Tabs item={item} />
      <FooterPc />
    </Box>
  )
}
function UserBlock() {
  const isSm = useBreakpoint('sm')
  const { data: poolInfo, run: getPoolInfo } = usePoolInfo(18567)
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
        margin: '200px auto 0'
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
