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
import { ReactComponent as Bot } from 'assets/svg/bot.svg'
import { ReactComponent as CloseSvg } from 'assets/imgs/close.svg'

export interface DialogProps extends Omit<MuiDialogProps, 'open'> {
  onAgain?: () => void
  onCancel?: () => void
  onClose?: () => void
  content: React.ReactNode
  title?: string
  cancelBtn?: string
  againBtn?: string
}
// const CusAgainButton = styled(Button)`
//   display: flex;
//   padding: 20px 40px;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   border-radius: 8px;
//   background: var(--yellow, #121212);
//   color: var(--white-100, #fff);
//   border: 0;
//   &:hover {
//     border: 0;
//   }
// `
// const CusCancelButton = styled(Button)`
//   display: flex;
//   padding: 20px 40px;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   border-radius: 8px;
//   border: 1px solid var(--black-100, #121212);
//   background: var(--white-100, #fff);
//   &:hover {
//     background: var(--white-100, #fff);
//     border: 1px solid var(--black-100, #121212);
//   }
// `

const DialogBotTips = create((props: DialogProps) => {
  const { content, title, onAgain, onClose, cancelBtn, againBtn, onCancel, ...rest } = props
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
          <Bot />
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

register(id, DialogBotTips)

export default DialogBotTips
