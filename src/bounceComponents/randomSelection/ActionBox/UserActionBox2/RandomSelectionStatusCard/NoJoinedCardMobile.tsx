import Logo from '../../../../../assets/imgs/randomSelection/logoGray.png'
import TypeIcon from '../../../../../assets/imgs/randomSelection/typeIconGray.png'
import { FixedSwapPoolProp } from '../../../../../api/pool/type'
import { Box, Typography } from '@mui/material'
import Image from '../../../../../components/Image'
import { formatNumber } from '../../../../../utils/number'

export const NoJoinedCardMobile = ({
  poolInfo,
  singleShare
}: {
  poolInfo: FixedSwapPoolProp
  singleShare: string | undefined
}) => {
  return (
    <>
      <Box>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 216,
            background: '#f5f5f5',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            borderRight: '1px dashed #FFFFFF'
          }}
        >
          <Image src={Logo} width={50} height={50} />
          <Typography
            sx={{
              position: 'absolute',
              left: 0,
              bottom: '12px',
              width: '100%',
              textAlign: 'center',
              fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
              fontWeight: 400,
              fontSize: 12,
              color: '#DFDFDF',
              transform: 'scale(0.8)'
            }}
          >
            Random selection
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              left: '-30px',
              top: '50%',
              width: 41,
              height: 21,
              marginTop: '-11px',
              background: '#fff',
              borderRadius: '50%'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: '-1px',
              top: '0',
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `#fff #fff transparent transparent`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: '-1px',
              bottom: '0',
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `transparent #fff #fff transparent`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              bottom: '0',
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `transparent transparent #fff #fff`
            }}
          />
        </Box>
        <Box sx={{ background: '#f5f5f5', position: 'relative' }}>
          <Box
            sx={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#f5f5f5',
              marginRight: '10px'
            }}
          >
            <Box
              sx={{
                width: '100%',
                flex: 1,
                height: 93,
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderBottom: '1px dashed #FFFFFF',
                paddingLeft: 20
              }}
            >
              <Typography
                sx={{
                  fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                  fontWeight: 400,
                  textAlign: 'center',
                  width: '100%',
                  fontSize: 12,
                  color: '#DFDFDF',
                  marginBottom: 10
                }}
              >
                Number of winners
              </Typography>
              <Typography
                sx={{
                  fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                  fontWeight: 400,
                  fontSize: 28,
                  color: '#DFDFDF',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                {poolInfo.totalShare}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                flex: 1,
                height: 93,
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 20
              }}
            >
              <Typography
                sx={{
                  fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                  fontWeight: 400,
                  fontSize: 12,
                  color: '#DFDFDF',
                  marginBottom: 10,
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                Token per ticket
              </Typography>
              <Typography
                sx={{
                  fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                  fontWeight: 400,
                  fontSize: 28,
                  color: '#DFDFDF',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                {singleShare}
                <span
                  style={{
                    fontSize: 12,
                    marginLeft: 8,
                    color: '#DFDFDF'
                  }}
                >
                  {poolInfo.token0.symbol}
                </span>
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: '0',
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `#fff transparent transparent #fff`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              bottom: '0',
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `transparent transparent #fff #fff`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `#fff #fff transparent transparent`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `transparent #fff #fff transparent`
            }}
          />
        </Box>
        <Box sx={{ background: '#f5f5f5', position: 'relative', p: 20 }}>
          <Box
            sx={{
              width: '100%',
              height: 186,
              background: '#FDFDFD',
              borderRadius: '6px',
              paddingTop: 12,
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                fontWeight: 400,
                fontSize: 12,
                color: '#DFDFDF',
                textAlign: 'center',
                marginBottom: 20
              }}
            >
              Ticket price
            </Typography>
            <Image
              src={TypeIcon}
              width={41}
              height={41}
              style={{
                marginBottom: 19
              }}
            />
            <Typography
              sx={{
                fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                fontWeight: 400,
                fontSize: 28,
                color: '#DFDFDF',
                marginBottom: 5
              }}
            >
              {formatNumber(poolInfo.maxAmount1PerWallet, {
                unit: poolInfo.token1.decimals
              })}
            </Typography>
            <Typography
              sx={{
                fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                fontWeight: 400,
                fontSize: 12,
                color: '#DFDFDF'
              }}
            >
              {poolInfo.token1.symbol}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: '0',
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `#fff transparent transparent #fff`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: '-1px',
              top: '0',
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `#fff #fff transparent transparent`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: '-1px',
              bottom: '0',
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `transparent #fff #fff transparent`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              bottom: '0',
              width: 0,
              height: 0,
              border: '8px solid',
              borderColor: `transparent transparent #fff #fff`
            }}
          />
        </Box>
      </Box>
      <Typography
        sx={{
          color: '#171717',
          fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
          fontWeight: 500,
          fontSize: 22,
          textAlign: 'center',
          margin: '27px 0 24px'
        }}
      >
        Lottery Completed
      </Typography>
    </>
  )
}
