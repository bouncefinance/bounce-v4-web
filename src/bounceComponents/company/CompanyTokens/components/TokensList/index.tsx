import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { show } from '@ebay/nice-modal-react'
import TokensForm from '../TokensForm'
import { ReactComponent as EditBtnSVG } from 'assets/imgs/profile/investments/edit-btn.svg'
import { getLabelById, shortenAddress } from 'utils'
import { ICompanyTokensListItems } from 'api/company/type'
import MuiDialog from 'bounceComponents/common/Dialog'
import TokenDefaultSVG from 'assets/imgs/defaultAvatar/token.svg'
import { useOptionDatas } from 'state/configOptions/hooks'

export type ITokensListProps = {
  list: ICompanyTokensListItems[]
  onEdit: (data: ICompanyTokensListItems, index: number) => void
  onDelete: (index: number) => void
}

const TokensList: React.FC<ITokensListProps> = ({ list, onEdit, onDelete }) => {
  const optionDatas = useOptionDatas()

  const handleEdit = (v: any) => {
    show(MuiDialog, {
      title: 'Edit the team member',
      fullWidth: true,
      children: <TokensForm editData={v} onEdit={onEdit} onDelete={onDelete} />
    })
  }

  return (
    <Box>
      {list.map((v, i) => (
        <Stack
          key={i}
          sx={{
            background: 'var(--ps-gray-50)',
            borderRadius: '20px',
            marginBottom: 8,
            padding: '16px 20px'
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack direction="row" spacing={12} alignItems="center">
              <Avatar
                alt=""
                src={v.tokenLogo || TokenDefaultSVG}
                sx={{ width: 52, height: 52, borderRadius: '10px' }}
              />
              <Stack spacing={2}>
                <Typography variant="h4" sx={{ fontSize: 16, lineHeight: '20px' }}>
                  {v.tokenName}
                </Typography>
                {v.isIssued ? <Typography variant="body1">(Token is not issued)</Typography> : null}
              </Stack>
            </Stack>
            <IconButton edge="end" onClick={() => handleEdit({ data: v, index: i })}>
              <EditBtnSVG />
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ lineHeight: '15px', marginTop: 20, marginBottom: 15 }}
          >
            <Typography variant="body2" sx={{ color: 'var(--ps-gray-700)' }}>
              Token Type
            </Typography>
            <Typography variant="body2">
              {getLabelById(v.tokenType, 'name', optionDatas?.tokenTypeOpt)}
              {` (${getLabelById(v.chainIdentifierId, 'shortName', optionDatas?.chainInfoOpt)})`}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ lineHeight: '15px' }}>
            <Typography variant="body2" sx={{ color: 'var(--ps-gray-700)' }}>
              Contract address
            </Typography>
            <Typography variant="body2">{v.tokenAddress ? shortenAddress(v.tokenAddress) : '-'}</Typography>
          </Stack>
        </Stack>
      ))}
    </Box>
  )
}

export default TokensList
