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
        backdropFilter: 'blur(4px)',
        '& .MuiDialog-paper': {
          backgroundColor: 'rgba(73, 73, 73, 0.3)',
          // minWidth: 480,
          borderRadius: 20,
          width: 480
        }
      }}
      {...rest}
    >
      <Box sx={{ textAlign: 'end', pt: 20, pr: 20, cursor: 'pointer' }} onClick={handleClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </Box>
      <DialogTitle sx={{ padding: '16px 0 45px' }}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <picture>
            {iconType === 'success' && <Image alt="" src="/imgs/dialog/dark_success.svg" height={60} />}
            {iconType === 'error' && <Image alt="" src={'/imgs/dialog/dark_fail.svg'} height={60} />}
          </picture>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ padding: '0  36px 48px' }}>
        <Typography variant="h2" sx={{ color: '#fff', fontWeight: 500, textAlign: 'center' }}>
          {title}
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 8, color: 'var(--ps-text-2)' }}>{content}</Box>
        <Stack alignItems="center" mt={40}>
          <Stack direction="row" justifyContent="center" width={'100%'} columnGap={10}>
            {cancelBtn && (
              <Button
                variant="text"
                sx={{
                  p: '20px 30px',
                  width: '100%',
                  borderRadius: 36,
                  color: '#fff',
                  '&:hover': {
                    color: '#000'
                  }
                }}
                onClick={handleCancel}
              >
                {cancelBtn}
              </Button>
            )}
            {againBtn && (
              <Button
                variant="contained"
                sx={{
                  p: '20px 30px',
                  width: '100%',
                  color: '#000',
                  borderRadius: 36,
                  backgroundColor: '#fff',
                  '&:hover': {
                    background: 'var(--ps-yellow-1)',
                    color: '#000'
                  }
                }}
                onClick={handleAgain}
              >
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
