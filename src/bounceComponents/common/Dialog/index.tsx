import React from 'react'
import {
  Dialog as MuiDialog,
  DialogContent,
  Stack,
  Typography,
  DialogTitle,
  IconButton,
  DialogProps as MuiDialogProps
} from '@mui/material'
import { NiceModalHocProps, create, useModal } from '@ebay/nice-modal-react'
import { ReactComponent as CloseSVG } from 'assets/imgs/components/close.svg'

export interface IDialogProps extends MuiDialogProps {
  title?: string
  children: React.ReactNode
}

const Dialog: React.FC<IDialogProps & NiceModalHocProps> = create(props => {
  const { title, children, ...rest } = props
  const modal = useModal()
  return (
    <MuiDialog
      {...rest}
      open={modal.visible}
      onClose={() => modal.hide()}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: 860,
          borderRadius: 20
        }
      }}
    >
      <DialogTitle sx={{ padding: '20px 20px 40px 102px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h2" sx={{ pr: 30 }}>
            {title}
          </Typography>

          <IconButton
            color="primary"
            aria-label="dialog-close"
            sx={{ width: 52, height: 52, border: '1px solid rgba(0, 0, 0, 0.27)' }}
            onClick={() => modal.hide()}
          >
            <CloseSVG />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ padding: '20px 102px 48px' }}>{children}</DialogContent>
    </MuiDialog>
  )
})

export default Dialog
