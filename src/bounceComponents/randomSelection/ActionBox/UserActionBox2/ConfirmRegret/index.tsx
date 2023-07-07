import { Box, Button, Stack, Typography } from '@mui/material'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import { FixedSwapPoolProp } from 'api/pool/type'
import RegretButton from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/ConfirmRegret/RegretButton'

export interface ConfirmRegretProps {
  regretAmount: string
  onCancel: () => void
  handleRegret: () => void
  isRegretting?: boolean
  poolInfo: FixedSwapPoolProp
}

const ConfirmRegret = ({
  regretAmount,
  onCancel,
  handleRegret,
  isRegretting,
  poolInfo
}: ConfirmRegretProps): JSX.Element => {
  return (
    <Box sx={{ mt: 24 }}>
      <Box sx={{ border: '1px solid #D1D4D8', borderRadius: 20, px: 16, py: 16 }}>
        <Typography variant="h5">Confirmation</Typography>
        <PoolInfoItem title="Regret amount" sx={{ mt: 8 }}>
          <Typography>
            {regretAmount} {poolInfo.token1.symbol}
          </Typography>
        </PoolInfoItem>
      </Box>

      <Stack direction="row" spacing={8} sx={{ mt: 24 }}>
        <Button variant="outlined" fullWidth onClick={onCancel}>
          Cancel
        </Button>
        <RegretButton onClick={handleRegret} loading={isRegretting} />
      </Stack>
    </Box>
  )
}

export default ConfirmRegret
