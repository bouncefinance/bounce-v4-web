import { ProjectHead, Tabs } from 'pages/projectIntro'
import { PrivateStakeAuctionData } from 'pages/launchpad/PrivatePadDataList'
import FooterPc from 'components/Footer/FooterPc'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { useStakeTokenContract } from 'hooks/useContract'
import { ApprovalState } from 'hooks/useTokenTimelock'
import { useActiveWeb3React } from 'hooks'
import { STAKE_TOKEN_CONTRACT_ADDRESSES } from 'constants/index'
import { ChainId } from 'constants/chain'
import { Steps } from './Step'
import { useGetStakingAuctionInfo, useTokenInfo } from './useStakingInfo'

const Page = () => {
  const poolId = 1
  const { account } = useActiveWeb3React()
  const chainId = ChainId.MAINNET
  // const chainId = ChainId.SEPOLIA
  const contract = useStakeTokenContract(chainId)
  const { token0Amount: token0, token1 } = useTokenInfo()
  const [approvalState, approveCallback] = useApproveCallback(token0, STAKE_TOKEN_CONTRACT_ADDRESSES[chainId])
  console.log('🚀 ~ file: index.tsx:21 ~ Page ~ approvalState:', approvalState)
  const coinInfo = useGetStakingAuctionInfo(contract, poolId, account)

  const params: any = [
    token0?.currency.address,
    token1.address,
    '200000000000000000000000000',
    '18750000000000000000000',
    1702645200,
    1702818000,
    1702818000,
    1
  ]

  const createPool = async () => {
    if (approvalState !== ApprovalState.APPROVED) {
      await approveCallback()
    }
    await contract?.create(params)
  }
  console.log('createPool', createPool, approvalState)

  return (
    <>
      <ProjectHead item={PrivateStakeAuctionData} />
      <div style={{ background: '#f5f5f1' }}>
        <Steps coinInfo={coinInfo} contract={contract} poolId={poolId} />
      </div>
      {/* <button onClick={() => createPool()}>create</button> */}
      <Tabs item={PrivateStakeAuctionData} />
      <FooterPc />
    </>
  )
}
export default Page
