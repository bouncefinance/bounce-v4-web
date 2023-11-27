import { ProjectHead, Tabs } from 'pages/projectIntro'
import { Steps } from './Step'
import { PrivatePadCoinData } from 'pages/launchpad/PrivatePadDataList'
import FooterPc from 'components/Footer/FooterPc'

import { useApproveCallback } from 'hooks/useApproveCallback'
import { useLaunchpadCoinContract } from 'hooks/useContract'
import { ApprovalState } from 'hooks/useTokenTimelock'
// import { useEffect } from 'react'
import { useCoinToken0, useGetLaunchpadCoinInfo } from 'bounceHooks/launchpad/useLaunchpadCoinInfo'
import { useActiveWeb3React } from 'hooks'

import { LAUNCHPAD_COIN_CONTRACT_ADDRESSES } from 'constants/index'
import { ChainId } from 'constants/chain'
const poolId = 30
const Page = () => {
  const { account } = useActiveWeb3React()
  const chainId = ChainId.SEPOLIA
  const contract = useLaunchpadCoinContract(chainId)
  const { token0Amount: token0, token1 } = useCoinToken0()
  const [approvalState, approveCallback] = useApproveCallback(token0, LAUNCHPAD_COIN_CONTRACT_ADDRESSES[chainId])
  const coinInfo = useGetLaunchpadCoinInfo(contract, poolId, account)

  const params: any = [
    token0?.currency.address,
    token1.address,
    BigInt(100000000),
    BigInt(10000000000000000000),
    1700822941,
    1700823121,
    1700823181,
    600
  ]

  const createPool = async () => {
    if (approvalState !== ApprovalState.APPROVED) {
      await approveCallback()
    }
    await contract?.create(params)
  }
  console.log('createPool', createPool)

  return (
    <>
      <ProjectHead item={PrivatePadCoinData} />
      <div style={{ background: '#f5f5f1' }}>
        <Steps coinInfo={coinInfo} contract={contract} poolId={poolId} />
      </div>
      {/* <button onClick={() => createPool()}>create</button> */}
      <Tabs item={PrivatePadCoinData} />
      <FooterPc />
    </>
  )
}
export default Page
