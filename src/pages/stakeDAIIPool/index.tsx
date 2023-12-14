import { ProjectHead, Tabs } from 'pages/projectIntro'
import { PrivateStakeDaiiData } from 'pages/launchpad/PrivatePadDataList'
import FooterPc from 'components/Footer/FooterPc'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { useStakeTokenContract } from 'hooks/useContract'
import { ApprovalState } from 'hooks/useTokenTimelock'
import { useActiveWeb3React } from 'hooks'
import { STAKE_TOKEN_CONTRACT_ADDRESSES } from 'constants/index'
import { ChainId } from 'constants/chain'
import { Steps } from './Step'
import { useGetStakingDaiiInfo, useTokenInfo } from './useStakingInfo'

const Page = () => {
  const poolId = 2
  const { account } = useActiveWeb3React()
  const chainId = ChainId.MAINNET
  const contract = useStakeTokenContract(chainId)
  const { token0Amount: token0, token1 } = useTokenInfo()
  const [approvalState, approveCallback] = useApproveCallback(token0, STAKE_TOKEN_CONTRACT_ADDRESSES[chainId])
  const coinInfo = useGetStakingDaiiInfo(contract, poolId, account)

  const params: any = [
    token0?.currency.address,
    token1.address,
    '100000000000000000000000000',
    '150000000000000000000000',
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
      <ProjectHead item={PrivateStakeDaiiData} />
      <div style={{ background: '#f5f5f1' }}>
        <Steps coinInfo={coinInfo} contract={contract} poolId={poolId} />
      </div>
      {/* <button onClick={() => createPool()}>create</button> */}
      <Tabs item={PrivateStakeDaiiData} />
      <FooterPc />
    </>
  )
}
export default Page
