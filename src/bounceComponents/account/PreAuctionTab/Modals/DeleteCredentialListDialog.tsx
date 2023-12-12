import { muiDialogV5, useModal, create } from '@ebay/nice-modal-react'
import { Button, Stack, Typography } from '@mui/material'
import Dialog from 'bounceComponents/common/DialogBase'
import { ReactComponent as DeleteIcon } from './delete.svg'

const DeleteCredentialListDialog = create<{ handleConfirm: () => void }>(({ handleConfirm }) => {
  const modal = useModal()

  const handleResolve = () => {
    handleConfirm()
    modal.hide()
  }
  const handleReject = () => {
    modal.reject(new Error('Rejected'))
    modal.hide()
  }

  return (
    <Dialog
      title=" "
      titleStyle={{ padding: '20px 20px 20px 102px' }}
      contentStyle={{ width: '480px', padding: '0 40px 40px !important' }}
      {...muiDialogV5(modal)}
      onClose={handleReject}
    >
      <Stack spacing={20}>
        <Stack justifyContent={'center'} textAlign={'center'}>
          <Typography width={'100%'} color={'#171717'} fontSize={28} fontWeight={600}>
            Are You Sure To Delete The Activity?
          </Typography>
          <Typography width={'100%'} color={'#959595'} fontSize={14} fontWeight={400}>
            You will lose all data retained by the activity, such as attendee lists.
          </Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'center'} py={20}>
          <DeleteIcon />
        </Stack>
        <Stack direction="row" alignItems={'center'} justifyContent="space-between" spacing={10}>
          <Button type="submit" variant="outlined" fullWidth onClick={handleReject}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" fullWidth onClick={handleResolve}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
})

export default DeleteCredentialListDialog
