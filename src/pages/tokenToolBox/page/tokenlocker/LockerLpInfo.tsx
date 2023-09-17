import { Box, styled } from '@mui/material'
import BackButton from '../../../../bounceComponents/common/BackButton'
import { ContainerBox } from '../tokenlocker/tokenLocker'
import { Body01, H4 } from '../../../../components/Text'
import { BoxSpaceBetween, SolidBtn } from '../disperse/disperse'
import { useParams } from 'react-router-dom'
import { useTokenLockInfo } from '../../../../bounceHooks/toolbox/useTokenLockInfo'
import useChainConfigInBackend from '../../../../bounceHooks/web3/useChainConfigInBackend'
import { useToken } from 'state/wallet/hooks'
import { ChainId } from 'constants/chain'
import { useMemo, useCallback } from 'react'
import moment from 'moment'
import { CurrencyAmount } from 'constants/token'
import { useCountDown } from 'ahooks'
import { useWithDrawByTokenLock } from 'hooks/useTokenTimelock'
import DialogTips from 'bounceComponents/common/DialogTips'
import { show } from '@ebay/nice-modal-react'
import { hideDialogConfirmation, showRequestApprovalDialog, showWaitingTxDialog } from 'utils/auction'
export default function TokenInfo() {
  const { chain, hash } = useParams()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', Number(chain) || '')
  const { data, loading } = useTokenLockInfo(chainConfigInBackend?.id || 0, hash)
  const tokenInfo = useToken(data?.token || data?.token0 || data?.token1 || '', chain as unknown as ChainId)
  const withDrawFn = useWithDrawByTokenLock(data?.deploy_contract || '', chainConfigInBackend?.ethChainId)
  const showAmount = useMemo(() => {
    return tokenInfo ? CurrencyAmount.fromRawAmount(tokenInfo, data?.amount || '0')?.toExact() : '--'
  }, [data?.amount, tokenInfo])
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: data?.lock_end ? data?.lock_end * 1000 : '--'
  })
  const toWithDraw = useCallback(async () => {
    showRequestApprovalDialog()
    try {
      const { transactionReceipt } = await withDrawFn()
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error(err)
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: typeof err === 'string' ? err : err?.error?.message || err?.message || 'Something went wrong',
        onAgain: toWithDraw
      })
    }
  }, [withDrawFn])
  if (loading) {
    return <></>
  }
  return (
    <ContainerBox>
      <BackButton />
      <Box
        sx={{
          borderRadius: '25px',
          background: '#fff',
          padding: '56px'
        }}
      >
        <GrayBg mb={'20px'}>
          <H4>Token Information</H4>
          <WhiteBg>
            <BottomLineBox>
              <Body01 sx={{ color: '#959595' }}>Chain</Body01>
              <Body01>{chainConfigInBackend?.chainName || '--'}</Body01>
            </BottomLineBox>
            <BottomLineBox>
              <Body01 sx={{ color: '#959595' }}>Contract address</Body01>
              <Body01>{tokenInfo?.address}</Body01>
            </BottomLineBox>
            <BottomLineBox>
              <Body01 sx={{ color: '#959595' }}>Token name</Body01>
              <Body01>{tokenInfo?.name}</Body01>
            </BottomLineBox>
            <FullSpaceBetweenBox>
              <Body01 sx={{ color: '#959595' }}>Token symbol</Body01>
              <Body01>{tokenInfo?.symbol}</Body01>
            </FullSpaceBetweenBox>
            <FullSpaceBetweenBox>
              <Body01 sx={{ color: '#959595' }}>Token decimal</Body01>
              <Body01>{tokenInfo?.decimals}</Body01>
            </FullSpaceBetweenBox>
          </WhiteBg>
        </GrayBg>
        <GrayBg>
          <H4>Lock Information</H4>
          <WhiteBg>
            <BottomLineBox>
              <Body01 sx={{ color: '#959595' }}>Title</Body01>
              <Body01>{data?.title || '--'}</Body01>
            </BottomLineBox>
            <BottomLineBox>
              <Body01 sx={{ color: '#959595' }}>Amount</Body01>
              <Body01>{showAmount}</Body01>
            </BottomLineBox>
            <BottomLineBox>
              <Body01 sx={{ color: '#959595' }}>Owner</Body01>
              <Body01>{data?.new_owner}</Body01>
            </BottomLineBox>
            <FullSpaceBetweenBox>
              <Body01 sx={{ color: '#959595' }}>Lock date</Body01>
              <Body01>
                {data?.lock_start ? moment(new Date(data?.lock_start * 1000)).format('YYYY-MM-DD HH:mm:ss') : '--'}
              </Body01>
            </FullSpaceBetweenBox>
            <FullSpaceBetweenBox>
              <Body01 sx={{ color: '#959595' }}>Unlock time</Body01>
              <Body01>
                {data?.lock_end ? moment(new Date(data?.lock_end * 1000)).format('YYYY-MM-DD HH:mm:ss') : '--'}
              </Body01>
            </FullSpaceBetweenBox>
          </WhiteBg>
          {countdown > 0 && (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                margin: '40px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {countdown > 0 ? (
                <>
                  <CountDownBg key={'banner0'}>{days}d</CountDownBg>
                  <CountDownBg key={'banner1'}>{hours}h</CountDownBg>
                  <CountDownBg key={'banner2'}>{minutes}m</CountDownBg>
                  <CountDownBg key={'banner3'}>{seconds}s</CountDownBg>
                </>
              ) : (
                <></>
              )}
            </Box>
          )}
          <SolidBtn
            style={{ width: '100%' }}
            onClick={() => {
              toWithDraw()
            }}
          >
            Withdraw
          </SolidBtn>
        </GrayBg>
      </Box>
    </ContainerBox>
  )
}

export const WhiteBg = styled(Box)`
  display: flex;
  padding: 12px 24px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 12px;
  background: var(--white-100, #fff);
`
export const FullSpaceBetweenBox = styled(BoxSpaceBetween)`
  width: 100%;
  padding: 20px 0;
`
export const GrayBg = styled(Box)`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-radius: 16px;
  background: var(--grey-06, #f6f6f3);
`
export const BottomLineBox = styled(BoxSpaceBetween)`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid var(--grey-05, #e8e9e4);
`
const CountDownBg = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  width: 60px;
  height: 60px;
  background: #e1f25c;
  backdrop-filter: blur(2px);
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #121212;
  font-family: Public Sans;
  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
    font-size: 14px;
  }
`
