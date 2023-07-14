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
import { ReactComponent as CloseSVG } from 'assets/imgs/components/close.svg'

export interface DialogProps extends MuiDialogProps {
  title?: string
  children?: React.ReactNode
  onClose: () => void
  contentStyle?: React.CSSProperties
  titleStyle?: React.CSSProperties
}

const Dialog = ({ title, children, open, onClose, contentStyle, titleStyle, ...restProps }: DialogProps) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      {...restProps}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: 860,
          borderRadius: 20
        }
      }}
    >
      <DialogTitle sx={{ padding: { md: '20px 20px 40px 102px' }, ...titleStyle }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {title && (
            <Typography variant="h2" sx={{ pr: 30, fontSize: { xs: 18, md: 22 } }}>
              {title}
            </Typography>
          )}
          <IconButton
            color="primary"
            aria-label="dialog-close"
            sx={{ width: { xs: 40, md: 52 }, height: { xs: 40, md: 52 }, border: '1px solid rgba(0, 0, 0, 0.27)' }}
            onClick={() => {
              onClose()
            }}
          >
            <CloseSVG />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ padding: { md: '20px 102px 48px' }, ...contentStyle }}>{children}</DialogContent>
    </MuiDialog>
  )
}

export default Dialog
