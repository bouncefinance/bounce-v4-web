import { ProjectHead, Tabs } from 'pages/projectIntro'
import { Steps } from './Step'
import FooterPc from 'components/Footer/FooterPc'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useStakeTokenContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import { STAKE_TOKEN_CONTRACT_ADDRESSES } from 'constants/index'
import { ChainId } from 'constants/chain'
import StakingSchrödinger from 'pages/launchpad/PrivatePadDataListItem/StakingSchrödinger'
import { useCoinToken0, useGetLaunchpadCoinInfo } from './useStakingInfo'
import { useCallback, useMemo } from 'react'
const Page = () => {
  const poolId = 3
  const { account } = useActiveWeb3React()
  const chainId = ChainId.MAINNET
  const contract = useStakeTokenContract(chainId)
  const { token0Amount: token0, token1 } = useCoinToken0()
  const [approvalState, approveCallback] = useApproveCallback(token0, STAKE_TOKEN_CONTRACT_ADDRESSES[chainId])
  const coinInfo = useGetLaunchpadCoinInfo(contract, poolId, account)

  const params: any = useMemo(
    () => [
      token0?.currency.address,
      token1.address,
      '3000000000000',
      '750000000000000000000',
      1710828000,
      1710914400,
      1710927000,
      1
    ],
    [token0?.currency.address, token1.address]
  )

  const createPool = useCallback(async () => {
    // if (approvalState !== ApprovalState.APPROVED) {
    //   await approveCallback()
    // }
    await contract?.create(params)
  }, [contract, params])
  createPool
  approvalState
  approveCallback
  ApprovalState
  return (
    <>
      <ProjectHead item={StakingSchrödinger} />
      <div style={{ background: '#f5f5f1' }}>
        <Steps coinInfo={coinInfo} contract={contract} poolId={poolId} />
      </div>
      {/* <button onClick={() => createPool()}>create</button> */}
      <Tabs item={StakingSchrödinger} />
      <FooterPc />
    </>
  )
}
export default Page
