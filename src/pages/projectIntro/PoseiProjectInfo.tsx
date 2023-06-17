import { IPrivatePadProp, PrivatePadList } from '../launchpad'
import { Box } from '@mui/material'
import FooterPc from '../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from './index'
import usePoolInfo from 'bounceHooks/auction/usePoolInfo'
import UserMainBlock from 'bounceComponents/fixed-swap/MainBlock/UserMainBlock'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import ActionHistory from 'bounceComponents/fixed-swap/ActionHistory'

export function ProjectInfo() {
  const item = PrivatePadList.find(i => i.keyId === 2) as IPrivatePadProp

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
  const { data: poolInfo, run: getPoolInfo } = usePoolInfo()
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
      {/* <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: 36,
          marginBottom: 44
        }}
      >
        Join The Pool
      </Typography> */}
      <UserMainBlock
        style={{
          maxWidth: '1296px',
          margin: '0 auto 40px',
          padding: '48px 56px'
        }}
        poolInfo={poolInfo}
        getPoolInfo={getPoolInfo}
      />
      <ActionHistory backedChainId={poolInfo.chainId} category={poolInfo.category} poolId={poolInfo.poolId} />
    </Box>
  )
}
