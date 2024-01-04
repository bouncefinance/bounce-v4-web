import React, { useCallback, useMemo, useState } from 'react'
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
import Icon2 from 'assets/imgs/nftLottery/tokenInformation/token-icon2.svg'
import Icon3 from 'assets/imgs/nftLottery/tokenInformation/token-icon3.svg'
import Icon4 from 'assets/imgs/nftLottery/tokenInformation/token-icon4.svg'
import Icon5 from 'assets/imgs/nftLottery/tokenInformation/token-icon5.png'
import { useCurrencyBalance, useToken } from 'state/wallet/hooks'
import { RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES } from '../../constants'
import { useTransactionModalWrapper } from 'hooks/useTransactionModalWrapper'
import { CurrencyAmount } from 'constants/token'
import { hideDialogConfirmation, showWaitingTxDialog } from 'utils/auction'
import { Contract } from 'ethers'
import DialogTips from 'bounceComponents/common/DialogTips'
import { DialogTipsWhiteTheme } from 'bounceComponents/common/DialogTips/DialogDarkTips'

export interface DialogProps {
  onClose: () => void
  open: boolean
  setOpenDialog: () => void
  showLoginModal: () => void
  switchNetwork: () => void
  contract: Contract | null
  poolId: number
}

const StakeAuctionInputDialog: React.FC<DialogProps & NiceModalHocProps> = (props: DialogProps) => {
  const { onClose, open, showLoginModal, switchNetwork, poolId, contract, ...rest } = props
  const { account, chainId } = useActiveWeb3React()
  const _chainId = useMemo(() => {
    return ChainId.SEPOLIA
  }, [])
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const [amount, setAmount] = useState('')
  const isDownSm = useBreakpoint('sm')
  const dataList = useMemo(
    () => [
      {
        id: 0,
        name: 'AUCTION',
        symbol: 'AUCTION',
        logo: Icon1,
        address: '0xc390E699b38F14dB884C635bbf843f7B135113ad'
      },
      {
        id: 1,
        name: 'MUBI',
        symbol: 'MUBI',
        logo: Icon2,
        address: '0x5c58eC0b4A18aFB85f9D6B02FE3e6454f988436E'
      },
      {
        id: 2,
        name: 'DAII',
        symbol: 'DAII',
        logo: Icon3,
        address: '0xB5D1924aD11D90ED1caaCE7C8792E8B5F6171C7E'
      },
      {
        id: 3,
        name: 'BSSB',
        symbol: 'BSSB',
        logo: Icon4,
        address: '0xe5260f95BCDe8E2727eaE13f6B17039E910c43F7'
      },
      {
        id: 4,
        name: 'AMMX',
        symbol: 'AMMX',
        logo: Icon5,
        address: '0xb575400Da99E13e2d1a2B21115290Ae669e361f0'
      }
    ],
    []
  )
  const [userStakedAddress, setUserStakedAddress] = useState<string>('')
  const selectedToken =
    useToken(userStakedAddress ? userStakedAddress : dataList[selectedIdx].address, _chainId) || undefined
  const token1CurrencyAmount = useMemo(() => {
    if (!selectedToken) return undefined
    return CurrencyAmount.fromAmount(selectedToken, amount)
  }, [amount, selectedToken])
  const userTokenBalance = useCurrencyBalance(account, selectedToken, _chainId)
  const [approvalState, approveCallback] = useApproveCallback(
    token1CurrencyAmount,
    RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES[_chainId]
  )
  const handleClose = useCallback(() => {
    onClose()
    setAmount('')
  }, [onClose])
  const approveFn = useTransactionModalWrapper(approveCallback as (...arg: any) => Promise<any>)

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
          setUserStakedAddress(dataList[selectedIdx].address)
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
  }, [
    approvalState,
    approveFn,
    contract,
    dataList,
    handleClose,
    poolId,
    selectedIdx,
    selectedToken,
    token1CurrencyAmount
  ])

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
    if (chainId !== ChainId.SEPOLIA) {
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
    account,
    amount,
    approvalState,
    approveFn,
    chainId,
    open,
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
          <Stack mb={48} width={'inherit'}>
            <Select
              defaultValue={chainId ?? undefined}
              value={chainId ?? undefined}
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
                  <Image src={dataList[selectedIdx]?.logo || ''} width={32} />
                  <Typography>{dataList[selectedIdx]?.symbol}</Typography>
                </Stack>
              )}
            >
              {dataList.map((option, index) => (
                <MenuItem
                  onClick={() => {
                    setSelectedIdx(index)
                  }}
                  value={option.id}
                  key={option.id}
                  selected={selectedIdx === option.id}
                >
                  <LogoText logo={option.logo} text={option.name} gapSize={'small'} fontSize={14} />
                </MenuItem>
              ))}
            </Select>
          </Stack>
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
