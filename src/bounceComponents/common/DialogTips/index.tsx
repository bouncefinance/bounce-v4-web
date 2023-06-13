import React from 'react'
import {
  Dialog as MuiDialog,
  DialogContent,
  Stack,
  Typography,
  DialogTitle,
  DialogProps as MuiDialogProps,
  Button,
  Box
} from '@mui/material'
import { create, register, useModal } from '@ebay/nice-modal-react'
import Image from 'components/Image'
import { ReactComponent as CloseSvg } from 'assets/imgs/close.svg'

export interface DialogProps extends Omit<MuiDialogProps, 'open'> {
  onAgain?: () => void
  onCancel?: () => void
  onClose?: () => void
  content: React.ReactNode
  iconType: 'success' | 'error'
  title?: string
  cancelBtn?: string
  againBtn?: string
}

const DialogTips = create((props: DialogProps) => {
  const { content, title, onAgain, onClose, cancelBtn, againBtn, onCancel, iconType, ...rest } = props
  const modal = useModal()
  const handleCancel = () => {
    onCancel?.()
    modal.hide()
  }
  const handleAgain = () => {
    onAgain?.()
    modal.hide()
  }
  const handleClose = () => {
    onClose?.()
    modal.hide()
  }
  return (
    <MuiDialog
      open={modal.visible}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          // minWidth: 480,
          borderRadius: 20,
          width: 480
        }
      }}
      {...rest}
    >
      <Box sx={{ textAlign: 'end', pt: 20, pr: 20, cursor: 'pointer' }} onClick={handleClose}>
        <CloseSvg />
      </Box>
      <DialogTitle sx={{ padding: '16px 0 45px' }}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <picture>
            {iconType === 'success' && <Image alt="" src="/imgs/dialog/success.png" width={58} height={60} />}
            {iconType === 'error' && <Image alt="" src={'/imgs/dialog/fail.png'} width={58} height={60} />}
          </picture>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ padding: '0  36px 48px' }}>
        <Typography variant="h2" sx={{ color: '#000000', fontWeight: 500, textAlign: 'center' }}>
          {title}
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 8 }}>{content}</Box>
        <Stack alignItems="center" mt={40}>
          <Stack direction="row" justifyContent="center" columnGap={10}>
            {cancelBtn && (
              <Button variant="outlined" sx={{ p: '20px 30px', minWidth: 132 }} onClick={handleCancel}>
                {cancelBtn}
              </Button>
            )}
            {againBtn && (
              <Button variant="contained" sx={{ p: '20px 30px', minWidth: 132 }} onClick={handleAgain}>
                {againBtn}
              </Button>
            )}
          </Stack>
        </Stack>
      </DialogContent>
    </MuiDialog>
  )
})

export const id = 'dialog-tips'

register(id, DialogTips)

export default DialogTips
