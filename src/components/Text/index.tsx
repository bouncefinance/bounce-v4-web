import { styled, Typography } from '@mui/material'

export const H2 = styled(Typography)`
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 44px;
  line-height: 130%;
  letter-spacing: -0.02em;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #121212;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`
export const H3 = styled(Typography)`
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 130%;
  display: flex;
  letter-spacing: -0.02em;
  color: #b5e529;
`
export const H4 = styled(Typography)`
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 130%;
  letter-spacing: -0.02em;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #121212;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`
export const H5 = styled(Typography)`
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -0.02em;
  color: #121212;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`
export const H6 = styled(Typography)`
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #121212;
`
export const H7 = styled(Typography)`
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.02em;
  color: #121212;
  @media (max-width: 600px) {
    font-size: 13px !important;
  }

  &.mobile {
    font-size: 13px !important;
  }
`

export const H7Gray = styled(H7)`
  color: rgba(18, 18, 18, 0.4);
  @media (max-width: 600px) {
    font-size: 13px;
  }
`

export const SmallText = styled(Typography)`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.02em;
  color: var(--ps-text-3);
`
export const Body02 = styled(Typography)`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #ffffff;
`

export const Body03 = styled(Typography)`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 140%;
  color: #121212;
`
export const Body04 = styled(Typography)({
  leadingTrim: 'both',
  textEdge: 'cap',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '150%'
})
