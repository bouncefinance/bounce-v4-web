import { Box, Stack } from '@mui/material'
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
import { useNFTApproveAllCallback } from 'hooks/useNFTApproveAllCallback'
import useBreakpoint from 'hooks/useBreakpoint'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'

const LPToken = () => {
  const item = PrivatePadDataList.find(i => i.keyId === 27) as IPrivatePadProp
  const _chainId = ChainId.MAINNET
  const nftAddr = '0xc36442b4a4522e871399cd717abdd847ab11fe88'
  const { account } = useActiveWeb3React()
  const contract = useRandomSelectionLPContract(undefined, _chainId)
  const { data: poolInfo } = useRandomSelectionLPPoolInfo(_chainId, item.backedId)
  const [, approve] = useNFTApproveAllCallback(nftAddr, contract?.address)

  const clickHandler = useCallback(async () => {
    if (contract && poolInfo && poolInfo.positionId) {
      await contract.creatorSetFeePositionId(poolInfo.poolId, 649834)
    }
  }, [contract, poolInfo])

  const distributeHandler = useCallback(() => {
    if (contract && poolInfo) {
      contract.distributeFee(poolInfo.poolId)
    }
  }, [contract, poolInfo])

  const claimHandler = useCallback(() => {
    if (contract && poolInfo) {
      contract.creatorClaim(poolInfo.poolId)
    }
  }, [contract, poolInfo])

  const approveHandler = useCallback(async () => {
    approve()
  }, [approve])
  const isSm = useBreakpoint('sm')
  return (
    <Box sx={{ background: '#F6F6F3' }}>
      <Box>
        <ProjectHead item={item} />
        {!poolInfo && (
          <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <BounceAnime />
          </Box>
        )}
        {poolInfo && (
          <>
            <AuctionCard poolInfo={poolInfo} />
            <PoolStepper poolInfo={poolInfo} />
          </>
        )}
        {poolInfo && poolInfo.positionId && <LPPoolCard poolInfo={poolInfo} />}
        {poolInfo && account && account.toLocaleUpperCase() === poolInfo.creator.toLocaleUpperCase() && (
          <Stack justifyContent={'center'} direction={'column'} spacing={20} alignItems={'center'}>
            <BaseButton sx={{ width: 340 }} onClick={clickHandler}>
              Creator Set TokenId
            </BaseButton>
            <BaseButton sx={{ width: 340 }} onClick={claimHandler}>
              Creator Claim
            </BaseButton>
            <BaseButton sx={{ width: 340 }} onClick={distributeHandler}>
              Distribute Fee
            </BaseButton>
            <BaseButton sx={{ width: 340 }} onClick={approveHandler}>
              NFT Approve
            </BaseButton>
          </Stack>
        )}
        <Box mt={isSm ? '-168px' : 0} sx={{ width: '100%', background: '#F6F6F3' }}>
          <Tabs item={item} />
        </Box>
        <FooterPc />
      </Box>
    </Box>
  )
}
export default LPToken
