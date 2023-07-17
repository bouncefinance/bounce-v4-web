import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
// import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useMemo } from 'react'
import { Connector } from '@web3-react/types'
import { ChainId, isSupportedChain } from 'constants/chain'

export function useActiveWeb3React(): {
  chainId?: ChainId
  account?: string
  connector?: Connector
  provider?: Web3Provider
  library?: Web3Provider
  active?: boolean
  errorNetwork: boolean | undefined
} {
  // const { connector, hooks } = useWeb3ReactCore()
  const { chainId, account: _account, connector, provider } = useWeb3React()

  return useMemo(() => {
    let account = _account
    if (chainId && !isSupportedChain(chainId)) {
      account = undefined
    }

    return {
      chainId,
      account,
      connector: connector,
      provider: provider,
      library: provider,
      active: !!account,
      errorNetwork: chainId === undefined ? undefined : !isSupportedChain(chainId)
    }
  }, [_account, chainId, connector, provider])
}
