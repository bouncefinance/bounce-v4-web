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
export const lpId = 7269

const LPToken = () => {
  const item = PrivatePadDataList.find(i => i.keyId === 23) as IPrivatePadProp
  const _chainId = ChainId.SEPOLIA
  const nftAddr = '0x1238536071E1c677A632429e3655c799b22cDA52'
  const { account } = useActiveWeb3React()
  const contract = useRandomSelectionLPContract(undefined, _chainId)
  const { data: poolInfo } = useRandomSelectionLPPoolInfo(_chainId, 21453)
  const [, approve] = useNFTApproveAllCallback(nftAddr, contract?.address)

  const clickHandler = useCallback(async () => {
    if (contract && poolInfo) {
      // await contract.creatorClaim(poolInfo.poolId)
      await contract.creatorSetFeePositionId(poolInfo.poolId, lpId)
    }
  }, [contract, poolInfo])

  const distributeHandler = useCallback(() => {
    if (contract && poolInfo) {
      contract.distributeFee(poolInfo.poolId)
    }
  }, [contract, poolInfo])

  const approveHandler = useCallback(async () => {
    approve()
  }, [approve])
  console.log('🚀 ~ approveHandler ~ approveHandler:', approveHandler)

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
        {poolInfo && account && (
          <Stack justifyContent={'center'} direction={'column'} spacing={20} alignItems={'center'}>
            <BaseButton sx={{ width: 340 }} onClick={clickHandler}>
              Creator Set TokenId
            </BaseButton>
            <BaseButton sx={{ width: 340 }} onClick={distributeHandler}>
              Distribute Fee
            </BaseButton>
            <BaseButton sx={{ width: 340 }} onClick={approveHandler}>
              NFT Approve
            </BaseButton>
          </Stack>
        )}
        <Tabs item={item} />
        <FooterPc />
      </Box>
    </Box>
  )
}
export default LPToken
