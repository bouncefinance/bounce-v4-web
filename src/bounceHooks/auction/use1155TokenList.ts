import { useState, useEffect, useMemo } from 'react'
import { getUserNFTsInfo } from 'api/user/index'
import { UserNFTCollection } from 'api/user/type'
import { useActiveWeb3React } from 'hooks'
import { IS_TEST_ENV } from '../../constants'

export interface Response1155Token {
  [key: string]: UserNFTCollection[]
}
export function use1155TokenList(
  chainId: string | number,
  isERC721?: boolean
): {
  loading: boolean
  data: Response1155Token
} {
  const { account } = useActiveWeb3React()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [list, setList] = useState<Response1155Token>({})
  console.log('false', chainId, isERC721)

  useEffect(() => {
    const fun = async () => {
      try {
        const params = {
          chainId: Number(chainId),
          creator: account || '',
          isERC721: isERC721 ? true : false,
          limit: 99999
        }
        setIsLoading(true)
        setList({})
        const res = await getUserNFTsInfo(params)
        setIsLoading(false)
        const { list } = res.data
        const nftCollection: Response1155Token = {}
        list.map((item: UserNFTCollection) => {
          if (!item.contractAddr) return
          if (!Object.prototype.hasOwnProperty.call(nftCollection, item.contractAddr || '')) {
            nftCollection[item.contractAddr] = []
          }
          nftCollection[item.contractAddr].push(item)
        })

        if (!IS_TEST_ENV) {
          if (chainId === 1 && isERC721) {
            nftCollection['0xed5af388653567af2f388e6224dc7c4b3241c544'] = []
            nftCollection['0xed5af388653567af2f388e6224dc7c4b3241c544'].push({
              balance: '1',
              contractAddr: '0xed5af388653567af2f388e6224dc7c4b3241c544',
              contractName: 'azuki',
              description: 'azuki',
              image: '',
              name: 'azuki',
              tokenId: '362'
            })

            nftCollection['0xed5af388653567af2f388e6224dc7c4b3241c544'].push({
              balance: '1',
              contractAddr: '0xed5af388653567af2f388e6224dc7c4b3241c544',
              contractName: 'azuki',
              description: 'azuki',
              image: '',
              name: 'azuki',
              tokenId: '6412'
            })
          }
          if (chainId === 25 && !isERC721) {
            nftCollection['0x755d8bb9959058DB2E6128E7435BC04Cd8704404'] = []
            nftCollection['0x755d8bb9959058DB2E6128E7435BC04Cd8704404'].push({
              balance: '',
              contractAddr: '0x755d8bb9959058DB2E6128E7435BC04Cd8704404',
              contractName: 'Bounce x zkSync',
              description: 'Bounce x zkSync',
              image: '',
              name: 'Bounce x zkSync',
              tokenId: '0'
            })

            nftCollection['0x97F277dC0097028E0685549e343b01A836d8a78A'] = []
            nftCollection['0x97F277dC0097028E0685549e343b01A836d8a78A'].push({
              balance: '',
              contractAddr: '0x97F277dC0097028E0685549e343b01A836d8a78A',
              contractName: 'Bounce x zkSync',
              description: 'Bounce x zkSync',
              image: '',
              name: 'Bounce x zkSync',
              tokenId: '0'
            })

            nftCollection['0x95C2ebf0ed75Eab534ffB02D42e9f047290Ca647'] = []
            nftCollection['0x95C2ebf0ed75Eab534ffB02D42e9f047290Ca647'].push({
              balance: '',
              contractAddr: '0x95C2ebf0ed75Eab534ffB02D42e9f047290Ca647',
              contractName: 'Bounce x zkSync',
              description: 'Bounce x zkSync',
              image: '',
              name: 'Bounce x zkSync',
              tokenId: '0'
            })
          }
        } else {
          if (chainId === 5 && isERC721) {
            nftCollection['0x88A481a42feCF5bC3BE2b3F2Cd312C3999Ca32D6'] = []
            nftCollection['0x88A481a42feCF5bC3BE2b3F2Cd312C3999Ca32D6'].push({
              balance: '1',
              contractAddr: '0x88A481a42feCF5bC3BE2b3F2Cd312C3999Ca32D6',
              contractName: 'test',
              description: 'test',
              image: '',
              name: 'test',
              tokenId: '5'
            })

            const _tempIds = Object.keys(new Array(201).fill(''))
            _tempIds.shift()
            nftCollection['0x63053B36ba17d81401115a5E33E7c265F81Ee44f'] = _tempIds.map(i => ({
              balance: '1',
              contractAddr: '0x63053B36ba17d81401115a5E33E7c265F81Ee44f',
              contractName: 'english-test',
              description: 'english-test',
              image: '',
              name: 'english-test',
              tokenId: i
            }))
          }
          if (chainId === 5 && !isERC721) {
            nftCollection['0xe382FBd068d373dbe3186176af788a60a9CC13e8'] = []
            nftCollection['0xe382FBd068d373dbe3186176af788a60a9CC13e8'].push({
              balance: '1',
              contractAddr: '0xe382FBd068d373dbe3186176af788a60a9CC13e8',
              contractName: 'test',
              description: 'test',
              image: '',
              name: 'test',
              tokenId: '1'
            })
          }
        }

        setList(nftCollection)
      } catch (error) {
        setIsLoading(false)
        const nftCollection: Response1155Token = {}
        setList(nftCollection)
        console.error('fetch user nfts error', error)
        if (!IS_TEST_ENV) return
        if (chainId === 5 && isERC721) {
          nftCollection['0xa3620AcffC7b0dC97875C360946b7847E619596c'] = []
          nftCollection['0xa3620AcffC7b0dC97875C360946b7847E619596c'].push({
            balance: '1',
            contractAddr: '0xa3620AcffC7b0dC97875C360946b7847E619596c',
            contractName: 'DiamondHand Necklace',
            description: 'DiamondHand Necklace',
            image: '',
            name: 'DiamondHand Necklace',
            tokenId: '0'
          })

          nftCollection['0x88A481a42feCF5bC3BE2b3F2Cd312C3999Ca32D6'] = []
          nftCollection['0x88A481a42feCF5bC3BE2b3F2Cd312C3999Ca32D6'].push({
            balance: '1',
            contractAddr: '0x88A481a42feCF5bC3BE2b3F2Cd312C3999Ca32D6',
            contractName: 'test',
            description: 'test',
            image: '',
            name: 'test',
            tokenId: '6'
          })

          const _tempIds = Object.keys(new Array(201).fill(''))
          _tempIds.shift()
          nftCollection['0x63053B36ba17d81401115a5E33E7c265F81Ee44f'] = _tempIds.map(i => ({
            balance: '1',
            contractAddr: '0x63053B36ba17d81401115a5E33E7c265F81Ee44f',
            contractName: 'english-test',
            description: 'english-test',
            image: '',
            name: 'english-test',
            tokenId: i
          }))
        }
        if (chainId === 31 && !isERC721) {
          nftCollection['0x90D93397Bb0F3880B855Aa6288A067cF34B66Ae6'] = []
          nftCollection['0x90D93397Bb0F3880B855Aa6288A067cF34B66Ae6'].push({
            balance: '1',
            contractAddr: '0x90D93397Bb0F3880B855Aa6288A067cF34B66Ae6',
            contractName: 'test',
            description: 'test',
            image: '',
            name: 'test',
            tokenId: '0'
          })

          nftCollection['0x066682c54041f46e713E9a87FA5b61Ef466aa1d1'] = []
          nftCollection['0x066682c54041f46e713E9a87FA5b61Ef466aa1d1'].push({
            balance: '',
            contractAddr: '0x066682c54041f46e713E9a87FA5b61Ef466aa1d1',
            contractName: 'OFFZ',
            description:
              "We're excited to announce decentralized auction-as-a-service platform Bounce Finance's integration of ZetaChain's testnet. At ZetaChain, we're on a mission to offer an EVM-compatible L1 blockchain that connects everything. A key part of this goal is providing users an easy and safe way to engage in opportunities across any chain. For Bounce, the partnership brings users the ability to create and participate in diverse types of DeFi auctions from any chain — including the Bitcoin network. To make our partnership reveal fun and interesting, we're giving away an Off-White sneaker to one lucky beta-tester.",
            image: 'https://arweave.net/phHEiIDd5x9lYifnKURzUK_qAEqq6lEF_UOR6bbqxLM"',
            name: 'OFFZ',
            tokenId: '0'
          })

          nftCollection['0xbb0A8C485Bc54Ad7b693C7957FE696E76d3ff6f1'] = []
          nftCollection['0xbb0A8C485Bc54Ad7b693C7957FE696E76d3ff6f1'].push({
            balance: '',
            contractAddr: '0xbb0A8C485Bc54Ad7b693C7957FE696E76d3ff6f1',
            contractName: 'BZB',
            description: 'Bounce x ZetaChain x Bitget',
            image: 'https://arweave.net/S5pCWJHNSdCJDYA7G-o4CZtjXTcg7gDHiQnwEZIhuPk',
            name: 'BZB',
            tokenId: '0'
          })
        }
        if (chainId === 29 && isERC721) {
          const _tempIds = Object.keys(new Array(401).fill(''))
          _tempIds.shift()
          nftCollection['0xeaa8b62263cbb81dcd5fa488dcbf8abd6ce119e0'] = _tempIds.map(i => ({
            balance: '1',
            contractAddr: '0xeaa8b62263cbb81dcd5fa488dcbf8abd6ce119e0',
            contractName: 'omni-test',
            description: 'omni-test',
            image: '',
            name: 'omni-test',
            tokenId: i
          }))
        }
      }
    }
    fun()
  }, [account, chainId, isERC721])
  const res = useMemo(() => ({ loading: isLoading, data: list }), [isLoading, list])
  return res
}

export default use1155TokenList
