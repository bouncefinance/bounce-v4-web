import { show, hide } from '@ebay/nice-modal-react'
import { BigNumber } from 'bignumber.js'
import { formatUnits, parseUnits } from 'ethers/lib/utils.js'
import DialogConfirmation from 'bounceComponents/common/DialogConfirmation'
import DialogDarkConfirmation from 'bounceComponents/common/DialogConfirmation/DialogDarkConfirmation'
import DialogLightBotConfirmation from 'bounceComponents/common/DialogConfirmation/DialogLightBotConfirmation'
import DialogDarkBotConfirmation from 'bounceComponents/common/DialogConfirmation/DialogDarkBotConfirmation'

export const getToken0AmountFromToken1Amount = (token1Amount: string, ratio: string | number) => {
  return new BigNumber(token1Amount).times(new BigNumber(ratio))
}

export const getToken0AmountFromToken1Units = (
  token1Units: string | number,
  token1Decimals: string | number,
  ratio: string | number
) => {
  const token1Amount = formatUnits(token1Units, token1Decimals)
  return getToken0AmountFromToken1Amount(token1Amount, ratio)
}

export const getToken0UnitsFromToken1Units = (
  token1Units: string | number,
  token1Decimals: string | number,
  token0Decimals: string | number,
  ratio: string | number
) => {
  const token0Amount = getToken0AmountFromToken1Units(token1Units, token1Decimals, ratio)
  return new BigNumber(parseUnits(token0Amount.toString(), token0Decimals).toString())
}

/**
 * Get user's swapped token1 in readable amount.
 */
export const getUserSwappedAmount1 = (
  userSwappedAmount0: string | number,
  token0Decimals: number,
  token1Decimals: number,
  apiRatio: string | number
) => {
  if (!userSwappedAmount0) {
    return new BigNumber(0)
  }

  const userSwappedAmount1 = new BigNumber(formatUnits(userSwappedAmount0, token0Decimals).toString())
    .times(apiRatio)
    // Avoid underflow issue
    .decimalPlaces(token1Decimals, BigNumber.ROUND_CEIL)

  return userSwappedAmount1
}

/**
 * Get user's swapped token1 units.
 */
export const getUserSwappedUnits1 = (userSwappedAmount1: BigNumber, token1Decimals: number) => {
  // Possible to under flow, don't use parseUnits in here.
  const userSwappedUnits1 = userSwappedAmount1.multipliedBy(new BigNumber(10).pow(token1Decimals))
  return userSwappedUnits1
}

export const checkIfAllocationLimitExist = (maxAmount1PerWallet: string | number) => {
  return new BigNumber(maxAmount1PerWallet).gt(0)
}

export const showRequestApprovalDialog = (config?: { dark: boolean; isBot?: boolean }) => {
  if (!config?.isBot) {
    show(config?.dark ? DialogDarkConfirmation : DialogConfirmation, {
      title: 'Bounce requests wallet approval',
      subTitle: 'Please manually interact with your wallet. Ease enable Bounce to access your tokens.'
    })
    return
  }
  show(config?.dark ? DialogDarkBotConfirmation : DialogLightBotConfirmation, {
    title: 'Bot requests wallet approval',
    subTitle: 'Please manually interact with your wallet. Ease enable bot to access your tokens.'
  })
}

export const showRequestConfirmDialog = (config?: { dark: boolean; isBot?: boolean }) => {
  if (!config?.isBot) {
    show(config?.dark ? DialogDarkConfirmation : DialogConfirmation, {
      title: 'Bounce requests wallet interaction',
      subTitle: 'Please open your wallet and confirm in the transaction activity to proceed your order.'
    })
    return
  }
  show(config?.dark ? DialogDarkBotConfirmation : DialogLightBotConfirmation, {
    title: 'Bot requests wallet interaction',
    subTitle: 'Please open your wallet and confirm in the transaction activity to proceed your order.'
  })
}

export const showWaitingTxDialog = (onClose?: () => void, config?: { dark: boolean; isBot?: boolean }) => {
  if (!config?.isBot) {
    show(config?.dark ? DialogDarkConfirmation : DialogConfirmation, {
      title: 'Bounce waiting for transaction settlement',
      subTitle:
        'Bounce is engaging with blockchain transaction, please wait patiently for on-chain transaction settlement.',
      onClose
    })
    return
  }
  show(config?.dark ? DialogDarkBotConfirmation : DialogLightBotConfirmation, {
    title: 'Almost done! Waiting for transaction settlement',
    subTitle: 'Bot is engaging with blockchain transaction, please wait patiently for on-chain transaction settlement.'
  })
}

export const hideDialogConfirmation = () => {
  hide(DialogConfirmation)
  hide(DialogDarkConfirmation)
}
