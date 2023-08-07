import { Stack, Typography } from '@mui/material'
import Image from 'components/Image'
import GreenWarn from 'assets/imgs/auction/green-warn.png'

const Notification = () => (
  <Stack
    mt={32}
    sx={{
      padding: 16,
      background: '#F9FCDE',
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16
    }}
  >
    <Image src={GreenWarn} style={{ width: 27, height: 24 }} />
    <Typography
      sx={{
        maxWidth: 500,
        color: '#908E96',
        leadingTrim: 'both',
        textEdge: 'cap',
        fontFamily: 'Inter',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%'
      }}
    >
      <span style={{ color: '#171717' }}>Please pay attention.</span> You can cancel your pool before it goes live. But
      you can’t cancel your pool when it is live and your tokens will be locked in the pool during the auction, so
      please choose all parameters wisely.
    </Typography>
  </Stack>
)

export default Notification
