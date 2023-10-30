import { Box, Stack, Typography, Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material'

import { PoolType } from 'api/pool/type'

import Image from 'components/Image'
import TokenImage from 'bounceComponents/common/TokenImage'
import { ChainListMap, ChainId } from 'constants/chain'

import { shortenAddress } from 'utils'

import { IPoolInfoParams } from 'pages/launchpad/create-launchpad/type'

import { ConfirmationInfoItem } from 'bounceComponents/create-auction-pool/Creation1155Confirmation'
import useTokenList from 'bounceHooks/auction/useTokenList'
import moment from 'moment'
import AuctionNotification from 'bounceComponents/create-auction-pool/AuctionNotification'
import { tokenReleaseTypeText } from 'bounceComponents/create-auction-pool/CreationConfirmation'
import { useToken } from 'state/wallet/hooks'
import { Currency, CurrencyAmount } from 'constants/token'

import CloseIcon from '@mui/icons-material/Close'
import CreatePoolButton from './CreatePoolButton'
const ConfirmationSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[900],
  opacity: 0.5,
  textTransform: 'capitalize'
}))
const CreatePoolDialog = ({
  show,
  poolInfo,
  setShow
}: {
  show: boolean
  poolInfo: IPoolInfoParams
  setShow: (v: boolean) => void
}) => {
  const { tokenList } = useTokenList(poolInfo.chainId, 2, '', true)
  const token1 = tokenList.find(item => item.address === poolInfo.token1)
  const token1Currency = useToken(token1?.address || '', token1?.chainId)
  const token0Currency = useToken(poolInfo.token0 || '', poolInfo.chainId)
  return (
    <Dialog
      sx={{
        maxHeight: '85vh',
        overflow: 'auto',
        '& ::-webkit-scrollbar': {
          display: 'none'
        },
        '& .MuiDialog-paper': {
          width: 'max-content',
          height: 'max-content',
          borderRadius: 20
        }
      }}
      open={show}
      onClose={() => setShow(false)}
    >
      <DialogTitle id="customized-dialog-title">
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Creation confirmation
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setShow(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', pb: 48, width: 'fit-content', px: { xs: 16, md: 0 } }}>
            <Box sx={{ borderRadius: '20px', border: '1px solid #D7D6D9', px: 24, py: 30 }}>
              <Typography variant="h3" sx={{ fontSize: 16, mb: 24 }}>
                {poolInfo.name} Fixed-price Pool
              </Typography>

              <Stack spacing={24}>
                <ConfirmationInfoItem title="Chain">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={poolInfo.chainId ? ChainListMap[poolInfo.chainId as ChainId]?.logo || '' : ''}
                      alt={poolInfo.chainId ? ChainListMap[poolInfo.chainId as ChainId]?.name : ''}
                      width={20}
                      height={20}
                    />
                    <Typography sx={{ ml: 4 }}>
                      {poolInfo.chainId ? ChainListMap[poolInfo.chainId as ChainId]?.name : ''}
                    </Typography>
                  </Box>
                </ConfirmationInfoItem>

                <Box>
                  <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                    Token Information
                  </Typography>

                  <Stack spacing={15}>
                    <ConfirmationInfoItem title="Token Contract address">
                      <Typography>{shortenAddress(poolInfo.token0 || '')}</Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Token symbol">
                      <Stack direction="row" spacing={8} alignItems="center">
                        {!!token0Currency ? (
                          <>
                            <TokenImage alt={token0Currency?.symbol} src={token0Currency?.logo || ''} size={20} />
                            <Typography>{token0Currency?.symbol}</Typography>
                          </>
                        ) : (
                          '-- --'
                        )}
                      </Stack>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Token decimal">
                      {!!token0Currency ? <Typography>{token0Currency?.decimals}</Typography> : '--'}
                    </ConfirmationInfoItem>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                    Auction Parameters
                  </Typography>

                  <Stack spacing={15}>
                    <ConfirmationInfoItem title="Pool type">
                      <Typography>{PoolType[poolInfo.category]}</Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="To">
                      <Stack direction="row" spacing={8} alignItems="center">
                        <TokenImage alt={token1?.symbol} src={token1?.logoURI || token1?.smallUrl} size={20} />
                        <Typography>{token1?.symbol}</Typography>
                      </Stack>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Swap Ratio">
                      <Typography>
                        1 {poolInfo.token0Symbol} = {poolInfo.ratio} {token1?.symbol}
                      </Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Amount">
                      <Typography>{poolInfo.totalAmount0}</Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Allocation per Wallet">
                      <Typography>
                        {Number(poolInfo.maxAmount1PerWallet) > 0
                          ? `Limit ${
                              token1Currency
                                ? CurrencyAmount.fromAmount(
                                    token1Currency,
                                    poolInfo.maxAmount1PerWallet || ''
                                  )?.toSignificant()
                                : 0
                            } ${token1?.symbol}`
                          : 'No'}
                      </Typography>
                    </ConfirmationInfoItem>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                    Advanced Settings
                  </Typography>

                  <Stack spacing={15}>
                    <ConfirmationInfoItem title="Pool duration">
                      <Typography>
                        From {moment((poolInfo.openAt as number) * 1000)?.format('MM.DD.Y HH:mm')} - To{' '}
                        {moment((poolInfo.closeAt as number) * 1000)?.format('MM.DD.Y HH:mm')}
                      </Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Participant">
                      <Typography>{poolInfo.whitelistEnabled ? 'Whitelist' : 'Public'}</Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Unlocking Token Type">
                      <Typography>
                        {tokenReleaseTypeText(poolInfo.releaseType)}
                        {/* {values.delayUnlockingTime ? values.delayUnlockingTime.format('MM:DD:Y HH:mm') : 'No'} */}
                      </Typography>
                    </ConfirmationInfoItem>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <AuctionNotification />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 32, width: '100%' }}>
              {token1Currency && token0Currency ? (
                <CreatePoolButton
                  poolInfo={poolInfo}
                  currencyTo={token1Currency as Currency | undefined}
                  currencyFrom={token0Currency as Currency | undefined}
                />
              ) : (
                <Typography sx={{ color: '#FD3333' }}>
                  Please check if the token address is present or correct
                </Typography>
              )}
              <ConfirmationSubtitle sx={{ mt: 12 }}>Transaction Fee is 2.5%</ConfirmationSubtitle>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
export default CreatePoolDialog
