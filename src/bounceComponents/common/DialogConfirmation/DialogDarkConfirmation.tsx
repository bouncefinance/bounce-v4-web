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
import Lottie from 'react-lottie'
import bounce_loading from './assets/bounce-loading.json'
// import { ReactComponent as CloseSVG } from './assets/close.svg'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: bounce_loading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export interface DialogProps extends MuiDialogProps {
  title: string
  subTitle?: string
  onClose?: () => void
}

const DialogConfirmation: React.FC<DialogProps & NiceModalHocProps> = create((props: DialogProps) => {
  const { title, subTitle, onClose, ...rest } = props
  const modal = useModal()

  return (
    <MuiDialog
      onClose={() => (onClose ? onClose() : modal.hide())}
      sx={{
        backdropFilter: 'blur(4px)',
        // backgroundColor: 'rgba(0, 0, 0, 0.1)',
        '& .MuiDialog-paper': {
          backgroundColor: 'rgba(73, 73, 73, 0.3)',
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </IconButton>

      <DialogTitle sx={{ position: 'relative', padding: '50px 0 0px' }}>
        <Stack spacing={4} justifyContent="center" alignItems="center">
          <Typography variant="h2" sx={{ fontWeight: 500, textAlign: 'center', color: '#fff' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--ps-text-2)', textAlign: 'center' }}>
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
            <Lottie classwidth={200} height={200} options={defaultOptions} />
          </Box>
          <Button
            variant="contained"
            disabled
            sx={{
              background: 'transparent',
              border: 'none',
              '&:disabled': {
                background: 'transparent',
                border: 'none'
              }
            }}
          >
            Awaiting...
          </Button>
        </Stack>
      </DialogContent>
    </MuiDialog>
  )
})

export default DialogConfirmation
