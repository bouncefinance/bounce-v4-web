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
const Page = () => {
  const { chainId } = useActiveWeb3React()
  const contract = useLaunchpadCoinContract()
  const token0 = useCoinToken0()
  const [approvalState, approveCallback] = useApproveCallback(
    token0,
    LAUNCHPAD_COIN_CONTRACT_ADDRESSES[chainId || 11155111]
  )
  const coinInfo = useGetLaunchpadCoinInfo(contract, 0)
  console.log('coinInfo', coinInfo)

  const params: any = [
    token0?.currency.address,
    '0x0000000000000000000000000000000000000000',
    BigInt(1000000000000000000),
    BigInt(1000000000000000000),
    17004901360,
    17005765360,
    17005770160,
    300
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
      {/* <button>create</button> */}
      <ProjectHead item={PrivatePadCoinData} />
      <div style={{ background: '#f5f5f1' }}>
        <Steps coinInfo={coinInfo} />
      </div>

      <Tabs item={PrivatePadCoinData} />
      <FooterPc />
    </>
  )
}
export default Page
