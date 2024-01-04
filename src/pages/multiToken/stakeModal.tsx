import React, { useMemo, useState } from 'react'
import { Dialog as MuiDialog, DialogContent, Stack, Typography, DialogTitle, IconButton, MenuItem } from '@mui/material'
import { NiceModalHocProps } from '@ebay/nice-modal-react'
import { ReactComponent as CloseSVG } from '../../bounceComponents/common/DialogConfirmation/assets/close.svg'
import StakeInput from 'pages/launchpadCoin/components/stakeInput'
import { ApprovalState } from 'hooks/useApproveCallback'
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
import { CurrencyAmount } from 'constants/token'

export interface DialogProps {
  amount: string
  handleSetAmount: (v: string) => void
  onClose: () => void
  open: boolean
  confirm: () => void
  token1: CurrencyAmount | undefined
  toApprove: () => void
  approvalState: ApprovalState
  showLoginModal: () => void
  switchNetwork: () => void
}

const StakeAuctionInputDialog: React.FC<DialogProps & NiceModalHocProps> = (props: DialogProps) => {
  const {
    amount,
    handleSetAmount,
    onClose,
    open,
    confirm,
    token1,
    approvalState,
    showLoginModal,
    toApprove,
    switchNetwork,
    ...rest
  } = props
  const { account, chainId } = useActiveWeb3React()
  const _chainId = useMemo(() => {
    return ChainId.SEPOLIA
  }, [])
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const isDownSm = useBreakpoint('sm')
  const dataList = [
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
  ]
  const selectedToken = useToken(dataList[selectedIdx].address || '', _chainId) || undefined
  const userTokenBalance = useCurrencyBalance(account, selectedToken, _chainId)

  const handleClose = () => {
    onClose()
    handleSetAmount('')
  }
  const confirmBtn = useMemo(() => {
    if (!account) {
      return (
        <ConfirmBtnStyle onClick={() => showLoginModal()} sx={{ flex: 2 }}>
          Connect Wallet
        </ConfirmBtnStyle>
      )
    }
    if (chainId !== ChainId.MAINNET) {
      return (
        <ConfirmBtnStyle onClick={() => switchNetwork()} sx={{ flex: 2 }}>
          Switch network
        </ConfirmBtnStyle>
      )
    }
    // if (chainId !== ChainId.SEPOLIA) {
    //   return (
    //     <ConfirmBtnStyle onClick={() => switchNetwork()} sx={{ flex: 2 }}>
    //       Switch network
    //     </ConfirmBtnStyle>
    //   )
    // }
    if (!amount || !Number(amount)) {
      return (
        <ConfirmBtnStyle disabled sx={{ flex: 2 }}>
          Confirm
        </ConfirmBtnStyle>
      )
    }
    if (token1 && userTokenBalance && token1.greaterThan(userTokenBalance)) {
      return (
        <ConfirmBtnStyle disabled sx={{ flex: 2 }}>
          Insufficient Balance
        </ConfirmBtnStyle>
      )
    }
    if (approvalState !== ApprovalState.APPROVED) {
      return (
        <ConfirmBtnStyle onClick={() => toApprove()} sx={{ flex: 2 }}>
          Approve
        </ConfirmBtnStyle>
      )
    }
    if (token1 && userTokenBalance && open && !token1.greaterThan(userTokenBalance)) {
      return (
        <ConfirmBtnStyle sx={{ flex: 2 }} onClick={() => confirm()}>
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
    chainId,
    confirm,
    open,
    showLoginModal,
    switchNetwork,
    toApprove,
    token1,
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
          <Stack mb={48}>
            <Select
              defaultValue={chainId ?? undefined}
              value={chainId ?? undefined}
              width="100%"
              height={isDownSm ? '24px' : '54px'}
              style={{
                maxWidth: '100%',
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
                handleSetAmount(v)
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
