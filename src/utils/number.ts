import { BigNumber } from 'bignumber.js'

export const formatNumber = (
  input: string | BigNumber,
  options?: {
    unit?: number | string
    shouldSplitByComma?: boolean
    decimalPlaces?: number
  }
) => {
  const unit = typeof options?.unit === 'undefined' ? 18 : Number(options?.unit)

  const shouldSplitByComma = typeof options?.shouldSplitByComma === 'undefined' ? true : options?.shouldSplitByComma

  const decimalPlaces = options?.decimalPlaces ?? 6

  const readableBigNumber = BigNumber.isBigNumber(input) ? input.div(10 ** unit) : new BigNumber(input).div(10 ** unit)

  if (shouldSplitByComma) {
    if (typeof decimalPlaces === 'number') {
      return readableBigNumber.decimalPlaces(decimalPlaces, BigNumber.ROUND_DOWN).toFormat()
    }
    return readableBigNumber.toFormat()
  } else {
    if (typeof decimalPlaces === 'number') {
      return readableBigNumber.decimalPlaces(decimalPlaces, BigNumber.ROUND_DOWN).toFixed()
    }
    return readableBigNumber.toFixed()
  }
}

export const removeRedundantZeroOfFloat = (floatInput: string) => {
  const regexp = /(?:\.0*|(\.\d+?)0+)$/
  return floatInput.replace(regexp, '$1')
}

export const bigNumberToString = (input: number | string) => {
  return new BigNumber(input.toString()).toFixed()
}

export const fixToDecimals = (value: string | number, decimals: number) => {
  return new BigNumber(value).toFixed(decimals, BigNumber.ROUND_DOWN)
}

export function formatGroupNumber(value: number, currencyText = '', fractionDigits = 1) {
  if (value / 1_000_000_000 >= 1) {
    return currencyText + BigNumber(value).dividedBy(1_000_000_000).toFixed(fractionDigits).toLocaleString() + 'B'
  }
  if (value / 1_000_000 >= 1) {
    return currencyText + BigNumber(value).dividedBy(1_000_000).toFixed(fractionDigits).toLocaleString() + 'M'
  }
  if (value / 1_000 >= 1) {
    return currencyText + BigNumber(value).dividedBy(1_000).toFixed(fractionDigits).toLocaleString() + 'K'
  }
  return currencyText + BigNumber(value).toFixed(fractionDigits).toLocaleString()
}
