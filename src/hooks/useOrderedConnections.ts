import { getConnection } from 'connection'
import { ConnectionType } from 'connection/types'
import { useMemo } from 'react'
// import { useAppSelector } from 'state/hooks'

const SELECTABLE_ENABLE_WALLETS: ConnectionType[] = [
  ConnectionType.INJECTED,
  ConnectionType.WALLET_CONNECT_V2,
  ConnectionType.UNISWAP_WALLET_V2,
  ConnectionType.OKX_WALLET,
  ConnectionType.GNOSIS_SAFE,
  ConnectionType.COINBASE_WALLET
]

export default function useOrderedConnections() {
  // const selectedWallet = useAppSelector(state => state.userWallet.selectedWallet)

  return useMemo(() => {
    const orderedConnectionTypes: ConnectionType[] = []

    // Always attempt to use to Gnosis Safe first, as we can't know if we're in a SafeContext.
    orderedConnectionTypes.push(ConnectionType.GNOSIS_SAFE)

    // Add the `selectedWallet` to the top so it's prioritized, then add the other selectable wallets.
    // if (selectedWallet) {
    //   orderedConnectionTypes.push(selectedWallet)
    // }
    orderedConnectionTypes.push(...SELECTABLE_ENABLE_WALLETS)

    // Add network connection last as it should be the fallback.
    orderedConnectionTypes.push(ConnectionType.NETWORK)

    return orderedConnectionTypes.map(connectionType => getConnection(connectionType))
  }, [])
}