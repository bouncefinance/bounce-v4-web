import { useActiveWeb3React } from 'hooks'
import PopperCard from 'components/PopperCard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import Button from '@mui/material/Button'
import { ChainList, ChainListMap } from 'constants/chain'
import Image from 'components/Image'
import { Box, IconButton, OutlinedInput } from '@mui/material'
import LogoText from 'components/LogoText'
import { ReactComponent as IconSVG } from 'bounceComponents/common/SearchInput/icon.svg'
import { useMemo, useState } from 'react'
import useBreakpoint from '../../hooks/useBreakpoint'

export default function NetworkPopperSelect({ opacity = 1 }: { opacity: number }) {
  const { chainId } = useActiveWeb3React()
  const switchNetwork = useSwitchNetwork()
  const [searchVal, setSearchVal] = useState('')
  const isSm = useBreakpoint('sm')

  const filterChainList = useMemo(() => {
    return ChainList.filter(
      item =>
        !searchVal ||
        item.id.toString().toLowerCase().includes(searchVal.toLowerCase()) ||
        item.name.toString().toLowerCase().includes(searchVal.toLowerCase()) ||
        item.symbol.toString().toLowerCase().includes(searchVal.toLowerCase())
    )
  }, [searchVal])

  if (!chainId) return null

  return (
    <PopperCard
      sx={{
        borderRadius: '20px'
      }}
      closeHandler={() => setSearchVal('')}
      targetElement={
        <Button
          sx={{
            width: isSm ? 58 : 62,
            fontSize: 16,
            height: isSm ? 40 : 44,
            borderRadius: 60,
            background: opacity >= 0.65 ? '#F6F6F3' : '#F6F6F315'
            // borderColor: opacity >= 0.65 ? undefined : 'transparent'
          }}
          // variant="outlined"
          color="secondary"
        >
          <Image width={isSm ? 20 : 24} height={isSm ? 20 : 24} src={ChainListMap[chainId]?.logo || ''} />
          <ExpandMoreIcon style={{ fontSize: 20 }} sx={{ fill: opacity >= 0.65 ? undefined : '#fff' }} />
        </Button>
      }
    >
      <Box width={isSm ? '100%' : 400}>
        <OutlinedInput
          sx={{
            height: 44,
            mb: 12,
            width: '100%',
            padding: '10px 0',
            borderRadius: 20,
            border: 0,
            '& fieldset': {
              border: 'none'
            },
            transform: 'all 0.4s',
            backgroundColor: 'rgba(18, 18, 18, 0.06)',
            '&:active, &:hover, &:focus': {
              '& .search-icon svg path': {
                stroke: 'var(--ps-white)'
              },
              color: 'var(--ps-white)',
              backgroundColor: 'var(--ps-black)'
            }
          }}
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          placeholder="Search..."
          startAdornment={
            <IconButton className="search-icon">
              <IconSVG />
            </IconButton>
          }
        />
        <Box
          sx={{
            maxHeight: 300,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: '50% 50%'
          }}
        >
          {filterChainList.map(option =>
            option.id === chainId ? (
              <Button
                sx={{
                  height: 48,
                  justifyContent: 'start',
                  background: '#E1F25C',
                  borderRadius: 100
                }}
                variant="outlined"
                key={option.id}
              >
                <LogoText logo={option.logo} text={option.name} gapSize={'small'} fontSize={14} />
              </Button>
            ) : (
              <Button
                sx={{
                  borderColor: 'transparent',
                  justifyContent: 'start',
                  height: 48,
                  border: 'none',
                  '&:hover': {
                    color: '#A4D220',
                    border: 'none',
                    background: 'transparent'
                  }
                }}
                variant="outlined"
                key={option.id}
                onClick={() => switchNetwork(option.id)}
              >
                <LogoText logo={option.logo} text={option.name} gapSize={'small'} fontSize={14} />
              </Button>
            )
          )}
        </Box>
      </Box>
    </PopperCard>
  )
}
