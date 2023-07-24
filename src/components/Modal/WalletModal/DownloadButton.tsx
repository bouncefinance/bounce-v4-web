import { Button } from '@mui/material'
import { useCallback } from 'react'
import { isIOS } from 'utils/userAgent'

const APP_STORE_LINK = 'https://apps.apple.com/app/apple-store/id6443944476?pt=123625782&ct=In-App-Banners&mt=8'
const MICROSITE_LINK = 'https://wallet.uniswap.org/'

const openAppStore = () => {
  window.open(APP_STORE_LINK, /* target = */ 'uniswap_wallet_appstore')
}
export const openWalletMicrosite = () => {
  window.open(MICROSITE_LINK, /* target = */ 'uniswap_wallet_microsite')
}

export function openDownloadApp() {
  if (isIOS) openAppStore()
  else openWalletMicrosite()
}

// Launches App Store if on an iOS device, else navigates to Uniswap Wallet microsite
export function DownloadButton({ onClick, text = 'Download' }: { onClick?: () => void; text?: string }) {
  const onButtonClick = useCallback(() => {
    // handles any actions required by the parent, i.e. cancelling wallet connection attempt or dismissing an ad
    onClick?.()
    openDownloadApp()
  }, [onClick])

  return (
    <Button
      sx={{
        height: 30
      }}
      variant="contained"
      onClick={onButtonClick}
    >
      {text}
    </Button>
  )
}
