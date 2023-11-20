// import { ProjectHead, Tabs } from 'pages/projectIntro'
// import { Steps } from './Step'
// import { PrivatePadCoinData } from 'pages/launchpad/PrivatePadDataList'
// import FooterPc from 'components/Footer/FooterPc'
import { SEPOLIA_TOKEN_LIST } from 'constants/auction'
import { Currency } from 'constants/token/currency'
import { CurrencyAmount } from 'constants/token/fractions/currencyAmount'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { useLaunchpadCoinContract } from 'hooks/useContract'
import { ApprovalState } from 'hooks/useTokenTimelock'
import { useEffect } from 'react'
const Page = () => {
  const contract = useLaunchpadCoinContract()
  const token1 = SEPOLIA_TOKEN_LIST[1]
  const token1Currency = new Currency(token1.chainId as any, token1.address, token1.decimals, token1.symbol)
  const token1Amount = CurrencyAmount.fromAmount(token1Currency, 200000)
  const [approvalState, approveCallback] = useApproveCallback(
    token1Amount,
    '0x6d5028881fd559f2c6b8D1D0f32522fbAC92d991'
  )
  const params: any = [
    token1.address,
    '0x0000000000000000000000000000000000000000',
    BigInt(1000000000000000000),
    BigInt(1000000000000000000),
    17004901360,
    17005765360,
    17005770160,
    300
  ]

  const createPool = async () => {
    console.log('approvalState', approvalState)

    if (approvalState !== ApprovalState.APPROVED) {
      await approveCallback()
    }
    try {
      // const gas = await contract?.estimateGas.create(params)
      // console.log('res132', gas)

      const poolInfo = await contract?.create(params)
      console.log('res132', poolInfo)
    } catch (error) {
      console.log('res132', error, params, contract)
    }
  }
  useEffect(() => {
    if (!contract) return
    contract
      .pools([0])
      .then((res: any) => {
        console.log('res123', res)
      })
      .catch((error: any) => {
        console.log('res123', error)
      })
  }, [contract])
  return (
    <>
      <button onClick={() => createPool()}>create</button>
      {/* <ProjectHead item={PrivatePadCoinData} />
      <div style={{ background: '#f5f5f1' }}>
        <Steps />
      </div>

      <Tabs item={PrivatePadCoinData} />
      <FooterPc /> */}
    </>
  )
}
export default Page
