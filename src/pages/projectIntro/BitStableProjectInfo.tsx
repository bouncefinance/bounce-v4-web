import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { Box } from '@mui/material'
import FooterPc from '../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from './index'
import useBreakpoint from 'hooks/useBreakpoint'
import usePoolInfo from 'bounceHooks/auction/usePoolInfo'
import NoService from 'components/NoService'
import { useCurrentRegionBlock } from 'state/application/hooks'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import UserMainBlock from 'bounceComponents/fixed-swap/MainBlock/UserMainBlock'
import ActionHistory from 'bounceComponents/fixed-swap/ActionHistory'

export default function ProjectInfo() {
  const item = PrivatePadDataList.find(i => i.keyId === 17) as IPrivatePadProp

  return (
    <Box>
      <ProjectHead item={item} />
      {item.backedId && <UserBlock backedId={item.backedId} />}
      <Tabs item={item} />
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
