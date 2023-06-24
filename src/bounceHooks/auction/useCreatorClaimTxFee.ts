import { CurrencyAmount } from 'constants/token'
import JSBI from 'jsbi'
import { useMemo } from 'react'

export const TX_FEE_RATIO = 0.025

export function useCreatorClaimAmount1Data(amount1: CurrencyAmount | undefined, ratio = TX_FEE_RATIO * 1e18) {
  return useMemo(() => {
    if (!amount1) return undefined
    const _fee = amount1.multiply(JSBI.BigInt(ratio)).divide(JSBI.BigInt(1e18))
    const fee = CurrencyAmount.fromAmount(amount1.currency, _fee.toSignificant(18))
    if (!fee) return undefined

    return {
      fee,
      receivedAmount: amount1.subtract(fee)
    }
  }, [amount1, ratio])
}
