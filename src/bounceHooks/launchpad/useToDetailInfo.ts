import { useMemo } from 'react'
import useTokenList from 'bounceHooks/auction/useTokenList'
import {
  IDetailInitValue,
  IFragmentReleaseTimes,
  IPoolInfoParams,
  ParticipantStatus
} from '../../pages/launchpad/create-launchpad/type'
import { useOptionDatas } from 'state/configOptions/hooks'
import { getLabelById } from 'utils'
import moment from 'moment'
import { AllocationStatus, IReleaseType } from 'bounceComponents/create-auction-pool/types'
export const useToDetailInfo = (values: IPoolInfoParams) => {
  const { chainInfoOpt } = useOptionDatas()
  const ethChainId = getLabelById(values.chainId, 'ethChainId', chainInfoOpt || [])
  const { tokenList } = useTokenList(ethChainId, 2, '', true)
  const token1 = tokenList.find(item => item.address === values.token1)
  const poolInfo = useMemo(() => {
    const info = {
      id: values.id,
      ChainId: chainInfoOpt?.find(i => values.chainId === i.id)?.ethChainId,
      TokenName: values.token0Name,
      AuctionType: values.category,
      name: values.name,
      projectPicture: values.picture1,
      projectMobilePicture: values.picture2,
      creator: values.creator,
      releaseType: values.releaseType,
      allocationStatus: Number(values.maxAmount1PerWallet) > 0 ? AllocationStatus.Limited : AllocationStatus.NoLimits,
      allocationPerWallet: Number(values.maxAmount1PerWallet) > 0 ? values.maxAmount1PerWallet : '',
      ContractAddress: values.token0,
      ContractDecimalPlaces: values.token0Decimals,
      TotalSupply: values.totalAmount0,
      Token: token1,
      TokenLogo: values.token0Logo,
      SwapRatio: values.ratio,
      startTime: values.openAt ? moment(values.openAt) : null,
      endTime: values.closeAt ? moment(values.closeAt) : null,
      isRefundable: values.reverseEnabled,
      whitelist: values.whitelistAddresses,
      participantStatus: values.whitelistEnabled ? ParticipantStatus.Whitelist : ParticipantStatus.Public,
      status: values.status,
      delayUnlockingTime: null,
      linearUnlockingStartTime: null,
      linearUnlockingEndTime: null,
      fragmentReleaseTimes: [{ startAt: null, radio: '0' }]
    } as IDetailInitValue
    if (values.releaseType === IReleaseType.Cliff) {
      info.delayUnlockingTime = values.releaseData[0].startAt ? moment(values.releaseData[0].startAt) : null
    }
    if (values.releaseType === IReleaseType.Linear) {
      info.linearUnlockingStartTime = values.releaseData[0].startAt ? moment(values.releaseData[0].startAt) : null
      info.linearUnlockingEndTime = values.releaseData[0].endAtOrRatio
        ? moment(values.releaseData[0].endAtOrRatio)
        : null
    }
    if (values.releaseType === IReleaseType.Fragment) {
      const fragment = values.releaseData.map<IFragmentReleaseTimes>(item => ({
        startAt: item.startAt ? moment(item.startAt) : null,
        radio: `${item.endAtOrRatio}`
      }))
      info.fragmentReleaseTimes = fragment
    }
    return info
  }, [chainInfoOpt, token1, values])
  console.log('poolInfo')
  console.log(poolInfo)

  return { poolInfo }
}
