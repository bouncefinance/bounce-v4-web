import { ProjectHead, Tabs } from 'pages/projectIntro'
import { AmmxDaiiData, IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import FooterPc from 'components/Footer/FooterPc'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { useStakeTokenWithTimeWeightContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import { STAKE_TOKEN_WITH_TIME_WEIGHT_CONTRACT_ADDRESSES } from 'constants/index'
import { ChainId } from 'constants/chain'
import { StakeButton } from 'pages/launchpadCoin/Step'
import DialogTips, { DialogTipsWhiteTheme } from 'bounceComponents/common/DialogTips/DialogDarkTips'
import { show } from '@ebay/nice-modal-react'
import { hideDialogConfirmation, showWaitingTxDialog } from 'utils/auction'
import { useCallback } from 'react'
import OtherProjectTab from 'pages/projectIntro/components/otherProjectTab'
import { Box } from '@mui/material'
import { useGetStakingAuctionInfo, useTokenInfo } from './useStakingInfo'
import Header from './header'
import Charts from './charts'
import { Steps } from './Step'
const Page = () => {
  const poolId = 2
  const item = PrivatePadDataList.find(i => i.keyId === 24) as IPrivatePadProp
  const { account } = useActiveWeb3React()
  const chainId = ChainId.MAINNET
  const nowTime = () => new Date().getTime()
  const contract = useStakeTokenWithTimeWeightContract(chainId)
  const { token0Amount: token0, token1 } = useTokenInfo()
  const [approvalState] = useApproveCallback(token0, STAKE_TOKEN_WITH_TIME_WEIGHT_CONTRACT_ADDRESSES[chainId])
  const coinInfo = useGetStakingAuctionInfo(contract, poolId, account)

  const params: any = [
    token0?.currency.address,
    token1.address,
    '472500000000000000000000000',
    '450000000000000000000000',
    1703390400,
    1703736000,
    1703736000,
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
      <ProjectHead item={AmmxDaiiData} />
      <Box sx={{ width: '100%' }} style={{ background: '#f5f5f1' }}>
        <Box
          padding={{ xs: '0 16px', md: '20px 72px' }}
          sx={{ width: '100%', maxWidth: 1440, margin: '0 auto' }}
          mt={{ xs: 50, md: 80 }}
        >
          <Header />
          <Charts />
          <Steps coinInfo={coinInfo} contract={contract} poolId={poolId} />
        </Box>
      </Box>

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
      <Tabs item={AmmxDaiiData} hideTitle />
      {item.otherProject && <OtherProjectTab item={item} />}
      <FooterPc />
    </>
  )
}
export default Page
