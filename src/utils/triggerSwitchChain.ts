import { Web3Provider } from '@ethersproject/providers'
import { ChainId, SUPPORTED_NETWORKS } from '../constants/chain'
import { toast } from 'react-toastify'

export function triggerSwitchChain(library: Web3Provider | undefined, chainId: ChainId, account: string) {
  library
    ?.send('wallet_switchEthereumChain', [{ chainId: SUPPORTED_NETWORKS[chainId as ChainId]?.hexChainId }])
    .catch(err => {
      if (err?.code === 4001) return
      if (err.toString().includes('[binance-w3w]')) {
        toast.error('Unsupported network.')
        return
      }
      const params = SUPPORTED_NETWORKS[chainId as ChainId]
      const obj: any = {}
      obj.chainId = params?.hexChainId
      obj.chainName = params?.chainName
      obj.nativeCurrency = params?.nativeCurrency
      obj.rpcUrls = params?.rpcUrls
      obj.blockExplorerUrls = params?.blockExplorerUrls

      library?.send('wallet_addEthereumChain', [obj, account])
    })
}
