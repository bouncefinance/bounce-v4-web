import { Button } from '@mui/material'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'

const SwitchNetworkButton = ({ targetChain, style }: { targetChain: number; style?: React.CSSProperties }) => {
  const switchNetwork = useSwitchNetwork()

  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ mt: 24, mb: 12, ...style }}
      onClick={() => {
        switchNetwork(targetChain)
      }}
    >
      Switch network
    </Button>
  )
}

export default SwitchNetworkButton
