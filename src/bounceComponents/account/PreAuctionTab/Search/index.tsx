import { Box, IconButton, OutlinedInput } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { whiteLogoRoutes } from '../../../../components/Header'
import { ReactComponent as IconSVG } from './icon.svg'

function Search({
  searchText,
  setSearchText,
  placeholder = 'Search',
  borderRadius,
  maxWidth
}: {
  searchText: string
  setSearchText: (text: string) => void
  placeholder: string
  borderRadius?: string
  maxWidth?: string
}) {
  const { pathname } = useLocation()

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: maxWidth ?? 400,
        height: 46,
        borderRadius: borderRadius ?? '100px',
        border: '1px solid #E6E6E6',
        mixBlendMode: whiteLogoRoutes.includes(pathname) ? 'difference' : 'unset',
        position: 'relative',
        '.Mui-focused': {
          '.MuiOutlinedInput-root': {}
        },
        '.MuiOutlinedInput-root': {
          transition: 'all 0.5s',
          position: 'absolute',
          right: 0,
          width: '100%',
          height: 44,
          overflow: 'hidden',
          background: 'white',
          padding: '0 !important',
          border: 'none',
          '& input': {
            padding: '0 !important'
          }
        }
      }}
    >
      <OutlinedInput
        className="OInput"
        value={searchText}
        onFocus={() => {}}
        onBlur={() => {}}
        placeholder={placeholder}
        sx={{
          fontSize: 13,
          fontFamily: `'Inter'`,
          borderRadius: 60,
          height: 44,
          width: 44,
          color: '#959595',
          background: '#F6F6F315!important',
          '& fieldset': {
            border: 'none'
          },
          '& input:focus': {
            caretColor: '#000'
          }
        }}
        onChange={ev => {
          setSearchText(ev.target.value)
        }}
        startAdornment={
          <IconButton
            sx={{
              width: 44,
              height: 44,
              borderRadius: 8,
              transition: 'all 0.4s',
              background: 'transparent',
              '& svg path': {
                stroke: '#959595'
              },
              '&:hover': {
                '& svg path': {}
              }
            }}
            onClick={() => {
              // handleSearch()
            }}
          >
            <IconSVG />
          </IconButton>
        }
        endAdornment={<></>}
      />
    </Box>
  )
}

export default Search
