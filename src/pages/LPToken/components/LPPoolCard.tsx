import { Stack, Tab, Tabs, Typography, styled } from '@mui/material'
import useBreakpoint from 'hooks/useBreakpoint'
import { useMemo, useState } from 'react'
import Icon1 from 'assets/imgs/nftLottery/tokenInformation/token-icon1.svg'
import Icon2 from 'assets/images/eth_logo.png'
import { useContract, useUniV3PositionContract } from 'hooks/useContract'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { ChainId } from 'constants/chain'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useToken } from 'state/wallet/hooks'
import { CurrencyAmount } from 'constants/token'
import { FeeAmount, Pool, Position, computePoolAddress } from '@uniswap/v3-sdk'
import { Token } from '@uniswap/sdk-core'
const TabsCom = styled(Tabs)({
  display: 'flex',
  width: '100%',
  height: 'auto',
  minHeight: 40,
  padding: '0 6px 6px',
  borderRadius: '100px',
  justifyContent: 'center',
  color: '#959595',
  textAlign: 'center',
  '& .MuiTabs-flexContainer': {
    height: 40
  },
  '& button': {
    padding: '4px 16px',
    height: 32
  },
  '&.active': {
    background: '#E1F25C',
    button: {
      color: '#121212'
    }
  }
})

export default function Page() {
  const Tabs = [
    {
      name: 'SAVM',
      icon: Icon1
    },
    {
      name: 'ETH',
      icon: Icon2
    }
  ]
  const [curTab, setCurTab] = useState(0)
  const _chainId = ChainId.SEPOLIA
  const isSm = useBreakpoint('sm')
  const posContract = useUniV3PositionContract(_chainId)
  const res = useSingleCallResult(posContract, 'positions', [7203], undefined, _chainId)?.result
  const _token0 = useToken(res?.token0, _chainId)
  const token0 = useMemo(() => {
    if (res?.token0) {
      return new Token(_chainId, res?.token0, _token0?.decimals || 18)
    }
    return undefined
  }, [_chainId, _token0?.decimals, res?.token0])
  const _token1 = useToken(res?.token1, _chainId)
  const token1 = useMemo(() => {
    if (res?.token1) {
      return new Token(_chainId, res?.token1, _token1?.decimals || 18)
    }
    return undefined
  }, [_chainId, _token1?.decimals, res?.token1])

  const positionInfo = useMemo(() => {
    if (res && _token1) {
      return {
        liquidity: res?.liquidity,
        fee: res?.fee ? CurrencyAmount.fromRawAmount(_token1, res.fee) : undefined,
        tickLower: res?.tickLower,
        tickUpper: res?.tickUpper,
        tokens0Wed0: res?.tokens0Wed0,
        tokens0Wed1: res?.tokens0Wed1,
        feeGrowthInside0LastX128: res?.feeGrowthInside0LastX128,
        feeGrowthInside1LastX128: res?.feeGrowthInside1LastX128
      }
    }
    return undefined
  }, [_token1, res])
  console.log('🚀 ~ positionInfo ~ positionInfo:', positionInfo)
  const poolAddress = useMemo(() => {
    if (token0 && token1) {
      return computePoolAddress({
        factoryAddress: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
        tokenA: token0,
        tokenB: token1,
        fee: res?.fee.toString() as FeeAmount
      })
    }
    return undefined
  }, [res?.fee, token0, token1])

  const poolContract = useContract(poolAddress, IUniswapV3PoolABI.abi, false, _chainId)

  const slot0s = useSingleCallResult(poolContract, 'slot0', undefined, undefined, _chainId)?.result
  const liquidity = useSingleCallResult(poolContract, 'liquidity', undefined, undefined, _chainId)?.result
  const pool = useMemo(() => {
    if (slot0s && liquidity && token0 && token1 && res?.fee) {
      return new Pool(token0, token1, Number(res?.fee), slot0s.sqrtPriceX96, liquidity[0], slot0s.tick)
    }
    return undefined
  }, [slot0s, liquidity, token0, token1, res?.fee])

  const position = useMemo(() => {
    if (
      pool &&
      liquidity &&
      positionInfo &&
      typeof positionInfo?.tickLower === 'number' &&
      typeof positionInfo.tickUpper === 'number'
    ) {
      return new Position({
        pool,
        liquidity: liquidity.toString(),
        tickLower: positionInfo?.tickLower,
        tickUpper: positionInfo?.tickUpper
      })
    }
    return undefined
  }, [liquidity, pool, positionInfo])

  console.log('🚀 ~ Page ~ res111:', position)

  return (
    <Stack
      spacing={40}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        margin: isSm ? '24px 16px' : '40px 72px',
        padding: isSm ? '24px 16px' : '24px 56px 65px',
        background: '#fff'
      }}
    >
      <Stack
        sx={{
          width: '100%',
          maxWidth: 1440,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          margin: '0 auto',
          justifyContent: 'center',
          padding: '6px',
          borderRadius: '100px',
          border: '1px solid #959595'
        }}
      >
        {Tabs.map((tab, idx) => (
          <TabsCom
            sx={{ cursor: idx === curTab ? 'auto' : 'pointer' }}
            key={idx}
            onClick={() => setCurTab(idx)}
            className={idx === curTab ? 'active' : ''}
          >
            <Tab
              className={idx === curTab ? 'active' : ''}
              label={tab.name}
              sx={{ textAlign: 'center', margin: '0 auto', fontSize: 16, fontWeight: 500, color: '#959595' }}
            />
          </TabsCom>
        ))}
      </Stack>
      <Typography sx={{ width: '100%', textAlign: 'center' }} fontSize={28} fontWeight={600} color={'#000'}>
        Price Range
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={16}>
        <Stack
          spacing={24}
          sx={{
            width: '100%',
            textAlign: 'center',
            padding: isSm ? '10px 16px' : '20px 40px',
            borderRadius: '12px',
            background: '#F6F6F3'
          }}
        >
          <Typography sx={{ width: '100%', textAlign: 'left' }} fontSize={20} color={'#20201E'} fontWeight={600}>
            Min Price
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={16}>
              <img width={32} height={32} src={Tabs[curTab].icon} alt="icon-eth" />
              <Typography fontSize={16} color={'#20201E'} fontWeight={500}>
                {Tabs[curTab].name.toLocaleUpperCase()}
              </Typography>
            </Stack>
            <Typography fontSize={16} color={'#20201E'} fontWeight={500}>
              18.82
            </Typography>
          </Stack>
        </Stack>
        <Stack
          spacing={24}
          sx={{
            width: '100%',
            textAlign: 'center',
            padding: isSm ? '10px 16px' : '20px 40px',
            borderRadius: '12px',
            background: '#F6F6F3'
          }}
        >
          <Typography sx={{ width: '100%', textAlign: 'left' }} fontSize={20} color={'#20201E'} fontWeight={600}>
            Max Price
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={16}>
              <img width={32} height={32} src={Tabs[curTab].icon} alt="icon-eth" />
              <Typography fontSize={16} color={'#20201E'} fontWeight={500}>
                {Tabs[curTab].name.toLocaleUpperCase()}
              </Typography>
            </Stack>
            <Typography fontSize={16} color={'#20201E'} fontWeight={500}>
              18.82
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        spacing={24}
        sx={{
          width: '100%',
          textAlign: 'center',
          padding: isSm ? '10px 16px' : '20px 40px',
          borderRadius: '12px',
          background: '#F6F6F3'
        }}
      >
        <Typography fontSize={20} color={'#20201E'} fontWeight={600}>
          Current Price
        </Typography>
        <Typography fontSize={36} color={'#2B51DA'} fontWeight={600}>
          18.82
        </Typography>
        <Typography fontSize={16} color={'#20201E'} fontWeight={500}>
          {Tabs[curTab].name.toLocaleUpperCase()} per {Tabs[curTab === 0 ? 1 : 0].name.toLocaleUpperCase()}
        </Typography>
      </Stack>
    </Stack>
  )
}
