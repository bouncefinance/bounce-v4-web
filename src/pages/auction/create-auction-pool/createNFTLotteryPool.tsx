import { Box, Button, OutlinedInput } from '@mui/material'
import { getPoolCreationSignature } from 'api/pool'
import { PoolType } from 'api/pool/type'
import FormItem from 'bounceComponents/common/FormItem'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { ChainId } from 'constants/chain'
import { RANDOM_SELECTION_NFT_CONTRACT_ADDRESSES, ZERO_ADDRESS } from 'constants/index'
import { Formik } from 'formik'
import { useActiveWeb3React } from 'hooks'
import { useRandomSelectionNFTContract } from 'hooks/useContract'
import { useCallback } from 'react'

interface IParam {
  name: string
  token0: string
  token1: string
  amountTotal0: string
  amount1PerWallet: string
  openAt: number
  closeAt: number
  claimAt: number
  maxPlayer: string
  nShare: string
  mintContract: string
  whitelistRoot: string
}

const initParams: IParam = {
  name: 'test',
  token0: '0x5c58eC0b4A18aFB85f9D6B02FE3e6454f988436E',
  token1: '0xc390E699b38F14dB884C635bbf843f7B135113ad',
  amountTotal0: '100',
  amount1PerWallet: '1000',
  openAt: 1703591307,
  closeAt: 1703591907,
  claimAt: 1703591907,
  maxPlayer: '1000',
  nShare: '100',
  mintContract: '0x4EE6f702aa8d95b23DCb845dBd4eaA73b88791E8',
  whitelistRoot: ''
  //   enableAuctionHolder: false
}
const useCreatePool = () => {
  const contractAddress = RANDOM_SELECTION_NFT_CONTRACT_ADDRESSES[ChainId.SEPOLIA]
  const contract = useRandomSelectionNFTContract(contractAddress, ChainId.SEPOLIA)
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', ChainId.SEPOLIA || '')
  return useCallback(
    async (body: IParam & { creator: string }) => {
      if (!contract || !chainConfigInBackend) {
        return
      }

      const merkleroot = ZERO_ADDRESS

      //   if (body.whitelistRoot.split(',').length > 0) {
      //     const whitelistParams: GetWhitelistMerkleTreeRootParams = {
      //       addresses: body.whitelistRoot.split(','),
      //       category: PoolType.LOTTERY_NFT,
      //       chainId: chainConfigInBackend.id
      //     }
      //     const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      //     merkleroot = data.merkleroot
      //   }

      const signatureParams = {
        amountTotal0: body.amountTotal0,
        category: PoolType.LOTTERY_NFT,
        chainId: 5,
        claimAt: body.claimAt,
        closeAt: body.closeAt,
        creator: body.creator,
        maxAmount1PerWallet: body.amount1PerWallet,
        merkleroot: merkleroot,
        maxPlayer: Number(body.maxPlayer),
        name: body.name,
        openAt: body.openAt,
        token0: body.token0,
        token1: body.token1,
        totalShare: body.nShare
        // releaseType: params.releaseType,
        // releaseData: params.releaseData
      }
      const {
        data: { id, expiredTime, signature }
      } = await getPoolCreationSignature(signatureParams)
      const _body = { ...body, whitelistRoot: merkleroot }
      const arg = [id, _body, false, expiredTime, signature]
      try {
        const res = await contract.createV2(arg)
        console.log('error-res', res)
      } catch (error) {
        console.log('error-res', error)
      }
    },
    [chainConfigInBackend, contract]
  )
}
const CreateNFTLotteryPool = () => {
  const { account } = useActiveWeb3React()
  const create = useCreatePool()
  const onSubmit = (values: IParam) => {
    console.log('onSubmit', create, values)
    create({ ...initParams, creator: account || '' })
  }
  // 0x5c58eC0b4A18aFB85f9D6B02FE3e6454f988436E
  //   0xc390E699b38F14dB884C635bbf843f7B135113ad
  return (
    <Box>
      <Formik onSubmit={onSubmit} initialValues={initParams}>
        {({ handleSubmit }) => {
          return (
            <Box component={'form'} onSubmit={handleSubmit}>
              <FormItem name={'name'} label="pool name">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'token0'} label="token0 address">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'token1'} label="token1 address">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'amountTotal0'} label="amount total0">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'amount1PerWallet'} label="amount1 perWallet">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'openAt'} label="openAt">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'closeAt'} label="closeAt">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'claimAt'} label="claimAt">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'maxPlayer'} label="maxPlayer">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'nShare'} label="nShare">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'mintContract'} label="mintContract">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'whitelistRoot'} label="whitelistRoot">
                <OutlinedInput placeholder={''} />
              </FormItem>

              <Button type="submit">Submit</Button>
            </Box>
          )
        }}
      </Formik>
    </Box>
  )
}

export default CreateNFTLotteryPool
