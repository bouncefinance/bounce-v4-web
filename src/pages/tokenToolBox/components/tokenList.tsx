import {
  Box,
  Button,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  InputBase
} from '@mui/material'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import Image from 'components/Image'
import EmptyData from 'bounceComponents/common/EmptyData'
import { useState, useEffect } from 'react'
import IconImg from 'assets/imgs/icon/default_file.svg'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { useIsMDDown } from 'themes/useTheme'
import { routes } from '../../../constants/routes'

const StyledTableCell = styled(TableCell)(() => ({
  borderColor: '#626262',
  [`&.${tableCellClasses.head}`]: {
    color: '#777E90',
    fontFamily: `'Inter'`,
    fontFize: 13,
    lineHeight: '18px',
    textTransform: 'capitalize',
    paddingTop: '16px',
    paddingBottom: '16px'
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#fff',
    fontSize: 14,
    fontFamily: `'Inter'`
  }
}))

const StyledTableRow = styled(TableRow)(() => ({
  cursor: 'pointer',
  '&:nth-of-type(even)': {
    'td:first-of-type': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8
    },
    'td:last-child': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8
    }
  },
  td: {
    border: 0
  }
}))
const BtnCom = styled(Button)(() => ({
  height: '42px',
  lineHeight: '42px',
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: '-0.28px',
  fontFamily: `'Inter'`,
  borderRadius: '4px',
  border: '0',
  '&:hover': {
    border: '0'
  }
}))
const TokenList = () => {
  const [loading, setLoading] = useState(true)
  const isMd = useIsMDDown()
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
  const dataList = [
    {
      id: 0,
      tokenSymbol: IconImg,
      tokenName: 'USDT',
      amount: '20,184.04',
      totalValue: '$4,585,165.51',
      tokenType: 'Token'
    },
    {
      id: 1,
      tokenSymbol: IconImg,
      tokenName: 'USDT',
      amount: '20,184.04',
      totalValue: '$4,585,165.51',
      tokenType: 'Token'
    }
  ]

  return (
    <Box
      sx={{
        width: '100%',
        padding: isMd ? '0 16px 40px' : '0 72px 40px',
        overflowX: 'auto'
      }}
      mt={'60px'}
    >
      <Box
        sx={{
          padding: '80px 70px',
          borderRadius: '30px',
          background: '#121212',
          width: '100%',
          minWidth: isMd ? '1296px' : 'unset'
        }}
      >
        <Box mb={'24px'} display={'flex'} alignItems="center" justifyContent={'space-between'}>
          <Typography
            sx={{
              color: '#fff',
              leadingTrim: 'both',
              textEdge: 'cap',
              fontVariantNumeric: 'lining-nums proportional-nums',
              fontFamily: `'Public Sans'`,
              fontSize: 36,
              fontWeight: 600,
              lineHeight: '46px',
              letterSpacing: '-0.72px'
            }}
          >
            Token list
          </Typography>
          <Box display={'flex'} gap={'12px'}>
            <BtnCom variant={'contained'}>View My Lock</BtnCom>
            <BtnCom variant={'contained'} href={routes.tokenToolBox.tokenMinterList}>
              View My token
            </BtnCom>
            <BtnCom variant={'contained'} href={routes.tokenToolBox.myDisperse}>
              View My disperse
            </BtnCom>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            border: '1px solid #959595',
            borderRadius: '10px'
          }}
          mb={'48px'}
        >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon
              sx={{
                color: '#fff'
              }}
            />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, background: 'transparent', border: '0', color: '#fff' }}
            placeholder="Token address/Token name"
            inputProps={{ 'aria-label': 'Token address/Token name' }}
          />
        </Box>
        {loading ? (
          <Box
            sx={{
              width: '100%',
              height: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#fff',
              borderRadius: '20px'
            }}
          >
            <BounceAnime />
          </Box>
        ) : dataList && dataList.length > 0 && !loading ? (
          <TableContainer sx={{ mt: 40 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Token</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Total value</StyledTableCell>
                  <StyledTableCell>Token type</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {dataList.map(record => (
                  <StyledTableRow
                    key={record.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': {
                        background: '#20201E'
                      }
                    }}
                  >
                    <StyledTableCell>
                      <Stack direction={'row'} gap={'8px'}>
                        <Image src={record.tokenSymbol} width="24px" />
                        <Typography>{record.tokenName}</Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>{record.amount}</StyledTableCell>
                    <StyledTableCell>{record.totalValue}</StyledTableCell>
                    <StyledTableCell>{record.tokenType}</StyledTableCell>
                    <StyledTableCell align={'right'}>
                      <Stack
                        direction={'row'}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                      >
                        <Button
                          sx={{
                            height: '37px',
                            lineHeight: '37px',
                            fontFamily: `'Public Sans'`,
                            fontSize: 14,
                            fontWeight: 600,
                            letterSpacing: '-0.28px',
                            borderRadius: '6px'
                          }}
                          variant={'contained'}
                        >
                          Lock
                        </Button>
                        <Button
                          sx={{
                            height: '37px',
                            lineHeight: '37px',
                            fontFamily: `'Public Sans'`,
                            fontSize: 14,
                            fontWeight: 600,
                            letterSpacing: '-0.28px',
                            marginLeft: '10px',
                            background: 'transparent',
                            borderRadius: '6px',
                            color: '#fff',
                            '&:hover': {
                              color: '#121212'
                            }
                          }}
                          variant={'outlined'}
                        >
                          Disperse
                        </Button>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <EmptyData />
        )}
      </Box>
    </Box>
  )
}

export default TokenList
