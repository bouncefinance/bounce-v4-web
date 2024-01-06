import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dialog as MuiDialog, DialogContent, Stack, Typography, DialogTitle, IconButton, MenuItem } from '@mui/material'
import { NiceModalHocProps, show } from '@ebay/nice-modal-react'
import { ReactComponent as CloseSVG } from '../../bounceComponents/common/DialogConfirmation/assets/close.svg'
import StakeInput from 'pages/launchpadCoin/components/stakeInput'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useActiveWeb3React } from 'hooks'
import { ChainId } from 'constants/chain'
import { BalanceTitle, CancelBtnStyle, ConfirmBtnStyle, GrayTitle } from '../../bounceComponents/common/CoinInputDialog'
import Select from 'components/Select/Select'
import useBreakpoint from 'hooks/useBreakpoint'
import LogoText from 'components/LogoText'
import Image from 'components/Image'
import Icon1 from 'assets/imgs/nftLottery/tokenInformation/token-icon1.svg'
import { useCurrencyBalance, useToken } from 'state/wallet/hooks'
import { RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES } from '../../constants'
import { useTransactionModalWrapper } from 'hooks/useTransactionModalWrapper'
import { CurrencyAmount } from 'constants/token'
import { hideDialogConfirmation, showWaitingTxDialog } from 'utils/auction'
import { Contract } from 'ethers'
import DialogTips from 'bounceComponents/common/DialogTips'
import { DialogTipsWhiteTheme } from 'bounceComponents/common/DialogTips/DialogDarkTips'
import { MultiTokenResultType } from 'bounceHooks/launchpad/useLaunchpadCoinInfo'
import { getIcon } from 'pages/nftLottery/sections/tokenInformation/config'

export interface DialogProps {
  poolInfo: MultiTokenResultType | undefined
  onClose: () => void
  open: boolean
  setOpenDialog: () => void
  showLoginModal: () => void
  switchNetwork: () => void
  contract: Contract | null
  poolId: number
}

const StakeAuctionInputDialog: React.FC<DialogProps & NiceModalHocProps> = (props: DialogProps) => {
  const { poolInfo, onClose, open, showLoginModal, switchNetwork, poolId, contract, ...rest } = props
  const { account, chainId: _chainId } = useActiveWeb3React()
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const [amount, setAmount] = useState('')
  const isDownSm = useBreakpoint('sm')
  const [userStakedAddress, setUserStakedAddress] = useState<string>('')
  const selectedToken =
    useToken(
      userStakedAddress ? userStakedAddress : poolInfo?.token1StakedStats?.token1sCurrency?.[selectedIdx].address || '',
      poolInfo?.poolInfo?.chainId
    ) || undefined
  const token1CurrencyAmount = useMemo(() => {
    if (!selectedToken) return undefined
    return CurrencyAmount.fromAmount(selectedToken, amount)
  }, [amount, selectedToken])
  const userTokenBalance = useCurrencyBalance(account, selectedToken, poolInfo?.poolInfo?.chainId)
  const dataList = useMemo(() => {
    const ret = poolInfo?.token1StakedStats?.token1sCurrency?.map(item => ({
      ...item,
      logo: getIcon(item.symbol?.toLocaleUpperCase())
    }))
    return ret
  }, [poolInfo?.token1StakedStats?.token1sCurrency])
  const [approvalState, , approveCallback] = useApproveCallback(
    token1CurrencyAmount,
    RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES[poolInfo?.poolInfo?.chainId || ChainId.MAINNET]
  )
  const handleClose = useCallback(() => {
    onClose()
    setAmount('')
  }, [onClose])

  useEffect(() => {
    if (poolInfo) {
      if (poolInfo.myStakeToken1WeightAmountMap?.myStakeToken1WeightAmounts?.some(item => item.greaterThan('0'))) {
        const idx = poolInfo.myStakeToken1WeightAmountMap?.myStakeToken1WeightAmounts.findIndex(item =>
          item.greaterThan('0')
        )
        setUserStakedAddress(poolInfo.myStakeToken1WeightAmountMap.myStakeToken1WeightTokenAddr[idx])
      }
    }
  }, [poolInfo])

  useEffect(() => {
    setUserStakedAddress('')
    setSelectedIdx(0)
  }, [account])
  const approveFn = useTransactionModalWrapper(approveCallback, { isApprove: true })

  const toCommit = useCallback(async () => {
    if (!token1CurrencyAmount || !contract || !selectedToken) return
    showWaitingTxDialog(() => {
      hideDialogConfirmation()
    })
    try {
      const params = [poolId, selectedToken.address, token1CurrencyAmount.raw.toString()]
      const res = await contract.commit(...params)
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
            content: `You have successfully staked ${token1CurrencyAmount.toSignificant()} ${selectedToken?.symbol}`,
            PaperProps: {
              sx: DialogTipsWhiteTheme
            },
            onCancel: () => {
              handleClose()
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
        onAgain: approvalState !== ApprovalState.APPROVED ? approveFn : toCommit,
        PaperProps: {
          sx: DialogTipsWhiteTheme
        }
      })
    }
  }, [approvalState, approveFn, contract, handleClose, poolId, selectedToken, token1CurrencyAmount])

  const confirmBtn = useMemo(() => {
    if (!account) {
      return (
        <ConfirmBtnStyle onClick={() => showLoginModal()} sx={{ flex: 2 }}>
          Connect Wallet
        </ConfirmBtnStyle>
      )
    }
    // if (chainId !== ChainId.MAINNET) {
    //   return (
    //     <ConfirmBtnStyle onClick={() => switchNetwork()} sx={{ flex: 2 }}>
    //       Switch network
    //     </ConfirmBtnStyle>
    //   )
    // }
    if (_chainId !== poolInfo?.poolInfo?.chainId) {
      return (
        <ConfirmBtnStyle onClick={() => switchNetwork()} sx={{ flex: 2 }}>
          Switch network
        </ConfirmBtnStyle>
      )
    }
    if (!amount || !Number(amount)) {
      return (
        <ConfirmBtnStyle disabled sx={{ flex: 2 }}>
          Confirm
        </ConfirmBtnStyle>
      )
    }
    if (token1CurrencyAmount && userTokenBalance && token1CurrencyAmount.greaterThan(userTokenBalance)) {
      return (
        <ConfirmBtnStyle disabled sx={{ flex: 2 }}>
          Insufficient Balance
        </ConfirmBtnStyle>
      )
    }
    if (approvalState !== ApprovalState.APPROVED) {
      return (
        <ConfirmBtnStyle onClick={() => approveFn()} sx={{ flex: 2 }}>
          Approve
        </ConfirmBtnStyle>
      )
    }
    if (token1CurrencyAmount && userTokenBalance && open && !token1CurrencyAmount.greaterThan(userTokenBalance)) {
      return (
        <ConfirmBtnStyle sx={{ flex: 2 }} onClick={() => toCommit()}>
          Confirm
        </ConfirmBtnStyle>
      )
    }
    return (
      <ConfirmBtnStyle disabled sx={{ flex: 2 }}>
        Confirm
      </ConfirmBtnStyle>
    )
  }, [
    _chainId,
    account,
    amount,
    approvalState,
    approveFn,
    open,
    poolInfo?.poolInfo?.chainId,
    showLoginModal,
    switchNetwork,
    toCommit,
    token1CurrencyAmount,
    userTokenBalance
  ])
  return (
    <MuiDialog
      onClose={() => handleClose()}
      sx={{
        '& .MuiDialog-paper': {
          width: 480,
          borderRadius: 20,
          pl: 30,
          pr: 40
        }
      }}
      open={open}
      {...Object.assign(rest)}
    >
      <IconButton
        color="primary"
        aria-label="dialog-close"
        sx={{ position: 'absolute', right: 12, top: 12 }}
        onClick={() => handleClose()}
      >
        <CloseSVG />
      </IconButton>

      <DialogTitle sx={{ position: 'relative', padding: '50px 0 0px' }}>
        <Stack spacing={4} justifyContent="center" alignItems="center">
          <Typography variant="h2" sx={{ fontWeight: 500, textAlign: 'center' }}>
            Stake
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ py: 48, px: 6, paddingTop: '48px !important' }}>
        <>
          {userStakedAddress === '' && (
            <Stack mb={48} width={'inherit'}>
              <Select
                defaultValue={poolInfo?.poolInfo?.chainId ?? undefined}
                value={poolInfo?.poolInfo?.chainId ?? undefined}
                height={'54px'}
                style={{
                  width: '100%',
                  background: '#fff',
                  border: '1px solid var(--ps-gray-20)',
                  '&: hover': {
                    borderColor: 'var(--ps-yellow-1)'
                  },
                  '& .Mui-disabled.MuiSelect-select.MuiInputBase-input': {
                    paddingRight: isDownSm ? 0 : 10,
                    color: theme => theme.palette.text.primary,
                    WebkitTextFillColor: theme => theme.palette.text.primary
                  },
                  '&.Mui-focused': {
                    borderColor: 'var(--ps-yellow-1)'
                  }
                }}
                renderValue={() => (
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing={16}>
                    <Image src={dataList?.[selectedIdx]?.logo || ''} width={32} />
                    <Typography>{dataList?.[selectedIdx]?.symbol}</Typography>
                  </Stack>
                )}
              >
                {dataList?.map((option, index) => (
                  <MenuItem
                    onClick={() => {
                      setSelectedIdx(index)
                    }}
                    value={option.address}
                    key={option.address}
                    selected={selectedIdx === index}
                  >
                    <LogoText
                      logo={option.logo || Icon1}
                      text={option.symbol?.toLocaleUpperCase()}
                      gapSize={'small'}
                      fontSize={14}
                    />
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          )}
          <Stack gap={12}>
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
              <GrayTitle>Amount</GrayTitle>
              <BalanceTitle>
                Available: {userTokenBalance?.toSignificant()} {userTokenBalance?.currency.symbol}
              </BalanceTitle>
            </Stack>
            <StakeInput
              value={amount}
              onChange={v => {
                setAmount(v)
              }}
              token1Balance={userTokenBalance}
            />
          </Stack>
        </>
      </DialogContent>
      <Stack flexDirection={'row'} alignItems={'center'} gap={12} mb={40}>
        <CancelBtnStyle style={{ flex: 1 }} onClick={() => handleClose()}>
          Cancel
        </CancelBtnStyle>
        {confirmBtn}
      </Stack>
    </MuiDialog>
  )
}

export default StakeAuctionInputDialog
