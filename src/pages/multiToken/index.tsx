import { ProjectHead, Tabs } from 'pages/projectIntro'
import { Port3Data, IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import FooterPc from 'components/Footer/FooterPc'
import { useRandomSelectionMultiTokenContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import { RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES } from 'constants/index'
import { ChainId } from 'constants/chain'
import { StakeButton } from 'pages/launchpadCoin/Step'
import DialogTips, { DialogTipsWhiteTheme } from 'bounceComponents/common/DialogTips/DialogDarkTips'
import { show } from '@ebay/nice-modal-react'
import { hideDialogConfirmation, showWaitingTxDialog } from 'utils/auction'
import { useCallback } from 'react'
import OtherProjectTab from 'pages/projectIntro/components/otherProjectTab'
import { Box } from '@mui/material'
import { useGetStakingAuctionInfo } from './useStakingInfo'
import Header from './header'
import Charts from './charts'
import { Steps } from './Step'
const Page = () => {
  const poolId = 4
  const item = PrivatePadDataList.find(i => i.keyId === 23) as IPrivatePadProp
  const { account, chainId: _chainId } = useActiveWeb3React()
  // const chainId = ChainId.MAINNET
  const chainId = _chainId || ChainId.SEPOLIA
  const nowTime = () => new Date().getTime()
  const contractAddress = RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES[chainId]
  const contract = useRandomSelectionMultiTokenContract(contractAddress, chainId)
  const coinInfo = useGetStakingAuctionInfo(contract, poolId, account)

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

  return (
    <>
      <ProjectHead item={Port3Data} />
      <Box sx={{ width: '100%' }} style={{ background: '#f5f5f1' }}>
        <Box
          padding={{ xs: '0 16px', md: '20px 72px' }}
          sx={{ width: '100%', maxWidth: 1440, margin: '0 auto' }}
          mt={{ xs: 110, md: 180 }}
        >
          <Header coinInfo={coinInfo} />
          <Charts coinInfo={coinInfo} />
          <Steps coinInfo={coinInfo} contract={contract} poolId={poolId} />
        </Box>
      </Box>
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
      <Tabs item={Port3Data} hideTitle />
      {item.otherProject && <OtherProjectTab item={item} />}
      <FooterPc />
    </>
  )
}
export default Page
