import { Box } from '@mui/material'
import FooterPc from 'components/Footer/FooterPc'
import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { ProjectHead, Tabs } from 'pages/projectIntro'
import AuctionCard from './auctionCard'
import LPPoolCard from './components/LPPoolCard'
import PoolStepper from './components/Stepper'
import { ChainId } from 'constants/chain'
import useRandomSelectionLPPoolInfo from 'bounceHooks/auction/useRandomSelectionLPPoolInfo'
import { useActiveWeb3React } from 'hooks'
import { BaseButton } from './components/poolDetail/AuctionButtons'
import { useRandomSelectionLPContract } from 'hooks/useContract'
import { useCallback } from 'react'
export const lpId = 7204

const LPToken = () => {
  const item = PrivatePadDataList.find(i => i.keyId === 23) as IPrivatePadProp
  const _chainId = ChainId.SEPOLIA
  const { account } = useActiveWeb3React()
  const contract = useRandomSelectionLPContract(undefined, _chainId)
  const { data: poolInfo } = useRandomSelectionLPPoolInfo(_chainId, 21428)

  const clickHandler = useCallback(async () => {
    if (contract && poolInfo) {
      // await contract.creatorClaim(poolInfo.poolId)
      await contract.creatorSetFeePositionId(poolInfo.poolId, lpId)
    }
  }, [contract, poolInfo])
  return (
    <Box>
      <Box>
        <ProjectHead item={item} />
        {poolInfo && (
          <>
            <AuctionCard poolInfo={poolInfo} />
            <PoolStepper poolInfo={poolInfo} />
          </>
        )}
        {poolInfo && <LPPoolCard poolInfo={poolInfo} />}
        {poolInfo && account && account.toLocaleUpperCase() === poolInfo.creator.toLocaleUpperCase() && (
          <BaseButton onClick={clickHandler}>Creator Set TokenId</BaseButton>
        )}
        <Tabs item={item} />
        <FooterPc />
      </Box>
    </Box>
  )
}
export default LPToken
