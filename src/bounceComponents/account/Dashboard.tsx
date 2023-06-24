import { Box, Button, Stack, styled, Typography } from '@mui/material'
import { getLabelById } from 'utils'
import { useOptionDatas } from 'state/configOptions/hooks'
import { Link } from 'react-router-dom'
import { PoolType } from 'api/pool/type'
import { useMemo } from 'react'
import TokenImage from 'bounceComponents/common/TokenImage'
import { ChainId, ChainListMap } from 'constants/chain'
import getAuctionPoolLink from 'utils/auction/getAuctionPoolRouteLink'
import useBreakpoint from '../../hooks/useBreakpoint'

const StyledStatCard = styled(Box)({
  height: 100,
  display: 'grid',
  gap: 14,
  alignContent: 'center',
  backgroundColor: '#fff',
  borderRadius: '20px',
  p: {
    textAlign: 'center'
  }
})

const btnStyle = {
  height: 26,
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  padding: '0 8px',
  borderRadius: 6
}

export function DashboardPoolCard({ title, children }: { title: string; children?: JSX.Element }) {
  return (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
        borderRadius: '20px',
        padding: 16
      }}
    >
      <Typography pb={10} fontWeight={500}>
        {title}
      </Typography>
      <Stack
        height={240}
        spacing={8}
        sx={{
          overflow: 'auto'
        }}
      >
        {children}
      </Stack>
    </Box>
  )
}

export function DashboardStatCard({ name, value }: { name: string; value: string | number }) {
  return (
    <StyledStatCard>
      <Typography color={'var(--ps-text-2)'} fontWeight={500} className="PSans">
        {name}
      </Typography>
      <Typography variant="h3" className="PSans" textAlign={'center'} fontSize={28} fontWeight={600} color="#2663FF">
        {value}
      </Typography>
    </StyledStatCard>
  )
}

export function DashboardNoData() {
  return (
    <Box display={'grid'} justifyItems="center" alignContent={'center'} height="100%">
      <svg width="120" height="129" viewBox="0 0 120 129" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="46.3638"
          height="38.6365"
          transform="matrix(0.94693 -0.321439 0 1 17.1523 74.8652)"
          fill="#2663FF"
          stroke="#171717"
          strokeLinejoin="round"
        />
        <path
          d="M17.1472 74.8673L61.0503 59.9642L49.1377 45.0617L5.23438 59.9648L17.1472 74.8673Z"
          fill="white"
          stroke="#171717"
          strokeLinejoin="round"
        />
        <rect
          width="46.3638"
          height="38.6365"
          transform="matrix(0.94693 0.321439 0 1 61.0508 59.9629)"
          fill="#2663FF"
          stroke="#171717"
          strokeLinejoin="round"
        />
        <path
          d="M61.0508 59.9693L104.954 74.8725L117.453 59.9703L73.5499 45.0671L61.0508 59.9693Z"
          fill="white"
          stroke="#171717"
          strokeLinejoin="round"
        />
        <rect
          width="46.3638"
          height="38.6365"
          transform="matrix(0.94693 -0.321439 0 1 61.0508 89.7676)"
          fill="white"
          stroke="#171717"
          strokeLinejoin="round"
        />
        <path
          d="M61.0508 89.7676L104.954 74.8644L118.849 89.7676L74.946 104.671L61.0508 89.7676Z"
          fill="white"
          stroke="#171717"
          strokeLinejoin="round"
        />
        <rect
          width="46.3638"
          height="38.6365"
          transform="matrix(0.94693 0.321439 0 1 17.1523 74.8652)"
          fill="white"
          stroke="#171717"
          strokeLinejoin="round"
        />
        <path
          d="M17.1493 74.874L61.0529 89.7773L44.7666 103.032L0.863281 88.1292L17.1493 74.874Z"
          fill="white"
          stroke="#171717"
          strokeLinejoin="round"
        />
        <path
          d="M66.1682 3.57642C61.8941 6.05182 58.0842 9.25312 54.9093 13.0367C52.018 16.4823 49.5591 20.3949 48.1101 24.6712C47.4386 26.6097 47.0392 28.632 46.9235 30.6803C46.8762 31.6643 46.9151 32.6505 47.0398 33.6277C47.1509 34.5442 47.3492 35.4479 47.6319 36.3267C48.2097 38.0566 49.1256 39.6543 50.3264 41.027C51.4482 42.3397 52.8345 43.4007 54.3947 44.1406C56.018 44.9063 57.8289 45.1833 59.6068 44.938C61.7118 44.6305 63.6998 43.5463 64.8144 41.7658C65.2992 40.986 65.5922 40.1022 65.6692 39.1872C65.741 38.2998 65.6166 37.2522 65.0798 36.4821C64.8516 36.1647 64.5522 35.9053 64.2056 35.7246C63.859 35.5439 63.4749 35.447 63.084 35.4417C62.1999 35.3977 61.3178 35.5613 60.5082 35.9194C56.2527 37.7199 53.7649 42.281 52.3354 46.4357C50.9825 50.4674 50.3692 54.7104 50.525 58.9602C50.6861 63.3961 51.5396 67.7796 53.0544 71.952C54.7339 76.5627 56.9881 80.9433 59.7636 84.9901C60.4394 85.9876 61.1383 86.966 61.8602 87.9252C62.0071 88.1108 62.0771 88.3457 62.0557 88.5814C62.0344 88.8171 61.9234 89.0356 61.7456 89.1918C61.5624 89.3445 61.3261 89.4183 61.0886 89.3968C60.851 89.3753 60.6318 89.2603 60.479 89.0771C57.2924 84.9012 54.6218 80.3556 52.5254 75.5391C50.5666 71.024 49.333 66.2279 48.8699 61.3281C48.4452 56.7224 48.8526 52.0778 50.0727 47.6164C51.3868 42.949 53.7529 38.0171 57.9354 35.2821C59.8063 34.0575 62.1091 33.1869 64.3441 33.8404C66.7277 34.5456 67.6621 37.1542 67.4454 39.431C67.3187 40.5842 66.9387 41.6952 66.3326 42.6844C65.7266 43.6737 64.9094 44.5168 63.9395 45.1535C61.942 46.4502 59.5559 47.0121 57.1897 46.7431C53.1966 46.303 49.7184 43.6769 47.6043 40.3465C45.2556 36.6458 44.6839 32.2163 45.4287 27.9379C46.2321 23.3648 48.3151 19.0905 50.9307 15.2815C53.9443 10.8953 57.7203 7.08514 62.0791 4.03206C63.1607 3.27442 64.2922 2.57662 65.428 1.90263C65.6452 1.80442 65.8924 1.79647 66.1155 1.88051C66.3385 1.96455 66.5191 2.13371 66.6175 2.35081C66.7117 2.56861 66.7179 2.81446 66.6347 3.03671C66.5515 3.25896 66.3854 3.44031 66.1712 3.54265L66.1682 3.57642Z"
          fill="#171717"
        />
      </svg>

      <Typography mt={10} color={'var(--ps-text-2)'} textAlign={'center'}>
        No data
      </Typography>
    </Box>
  )
}

export function DashboardToPoolButton({
  text,
  poolId,
  category,
  backedChainId
}: {
  text: string
  category: PoolType
  poolId: number
  backedChainId: number
}) {
  const isSm = useBreakpoint('sm')
  return (
    <Link to={getAuctionPoolLink(undefined, category, backedChainId, poolId.toString())}>
      <Button color="secondary" variant="contained" sx={{ ...btnStyle, borderRadius: isSm ? '6px' : '' }}>
        {text}
      </Button>
    </Link>
  )
}

export function DashboardShowCategoryName({ category, backedChainId }: { category: PoolType; backedChainId: number }) {
  const optionDatas = useOptionDatas()
  const isSm = useBreakpoint('sm')
  const ethChainId = useMemo(
    () => getLabelById(backedChainId, 'ethChainId', optionDatas?.chainInfoOpt || []),
    [backedChainId, optionDatas?.chainInfoOpt]
  )

  return (
    <Box display={'flex'} alignItems="center">
      <TokenImage src={ethChainId ? ChainListMap?.[ethChainId as ChainId]?.logo : ''} size={isSm ? 16 : 12} />
      <Typography fontSize={12} ml={4} noWrap>
        {category === PoolType.FixedSwap
          ? 'ERC20 Fixed Price'
          : category === PoolType.fixedSwapNft
          ? 'NFT Fixed Price'
          : category === PoolType.Lottery
          ? 'Random Selection'
          : category === PoolType.ENGLISH_AUCTION_NFT
          ? 'NFT English Auction'
          : '-'}
      </Typography>
    </Box>
  )
}
