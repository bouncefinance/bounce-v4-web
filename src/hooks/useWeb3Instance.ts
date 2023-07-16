import { useActiveWeb3React } from './index'
import Web3 from 'web3'
import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

export function useWeb3Instance() {
  const { account, library } = useActiveWeb3React()
  const [web3jsInstance, setWeb3jsInstance] = useState<Web3 | null>(null)

  useEffect(() => {
    if (library) {
      const instance = new Web3((library.provider as provider) || Web3.givenProvider)
      setWeb3jsInstance(instance)
    }
  }, [account, library])

  return web3jsInstance
}

export function useSignMessage() {
  const { account } = useActiveWeb3React()
  console.log('🚀 ~ file: useWeb3Instance.ts:22 ~ useSignMessage ~ account:', account)
  const web3 = useWeb3Instance()
  return useCallback(
    (message: string) => {
      if (!account || !web3) {
        throw new Error('account not find')
      }
      return web3?.eth.personal.sign(message, account, '')
    },
    [account, web3]
  )
}
