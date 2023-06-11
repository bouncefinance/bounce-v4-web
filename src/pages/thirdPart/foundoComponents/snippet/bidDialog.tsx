import { Box, Typography, styled } from '@mui/material'
import { useState } from 'react'
import ProductIcon from 'assets/imgs/thirdPart/foundoDetail/productIcon.png'
import CloseIcon from 'assets/imgs/thirdPart/foundoDetail/x.svg'
import LogoIcon from 'assets/imgs/thirdPart/foundoDetail/logo.png'
import ArrowbottomIcon from 'assets/imgs/thirdPart/foundoDetail/Arrowbottom.png'
import { BidBtn } from './bidAction'
import { RowLabel } from './bidAction'
const InputBox = styled(Box)(() => ({
  height: '48px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  padding: '0 24px',
  background: 'var(--ps-text-4)',
  borderRadius: '4px',
  '.inputEl': {
    background: 'none',
    outline: 'none',
    border: 'none',
    fontSize: 16,
    color: 'var(--ps-text-5)'
  },
  '.inputEl:focus': {
    border: 'none'
  }
}))
function ProcessLine(props: { ratio: number }) {
  const { ratio } = props
  function RatioItem(props: { ratioStr: number; result?: number }) {
    const { ratioStr, result } = props
    return (
      <Box
        sx={{
          position: 'absolute',
          left: `${ratioStr}%`,
          top: '50%',
          marginTop: '-3px',
          display: 'flex',
          flexFlow: 'column nowrap'
        }}
        gap={'12px'}
      >
        <Box
          sx={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: ratioStr <= ratio ? '#fff' : 'var(--ps-text-1)'
          }}
        ></Box>
        {!result && (
          <Typography
            sx={{
              transform:
                ratioStr === 0
                  ? 'translate3D(0%, 0, 0)'
                  : ratioStr >= 100
                  ? 'translate3D(-76%, 0, 0)'
                  : 'translate3D(-30%, 0, 0)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              fontFamily: `'Public Sans'`,
              fontWeight: 600
            }}
          >
            {ratioStr}%
          </Typography>
        )}
        {result && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '37px',
              left: `${result}%`,
              transform: `translate3D(-50%, 0 ,0)`,
              width: '37px',
              height: '18px',
              background: '#fff'
            }}
          >
            {result}%
            <img
              src={ArrowbottomIcon}
              style={{
                position: 'absolute',
                top: '13px',
                left: '50%',
                transform: `translate3D(-50%, 0 ,0)`
              }}
              alt=""
            />
          </Box>
        )}
      </Box>
    )
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '125px'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: '100%',
          height: 0,
          borderBottom: `2px solid rgba(255, 255, 255, 0.2)`
        }}
      >
        <RatioItem ratioStr={0} />
        <RatioItem ratioStr={25} />
        <RatioItem ratioStr={50} />
        <RatioItem ratioStr={75} />
        <RatioItem ratioStr={100} />
        <RatioItem ratioStr={ratio} result={ratio} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: `${ratio}%`,
          height: 0,
          borderBottom: `2px solid #fff`,
          transition: 'all .6s'
        }}
      ></Box>
    </Box>
  )
}
const BidDialog = ({ handleClose }: { handleClose: () => void }) => {
  const [bidNum, setBidNum] = useState('')
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.7)'
        }}
        onClick={() => {
          handleClose && handleClose()
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate3D(-50%, -50%, 0)',
          width: '860px',
          height: '502px',
          background: 'rgba(73, 73, 73, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(25px)',
          padding: '41px 48px 31px'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: 20,
            color: '#fff',
            marginBottom: '31px'
          }}
        >
          Place a bid
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
          gap={'40px'}
        >
          <Box
            sx={{
              width: '290px',
              borderRight: `1px solid rgba(255, 255, 255, 0.2)`
            }}
          >
            <img
              src={ProductIcon}
              style={{
                width: '251px'
              }}
              alt=""
            />
            <Typography
              sx={{
                fontFamily: `'Public Sans'`,
                fontWeight: 600,
                fontSize: 14,
                color: '#fff'
              }}
            >
              ROLEX DAYTONA STEEL 2021 40MM 116500LN - FULL BOXES & PAPERS
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1
            }}
          >
            <Box
              sx={{
                border: `1px solid rgba(255, 255, 255, 0.2)`,
                borderRadius: 8,
                padding: '24px'
              }}
              mb={'24px'}
            >
              <RowLabel
                sx={{
                  marginBottom: '16px'
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: `'Inter'`,
                    fontSize: 14
                  }}
                >
                  Min
                </Typography>
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: `'Inter'`,
                    fontSize: 14
                  }}
                >
                  26000.00
                </Typography>
              </RowLabel>
              <RowLabel>
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: `'Inter'`,
                    fontSize: 14
                  }}
                >
                  Balance
                </Typography>
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: `'Inter'`,
                    fontSize: 14
                  }}
                >
                  100000
                </Typography>
              </RowLabel>
            </Box>
            <Typography
              sx={{
                color: '#fff',
                fontFamily: `'Public Sans'`,
                fontSize: 12
              }}
              mb={'12px'}
            >
              The bid amount must be greater than the Current Highest Bid(26000 ETH)
            </Typography>
            <InputBox>
              <input
                className={'inputEl'}
                value={bidNum}
                placeholder="Price"
                onChange={e => {
                  let value = e.target.value
                  if (value && value.indexOf('.') < 0 && value !== '') {
                    value = parseFloat(value) + ''
                  }
                  const result = value
                    .replace(/[^\d.]/g, '')
                    .replace(/\.{2,}/g, '.')
                    .replace('.', '$#$')
                    .replace(/\./g, '')
                    .replace('$#$', '.')
                  //   e.target.value
                  console.log('result>>>', result)
                  setBidNum(result)
                }}
                onBlurCapture={e => {
                  let value = e.target.value
                  if (value && value.indexOf('.') > 0) {
                    const str = value.slice(value.indexOf('.'), value.length)
                    if (Number(str) / 1 <= 0) {
                      value = value.replace(str, '')
                    }
                  }
                  setBidNum(value)
                }}
              />
              <RowLabel
                style={{
                  justifyContent: 'flex-end'
                }}
              >
                <img
                  style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    marginRight: '8px'
                  }}
                  src={LogoIcon}
                  alt=""
                  srcSet=""
                />
                <Typography
                  className="value"
                  style={{
                    height: '20px',
                    lineHeight: '20px'
                  }}
                >
                  26000 ETH
                </Typography>
              </RowLabel>
            </InputBox>
            <ProcessLine ratio={60} />
            <BidBtn>
              <Typography
                sx={{
                  fontFamily: `'Public Sans'`,
                  fontStyle: 'italic',
                  fontWeight: 100,
                  fontSize: 20,
                  color: '#fff'
                }}
              >
                Place A Bid
              </Typography>
            </BidBtn>
          </Box>
        </Box>
        <img
          src={CloseIcon}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            cursor: 'pointer'
          }}
          onClick={() => {
            handleClose && handleClose()
          }}
          alt=""
          srcSet=""
        />
      </Box>
    </Box>
  )
}
export default BidDialog
