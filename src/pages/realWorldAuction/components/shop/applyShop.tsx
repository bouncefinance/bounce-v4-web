import { Box, Typography, Button } from '@mui/material'
import { ReactComponent as LongArrowSvg } from 'assets/imgs/realworldShop/longArrow.svg'
import { useIsMDDown } from 'themes/useTheme'
import { routes } from 'constants/routes'

const ApplyShop = () => {
  const isMd = useIsMDDown()
  return (
    <Box
      sx={{
        width: '100%',
        padding: '120px 0',
        background: '#F6F6F3',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        sx={{
          width: '100%',
          maxWidth: isMd ? 'calc(100% - 32px)' : 843,
          margin: '0 auto',
          fontFamily: `'Instrument Serif'`,
          fontVariantNumeric: `'lining-nums proportional-nums'`,
          fontSize: isMd ? 32 : 64,
          lineHeight: isMd ? '41px' : '83px',
          fontWeight: 400,
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '40px'
        }}
      >
        The physical auction supports various auction mode.{' '}
      </Typography>
      <Typography
        sx={{
          width: '100%',
          maxWidth: 360,
          margin: '0 auto',
          fontFamily: `'Inter'`,
          fontSize: 14,
          fontWeight: 400,
          textAlign: 'center',
          marginBottom: isMd ? '40px' : '80px'
        }}
      >
        You are bidding for a physical backed NFTs and you can redeem it post auction
      </Typography>
      <Button
        variant="contained"
        href={routes.nftAuction.index}
        target={'_blank'}
        sx={{
          position: 'relative',
          height: isMd ? '37px' : '42px',
          lineHeight: isMd ? '37px' : '42px',
          borderRadius: isMd ? '37px' : '42px',
          '&:hover': {
            '.title': {
              color: '#fff'
            },
            svg: {
              width: '40px',
              height: '14px',
              path: {
                stroke: '#fff'
              }
            }
          }
        }}
      >
        <Typography
          className="title"
          sx={{
            marginRight: '10px',
            color: '#121212',
            fontSize: isMd ? '14px' : '16px',
            fontFamily: `'Public Sans'`,
            fontWeight: 500
          }}
        >
          Apply to be a seller
        </Typography>
        <LongArrowSvg />
      </Button>
    </Box>
  )
}
export default ApplyShop
