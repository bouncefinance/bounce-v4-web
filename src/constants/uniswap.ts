import { Token as UniToken, WETH9 } from '@uniswap/sdk-core'
import { ChainId } from './chain'

export const WETH: { [chainId in ChainId]?: UniToken } = (() => {
  const ret: { [chainId in ChainId]?: UniToken } = {}
  for (const chain of Object.keys(WETH9)) {
    ret[Number(chain) as ChainId] = WETH9[Number(chain)]
  }
  ret[ChainId.SEPOLIA] = new UniToken(ChainId.SEPOLIA, '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', 18, 'WETH', 'WETH')
  return ret
})()

export const USDC: { [chainId in ChainId]?: UniToken } = {
  [ChainId.MAINNET]: new UniToken(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USDC'),
  [ChainId.SEPOLIA]: new UniToken(ChainId.SEPOLIA, '0x2D272547dAc02289CF435c3AC4FEDcb989beE0cC', 6, 'USDC', 'USDC')
}

export const UNI_V3_FACTORY_ADDRESSES: { [chainId in ChainId]?: string } = {
  [ChainId.SEPOLIA]: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
  [ChainId.MAINNET]: '0x1F98431c8aD98523631AE4a59f267346ea31F984'
}

export const UNI_V3_POSITION_ADDRESSES: { [chainId in ChainId]?: string } = {
  [ChainId.SEPOLIA]: '0x1238536071E1c677A632429e3655c799b22cDA52',
  [ChainId.MAINNET]: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88'
}

export const UNI_V3_QUOTER_ADDRESSES: { [chainId in ChainId]?: string } = {
  [ChainId.SEPOLIA]: '0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3',
  [ChainId.MAINNET]: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e'
}
