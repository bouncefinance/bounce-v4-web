import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import { MIGRATOR_ABI, MIGRATOR_ADDRESS } from '../constants/abis/migrator'
import UNISOCKS_ABI from '../constants/abis/unisocks.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import { getContract } from '../utils'
import { useActiveWeb3React } from './index'
import { ChainId } from '../constants/chain'
import { getOtherNetworkLibrary } from 'connectors/MultiNetworkConnector'
import ERC721_ABI from '../constants/abis/erc721.json'
import ERC1155_ABI from '../constants/abis/erc1155.json'
import FIXED_SWAP_ABI from '../constants/abis/fixedSwap.json'
import RANDOM_SELECTION_ABI from '../constants/abis/randomSelection.json'
import FIXED_SWAP_NFT_ABI from '../constants/abis/fixedSwapNft.json'
import ENGLISH_AUCTION_NFT_ABI from '../constants/abis/englishAuctionNFT.json'
import {
  ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES,
  FIXED_SWAP_ERC20_ADDRESSES,
  FIXED_SWAP_NFT_CONTRACT_ADDRESSES,
  RANDOM_SELECTION_CONTRACT_ADDRESSES
} from '../constants'

// returns null on errors
function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
  queryChainId?: ChainId
): Contract | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI) return null
    if (!queryChainId && !chainId) return null

    if (queryChainId && chainId !== queryChainId) {
      const web3Library = getOtherNetworkLibrary(queryChainId)
      if (!web3Library) return null
      try {
        return getContract(address, ABI, web3Library, undefined)
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }
    if (chainId && library) {
      try {
        return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }
    return null
  }, [ABI, account, address, chainId, library, queryChainId, withSignerIfPossible])
}

export function useV2MigratorContract(queryChainId?: ChainId): Contract | null {
  return useContract(MIGRATOR_ADDRESS, MIGRATOR_ABI, true, queryChainId)
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
  queryChainId?: ChainId
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible, queryChainId)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean, queryChainId?: ChainId): Contract | null {
  const { chainId } = useActiveWeb3React()
  const curChainId = queryChainId || chainId
  let address: string | undefined
  if (curChainId) {
    switch (curChainId) {
      case ChainId.MAINNET:
      case ChainId.GÖRLI:
      case ChainId.SEPOLIA:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible, queryChainId)
}

export function useSpaceIdRegistrarContract(withSignerIfPossible?: boolean, queryChainId?: ChainId): Contract | null {
  const { chainId } = useActiveWeb3React()
  const curChainId = queryChainId || chainId
  let address: string | undefined
  if (curChainId) {
    switch (curChainId) {
      case ChainId.MAINNET:
      case ChainId.GÖRLI:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
      case ChainId.BSCTEST:
        address = '0xfFB52185b56603e0fd71De9de4F6f902f05EEA23'
        break
      case ChainId.BSC:
        address = '0x08CEd32a7f3eeC915Ba84415e9C07a7286977956'
        break
      case ChainId.ARBITRUM:
        address = '0x4a067EE58e73ac5E4a43722E008DFdf65B2bF348'
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible, queryChainId)
}

export function useENSResolverContract(
  address: string | undefined,
  withSignerIfPossible?: boolean,
  queryChainId?: ChainId
): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible, queryChainId)
}

export function useBytes32TokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
  queryChainId?: ChainId
): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible, queryChainId)
}

export function useMulticallContract(queryChainId?: ChainId): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    queryChainId || chainId ? MULTICALL_NETWORKS[(queryChainId || chainId) as ChainId] : undefined,
    MULTICALL_ABI,
    false,
    queryChainId
  )
}

export function useSocksController(queryChainId?: ChainId): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId === ChainId.MAINNET ? '0x65770b5283117639760beA3F867b69b3697a91dd' : undefined,
    UNISOCKS_ABI,
    false,
    queryChainId
  )
}

export function useERC721Contract(address: string | undefined, queryChainId?: ChainId): Contract | null {
  return useContract(address, ERC721_ABI, true, queryChainId)
}

export function useERC1155Contract(address: string | undefined, queryChainId?: ChainId): Contract | null {
  return useContract(address, ERC1155_ABI, true, queryChainId)
}

export function useFixedSwapERC20Contract(address?: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress = address === '' ? undefined : address || (cur ? FIXED_SWAP_ERC20_ADDRESSES[cur] : undefined)
  return useContract(curAddress, FIXED_SWAP_ABI, true, queryChainId)
}

export function useRandomSelectionERC20Contract(queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  return useContract(
    cur ? RANDOM_SELECTION_CONTRACT_ADDRESSES[cur] : undefined,
    RANDOM_SELECTION_ABI,
    true,
    queryChainId
  )
}

export function useFixedSwapNftContract(queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  return useContract(cur ? FIXED_SWAP_NFT_CONTRACT_ADDRESSES[cur] : undefined, FIXED_SWAP_NFT_ABI, true, queryChainId)
}

export function useEnglishAuctionNftContract(queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  return useContract(
    cur ? ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES[cur] : undefined,
    ENGLISH_AUCTION_NFT_ABI,
    true,
    queryChainId
  )
}
