import { useEffect } from 'react'
import { useQueryParams } from './useQueryParams'
import { isAddress } from 'utils'
import { useActiveWeb3React } from 'hooks'
import { shareAdd } from 'api/bladeDao'

const sessionStorageBladeDaoShareKey = 'sessionStorageBladeDaoShareKey'

export function useBladeDaoSharer() {
  const { sharer } = useQueryParams()
  const { account } = useActiveWeb3React()
  const _sharerAddress = isAddress(decodeURIComponent(atob(sharer || '')))
  const sharerAddress = _sharerAddress || sessionStorage.getItem(sessionStorageBladeDaoShareKey)

  useEffect(() => {
    if (sharerAddress) {
      sessionStorage.setItem(sessionStorageBladeDaoShareKey, sharerAddress)
    }
  }, [sharerAddress])

  useEffect(() => {
    if (sharerAddress && account && sharerAddress.toLowerCase() !== account.toLowerCase()) {
      shareAdd({
        sharer: sharerAddress,
        invitee: account,
        side: 'BladeDao'
      })
    }
  }, [account, sharerAddress])
}
