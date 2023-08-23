import { Box, SxProps, Theme } from '@mui/material'
import HeaderTab from 'bounceComponents/auction/HeaderTab'
import FooterPc from 'components/Footer/FooterPc'
import useBreakpoint from 'hooks/useBreakpoint'
import ModulesList from './components/modulesList'
import TokenList from './components/tokenList'
export default function TokenToolBox({ sx }: { sx?: SxProps<Theme> | undefined }) {
  const isSm = useBreakpoint('sm')
  return (
    <>
      <HeaderTab />
      <Box
        sx={{
          padding: isSm ? '0 16px 0' : '0 72px 40px',
          ...sx
        }}
      >
        <ModulesList />
        <TokenList />
      </Box>
      <FooterPc />
    </>
  )
}
