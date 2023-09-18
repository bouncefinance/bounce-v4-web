import {
  Box,
  Button,
  Pagination,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { ContainerBox, Title } from '../tokenlocker/tokenLocker'
import BackButton from '../../../../bounceComponents/common/BackButton'
import { Stack } from '@mui/system'
import { LockInfo } from '../../../../api/toolbox/type'
import { useOptionDatas } from '../../../../state/configOptions/hooks'
import { useMyLocks } from '../../../../bounceHooks/toolbox/useTokenLockInfo'
import { useActiveWeb3React } from '../../../../hooks'
import { useShowLoginModal } from '../../../../state/users/hooks'
import { useEffect, useState } from 'react'
import { IReleaseType } from '../../../../bounceComponents/create-auction-pool/types'

export default function MyLock() {
  const defaultPageSize = 10
  const [curPage, setCurPage] = useState(1)
  const optionDatas = useOptionDatas()
  const { data } = useMyLocks(curPage, defaultPageSize)

  function getChainName(chain_id: number) {
    return optionDatas.chainInfoOpt?.find(chainInfo => chainInfo?.['id'] === chain_id)
  }

  function mapType(type: number) {
    switch (type) {
      case IReleaseType.Cliff:
        return 'Normal'
      case IReleaseType.Linear:
        return 'Linear'
      case IReleaseType.Fragment:
        return 'Stage'
      case 4:
        return 'V2 LP Token'
      case 5:
        return 'V3 LP Token'
      default:
        return ''
    }
  }

  function calTime(record: LockInfo) {
    switch (record.lock_type) {
      case IReleaseType.Linear:
        return new Date((record.lock_start + record.lock_end) * 1000).toLocaleString()
      default:
        return new Date(record.lock_end * 1000).toLocaleString()
    }
  }

  const { account } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  useEffect(() => {
    !account && showLoginModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  return (
    <Box>
      <ContainerBox>
        <BackButton />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '25px',
            background: '#fff',
            padding: '56px'
          }}
        >
          <Title
            sx={{
              alignSelf: 'center',
              marginBottom: '48px'
            }}
          >
            My Lock
          </Title>
          <TableContainer sx={{ mt: 40 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Token</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Lock Amount</StyledTableCell>
                  <StyledTableCell>Chlock Modelain</StyledTableCell>
                  <StyledTableCell>Unlock Date</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data?.list?.map((record: LockInfo, idx: number) => (
                  <StyledTableRow key={idx} className={idx % 2 == 0 ? 'odd' : ''}>
                    <StyledTableCell>
                      <Stack direction={'row'} gap={'8px'}>
                        {/*<Image src={record.logo} width="24px" />*/}
                        <Typography>{getChainName(record.chain_id)?.shortName}</Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>{record.title}</StyledTableCell>
                    <StyledTableCell>{record.amount}</StyledTableCell>
                    <StyledTableCell>{mapType(record.lock_type)}</StyledTableCell>
                    <StyledTableCell>{calTime(record)}</StyledTableCell>
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
                          onClick={() => {}}
                        >
                          Detail
                        </Button>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <Box mt={40} display={'flex'} justifyContent="center">
              <Pagination
                onChange={(_, p) => setCurPage(p)}
                page={curPage}
                count={Math.ceil((data?.total || 0) / (defaultPageSize || 0))}
              />
            </Box>
          </TableContainer>
        </Box>
      </ContainerBox>
    </Box>
  )
}
const StyledTableCell = styled(TableCell)(() => ({
  border: 'transparent',
  [`&.${tableCellClasses.head}`]: {
    color: '#777E90',
    fontFamily: `'Inter'`,
    fontFize: 13,
    lineHeight: '18px',
    textTransform: 'capitalize',
    borderBottom: '1px solid #e8e9e4',
    paddingTop: '16px',
    paddingBottom: '16px'
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#121212',
    fontSize: 14,
    fontFamily: `'Inter'`
  }
}))
const StyledTableRow = styled(TableRow)`
  &.odd {
    background: #f6f6f3;
    border-radius: 8px;
  }
`
