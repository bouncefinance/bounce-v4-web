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
  const { library } = useActiveWeb3React()

  return useCallback(
    (message: string) => {
      if (!library) {
        throw new Error('library not found')
      }
      return library.getSigner().signMessage(message)
    },
    [library]
  )
}
