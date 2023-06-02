import { useState, useEffect, useMemo } from 'react'
import { getUserNFTsInfo } from 'api/user/index'
import { UserNFTCollection } from 'api/user/type'
import { useActiveWeb3React } from 'hooks'

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
        // nftCollection['0xf904B6C5aBa72dD44fBc840Be139c100F291d5FA'] = []
        // nftCollection['0xf904B6C5aBa72dD44fBc840Be139c100F291d5FA'].push({
        //   balance: '1',
        //   contractAddr: '0xf904B6C5aBa72dD44fBc840Be139c100F291d5FA',
        //   contractName: 'test',
        //   description: 'test',
        //   image: '',
        //   name: 'test',
        //   tokenId: '5010'
        // })
        setList(nftCollection)
      } catch (error) {
        console.error('fetch user nfts error', error)
      }
    }
    fun()
  }, [account, chainId, isERC721])
  const res = useMemo(() => ({ loading: isLoading, data: list }), [isLoading, list])
  return res
}

export default use1155TokenList
