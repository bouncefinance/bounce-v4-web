import { ProjectHead, Tabs } from 'pages/projectIntro'
import { AmmxAuctionData } from 'pages/launchpad/PrivatePadDataList'
import FooterPc from 'components/Footer/FooterPc'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { useStakeTokenWithTimeWeightContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import { STAKE_TOKEN_WITH_TIME_WEIGHT_CONTRACT_ADDRESSES } from 'constants/index'
import { ChainId } from 'constants/chain'
import { Steps } from './Step'
import { useGetStakingAuctionInfo, useTokenInfo } from './useStakingInfo'
import { StakeButton } from 'pages/launchpadCoin/Step'
import DialogTips, { DialogTipsWhiteTheme } from 'bounceComponents/common/DialogTips/DialogDarkTips'
import { show } from '@ebay/nice-modal-react'
import { hideDialogConfirmation, showWaitingTxDialog } from 'utils/auction'
import { useCallback } from 'react'

const Page = () => {
  const poolId = 12
  const { account } = useActiveWeb3React()
  // const chainId = ChainId.MAINNET
  const chainId = ChainId.SEPOLIA
  const nowTime = () => new Date().getTime()
  const contract = useStakeTokenWithTimeWeightContract(chainId)
  const { token0Amount: token0, token1 } = useTokenInfo()
  const [approvalState] = useApproveCallback(token0, STAKE_TOKEN_WITH_TIME_WEIGHT_CONTRACT_ADDRESSES[chainId])
  const coinInfo = useGetStakingAuctionInfo(contract, poolId, account)

  const params: any = [
    token0?.currency.address,
    token1.address,
    '10000000000000000000000',
    '100000000000000000000000',
    1703390400,
    1703649600,
    1703649600,
    1
  ]

  const toClaim = useCallback(async () => {
    if (!account || !contract || !coinInfo) return
    showWaitingTxDialog(() => {
      hideDialogConfirmation()
    })
    try {
      const params = [poolId]
      const res = await contract.creatorClaim(...params)
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        res.wait().then((curReceipt: any) => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            cancelBtn: 'Close',
            title: 'Success! ',
            content:
              nowTime() < Number(coinInfo.poolInfo?.openAt) * 1000
                ? `You have successfully cancelled`
                : 'You have successfully claimed',
            PaperProps: {
              sx: DialogTipsWhiteTheme
            }
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toClaim,
        PaperProps: {
          sx: DialogTipsWhiteTheme
        }
      })
    }
  }, [account, coinInfo, contract])

  const createPool = async () => {
    // if (approvalState !== ApprovalState.APPROVED) {
    //   await approveCallback()
    // }
    await contract?.create(params)
  }
  console.log('createPool', createPool, approvalState)

  return (
    <>
      <ProjectHead item={AmmxAuctionData} />
      <div style={{ background: '#f5f5f1' }}>
        <Steps coinInfo={coinInfo} contract={contract} poolId={poolId} />
      </div>
      {/* <StakeButton sx={{ margin: '20px 80px' }} onClick={() => createPool()}>
        Create Pool
      </StakeButton> */}
      <div style={{ width: '100%' }}>
        {coinInfo?.poolInfo &&
          account &&
          account === coinInfo.poolInfo.creator &&
          nowTime() > Number(coinInfo.poolInfo.releaseAt) * 1000 + Number(coinInfo.poolInfo.releaseDuration) * 1000 && (
            <StakeButton
              sx={{ margin: '20px auto' }}
              onClick={toClaim}
              disabled={account === undefined || coinInfo?.poolInfo?.creator !== account || coinInfo.creatorClaimed}
            >
              Creator Claim
            </StakeButton>
          )}
        {coinInfo?.poolInfo &&
          account &&
          account === coinInfo.poolInfo.creator &&
          nowTime() < Number(coinInfo.poolInfo.openAt) * 1000 && (
            <StakeButton
              sx={{ margin: '20px auto' }}
              onClick={toClaim}
              disabled={account === undefined || coinInfo?.poolInfo?.creator !== account || coinInfo.creatorClaimed}
            >
              Creator Cancel
            </StakeButton>
          )}
      </div>
      <Tabs item={AmmxAuctionData} />
      <FooterPc />
    </>
  )
}
export default Page
