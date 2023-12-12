import { muiDialogV5, useModal, create } from '@ebay/nice-modal-react'
import { Avatar, Button, Checkbox, Stack, Table, TableBody, TableHead, Typography } from '@mui/material'
import Dialog from 'bounceComponents/common/DialogBase'
import HeadImg from 'assets/imgs/thirdPart/foundoDetail/head.png'
import Search from '../Search'
import { useState } from 'react'
import { StyledTableCell, StyledTableRow } from 'bounceComponents/account/AuctionAddressTab/ActivitiesTab'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'

const CreateCredentialListDialog = create<{ whitelist: string[] }>(({}) => {
  const modal = useModal()
  const [searchText, setSearchText] = useState<string>('')
  const navigate = useNavigate()
  const handleResolve = () => {
    modal.hide()
  }
  const handleReject = () => {
    modal.reject(new Error('Rejected'))
    modal.hide()
  }

  const [selectedRows, setSelectedRows] = useState<number[]>([])
  console.log('🚀 ~ file: CreateCredentialListDialog.tsx:24 ~ CreateCredentialListDialog ~ selectedRows:', selectedRows)

  const handleCheckboxChange = (rowId: number) => {
    const newSelectedRows = [...selectedRows]
    const index = newSelectedRows.indexOf(rowId)
    if (index === -1) {
      newSelectedRows.push(rowId)
    } else {
      newSelectedRows.splice(index, 1)
    }
    setSelectedRows(newSelectedRows)
  }

  const list = [
    {
      title: 'Tweet Quoters',
      type: 'Twitter',
      id: 0,
      holders: 10,
      creator: {
        name: 'test',
        avatar: HeadImg,
        isVerified: false
      }
    },
    {
      title: 'Tweet Quoters',
      type: 'Twitter',
      id: 1,
      holders: 10,
      creator: {
        name: 'test',
        avatar: HeadImg,
        isVerified: false
      }
    },
    {
      title: 'Tweet Quoters',
      type: 'Twitter',
      id: 2,
      holders: 10,
      creator: {
        name: 'test',
        avatar: HeadImg,
        isVerified: false
      }
    },
    {
      title: 'Tweet Quoters',
      type: 'Twitter',
      id: 3,
      holders: 10,
      creator: {
        name: 'test',
        avatar: HeadImg,
        isVerified: false
      }
    },
    {
      title: 'Tweet Quoters',
      type: 'Email',
      id: 4,
      holders: 10,
      creator: {
        name: 'test',
        avatar: HeadImg,
        isVerified: false
      }
    },
    {
      title: 'Tweet Quoters',
      type: 'Email',
      id: 4,
      holders: 10,
      creator: {
        name: 'test',
        avatar: HeadImg,
        isVerified: false
      }
    },
    {
      title: 'Tweet Quoters',
      type: 'Email',
      id: 4,
      holders: 10,
      creator: {
        name: 'test',
        avatar: HeadImg,
        isVerified: false
      }
    }
  ]

  return (
    <Dialog
      title=" "
      titleStyle={{ padding: '20px 20px 20px 102px' }}
      contentStyle={{ width: '716px', padding: '0 40px 40px !important' }}
      {...muiDialogV5(modal)}
      onClose={handleReject}
    >
      <Stack spacing={20}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography color={'#121212'} fontSize={28} fontWeight={600}>
            Credential List
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 156, height: 40 }}
            onClick={() => {
              modal.hide()
              navigate(routes.preAuction.createNewPreAuction)
            }}
          >
            Create New
          </Button>
        </Stack>
        <Search
          maxWidth={'100%'}
          borderRadius="8px"
          searchText={searchText}
          setSearchText={setSearchText}
          placeholder="Search Credential"
        />
        <Stack>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Holders</StyledTableCell>
                <StyledTableCell>Creator</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: 310, height: '100%' }}>
              {list.map(record => (
                <StyledTableRow
                  key={record.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <StyledTableCell>
                    <Checkbox
                      checked={selectedRows.includes(record.id)}
                      onChange={() => handleCheckboxChange(record.id)}
                    />
                    {record.title}
                  </StyledTableCell>
                  <StyledTableCell>{record.type.toLocaleUpperCase()}</StyledTableCell>
                  <StyledTableCell>{record.holders}</StyledTableCell>
                  <StyledTableCell>
                    <Stack direction={'row'} alignItems={'center'} spacing={8}>
                      <Avatar alt="Remy Sharp" src={record.creator.avatar} />
                      <Typography fontSize={13} color={'#20201E'}>
                        {record.creator.name}
                      </Typography>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
        <Stack direction="row" alignItems={'center'} justifyContent="space-between" spacing={10}>
          <Button type="submit" variant="contained" fullWidth onClick={handleResolve}>
            Confirm
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
})

export default CreateCredentialListDialog
