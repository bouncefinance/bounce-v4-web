import React from 'react'
import {
  Dialog as MuiDialog,
  DialogContent,
  Stack,
  Typography,
  DialogTitle,
  DialogProps as MuiDialogProps,
  Button,
  Box,
  IconButton
} from '@mui/material'
import { create, NiceModalHocProps, useModal } from '@ebay/nice-modal-react'
import { ReactComponent as CloseSVG } from './assets/close.svg'
import { ReactComponent as DialogLogo } from './assets/dialog-logo.svg'

export interface DialogProps extends MuiDialogProps {
  title: string
  subTitle?: string
  onClose?: () => void
  isBot?: boolean
}

const DialogConfirmation: React.FC<DialogProps & NiceModalHocProps> = create((props: DialogProps) => {
  const { title, subTitle, onClose, ...rest } = props
  const modal = useModal()

  return (
    <MuiDialog
      onClose={() => (onClose ? onClose() : modal.hide())}
      sx={{
        '& .MuiDialog-paper': {
          width: 480,
          borderRadius: 20,
          pl: 30,
          pr: 40
        }
      }}
      {...Object.assign(rest, { open: modal.visible })}
    >
      <IconButton
        color="primary"
        aria-label="dialog-close"
        sx={{ position: 'absolute', right: 12, top: 12 }}
        onClick={() => (onClose ? onClose() : modal.hide())}
      >
        <CloseSVG />
      </IconButton>

      <DialogTitle sx={{ position: 'relative', padding: '50px 0 0px' }}>
        <Stack spacing={4} justifyContent="center" alignItems="center">
          <Typography variant="h2" sx={{ fontWeight: 500, textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--ps-gray-600)', textAlign: 'center' }}>
            {subTitle}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pb: 48, px: 6 }}>
        <Stack>
          <Box
            sx={{
              display: 'grid',
              placeContent: 'center',
              width: 220,
              height: 220,
              margin: '0 auto'
            }}
          >
            <DialogLogo />
          </Box>
          <Button variant="contained" disabled>
            Awaiting...
          </Button>
        </Stack>
      </DialogContent>
    </MuiDialog>
  )
})

export default DialogConfirmation
