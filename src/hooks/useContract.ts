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
import { getOtherNetworkLibrary } from 'connection/MultiNetworkConnector'
import ERC721_ABI from '../constants/abis/erc721.json'
import ERC1155_ABI from '../constants/abis/erc1155.json'
import FIXED_SWAP_ABI from '../constants/abis/fixedSwap.json'
import FIXED_SWAP_ABI_BOT from '../constants/abis/fixedSwap_bot.json'
import RANDOM_SELECTION_ABI from '../constants/abis/randomSelection.json'
import RANDOM_SELECTION_NFT_ABI from '../constants/abis/randomSelectionNFT.json'
import FIXED_SWAP_NFT_ABI from '../constants/abis/fixedSwapNft.json'
import ENGLISH_AUCTION_NFT_ABI from '../constants/abis/englishAuctionNFT.json'
import MUTANT_ENGLISH_AUCTION_NFT_ABI from '../constants/abis/mutantEnglishAuctionNFT.json'
import ENGLISH_AUCTION_ERC20_ABI from '../constants/abis/erc20EnglishAuction.json'
import DUTCH_AUCTION_NFT_ABI from '../constants/abis/dutchAuction.json'
import ToolboxERC20TimelockFactory from '../constants/abis/ToolboxERC20TimelockFactory.json'
import ToolboxERC721TimelockFactory from '../constants/abis/ToolboxERC721TimelockFactory.json'
import ToolboxERC20VestingFactory from '../constants/abis/ToolboxERC20VestingFactory.json'
import DISPERSE_ABI from '../constants/abis/Disperse.json'
import TOKEN_MINTER_ABI from '../constants/abis/ToolboxERC20Factory.json'
import WithDrawContractABI from '../constants/abis/ToolboxDeployErc20Factory.json'
import ToolboxDeployERC721Factory from '../constants/abis/ToolboxDeployERC721Factory.json'
import ToolboxDeployErc20VestingFactory from '../constants/abis/ToolboxDeployErc20VestingFactory.json'
import LAUNCHPAD_COIN_ABI from '../constants/abis/launchpad-coin.json'
import STAKE_TOKEN_ABI from '../constants/abis/stake-token.json'
import {
  DUTCH_AUCTION_CONTRACT_ADDRESSES,
  ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES,
  ENGLISH_AUCTION_ERC20_CONTRACT_ADDRESSES,
  FIXED_SWAP_ERC20_ADDRESSES,
  FIXED_SWAP_BOT_ERC20_ADDRESSES,
  FIXED_SWAP_NFT_CONTRACT_ADDRESSES,
  RANDOM_SELECTION_CONTRACT_ADDRESSES,
  MUTANT_ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES,
  TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES,
  DISPERSE_CONTRACT_ADDRESSES,
  MINTER_CONTRACT_ADDRESSES,
  TOOL_BOX_LINEAR_TOKEN_LOCKER_CONTRACT_ADDRESSES,
  TOOL_BOX_LINEAR_TOKEN_721_LOCKER_CONTRACT_ADDRESSES,
  LAUNCHPAD_COIN_CONTRACT_ADDRESSES,
  STAKE_TOKEN_CONTRACT_ADDRESSES
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
export function useBotFixedSwapERC20Contract(address?: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress = address === '' ? undefined : address || (cur ? FIXED_SWAP_BOT_ERC20_ADDRESSES[cur] : undefined)
  return useContract(curAddress, FIXED_SWAP_ABI_BOT, true, queryChainId)
}

export function useRandomSelectionERC20Contract(address?: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress =
    address === '' ? undefined : address || (cur ? RANDOM_SELECTION_CONTRACT_ADDRESSES[cur] : undefined)
  return useContract(curAddress, RANDOM_SELECTION_ABI, true, queryChainId)
}

export function useFixedSwapNftContract(address?: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress = address === '' ? undefined : address || (cur ? FIXED_SWAP_NFT_CONTRACT_ADDRESSES[cur] : undefined)
  return useContract(curAddress, FIXED_SWAP_NFT_ABI, true, queryChainId)
}

export function useEnglishAuctionNftContract(address?: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress =
    address === '' ? undefined : address || (cur ? ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES[cur] : undefined)
  return useContract(curAddress, ENGLISH_AUCTION_NFT_ABI, true, queryChainId)
}

export function useMutantEnglishAuctionNftContract(address?: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress =
    address === '' ? undefined : address || (cur ? MUTANT_ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES[cur] : undefined)
  return useContract(curAddress, MUTANT_ENGLISH_AUCTION_NFT_ABI, true, queryChainId)
}

export function useEnglishAuctionErc20Contract(address?: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress =
    address === '' ? undefined : address || (cur ? ENGLISH_AUCTION_ERC20_CONTRACT_ADDRESSES[cur] : undefined)
  return useContract(curAddress, ENGLISH_AUCTION_ERC20_ABI, true, queryChainId)
}

export function useDutchAuctionContract(address?: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress = address === '' ? undefined : address || (cur ? DUTCH_AUCTION_CONTRACT_ADDRESSES[cur] : undefined)
  return useContract(curAddress, DUTCH_AUCTION_NFT_ABI, true, queryChainId)
}

// 【token locker】
//  Cliff,normal (ToolboxERC20TimelockFactory.deployERC20Timelock)
//  Fragment,stage (ToolboxERC20TimelockFactory.deployERC20MultiTimelock)
// LP v2 .deployUniswapV2Timelock
export function useToolboxERC20TimelockFactory(queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress = cur ? TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES[cur] : undefined
  return useContract(curAddress, ToolboxERC20TimelockFactory, true, cur)
}
// 【token locker】
//  Linear,line ToolboxERC20VestingFactory.deployERC20Vesting
export function useToolboxERC20TimelockLineFactory(queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress = cur ? TOOL_BOX_LINEAR_TOKEN_LOCKER_CONTRACT_ADDRESSES[cur] : undefined
  return useContract(curAddress, ToolboxERC20VestingFactory, true, cur)
}
//  LP v3 normal: ToolboxERC721TimelockFactory.deployUniswapV3Timelock
export function useToolboxERC721TimelockFactory(queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress = cur ? TOOL_BOX_LINEAR_TOKEN_721_LOCKER_CONTRACT_ADDRESSES[cur] : undefined
  return useContract(curAddress, ToolboxERC721TimelockFactory, true, cur)
}
// token lock Withdraw contract
export function useWithDrawContract(contractAddress: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  return useContract(contractAddress, WithDrawContractABI, true, cur)
}
//  erc721 lp lock Withdraw contract
export function useErc721WithDrawContract(contractAddress: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  return useContract(contractAddress, ToolboxDeployERC721Factory, true, cur)
}
// token lock, linear Withdraw contract vesting erc20
export function useWithDrawVestingContract(contractAddress: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  return useContract(contractAddress, ToolboxDeployErc20VestingFactory, true, cur)
}
export function useDisperseContract(queryChainId: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress = cur ? DISPERSE_CONTRACT_ADDRESSES[cur] : undefined
  return useContract(curAddress, DISPERSE_ABI, true, queryChainId)
}

export function useMinterContract(queryChainId: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress = cur ? MINTER_CONTRACT_ADDRESSES[cur] : undefined
  return useContract(curAddress, TOKEN_MINTER_ABI, true, queryChainId)
}
export function useLaunchpadCoinContract(queryChainId?: ChainId) {
  const cur = queryChainId || ChainId.MAINNET
  const curAddress = cur ? LAUNCHPAD_COIN_CONTRACT_ADDRESSES[cur] : undefined
  return useContract(curAddress, LAUNCHPAD_COIN_ABI, true, queryChainId)
}

export function useStakeTokenContract(queryChainId?: ChainId) {
  // const cur = queryChainId || ChainId.MAINNET
  const cur = queryChainId || ChainId.SEPOLIA
  const curAddress = cur ? STAKE_TOKEN_CONTRACT_ADDRESSES[cur] : undefined
  return useContract(curAddress, STAKE_TOKEN_ABI, true, queryChainId)
}

export function useRandomSelectionNFTContract(address?: string, queryChainId?: ChainId) {
  const { chainId } = useActiveWeb3React()
  const cur = queryChainId || chainId
  const curAddress =
    address === '' ? undefined : address || (cur ? RANDOM_SELECTION_CONTRACT_ADDRESSES[cur] : undefined)
  return useContract(curAddress, RANDOM_SELECTION_NFT_ABI, true, queryChainId)
}
