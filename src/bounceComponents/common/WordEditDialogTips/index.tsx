import React, { useState } from 'react'
import {
  Dialog as MuiDialog,
  DialogContent,
  Stack,
  Typography,
  DialogProps as MuiDialogProps,
  Button,
  Box,
  TextField
} from '@mui/material'
import { create, register, useModal } from '@ebay/nice-modal-react'
import { ReactComponent as CloseSvg } from 'assets/imgs/close.svg'
import MarkdownEditor from './markdownEditor'

export interface DialogProps extends Omit<MuiDialogProps, 'open'> {
  onAgain?: (value: any) => void
  onCancel?: () => void
  onClose?: () => void
  content: React.ReactNode
  title?: string
  cancelBtn?: string
  againBtn?: string
  contentType?: 'TextBox' | 'Markdown'
  value?: string
}

const WordEditDialogTips = create((props: DialogProps) => {
  const { title, onAgain, onClose, cancelBtn, againBtn, onCancel, contentType, value, ...rest } = props
  const [textValue, setTextValue] = useState(value || '')
  console.log('props', props)

  const modal = useModal()
  const handleCancel = () => {
    onCancel?.()
    modal.hide()
  }
  const handleAgain = () => {
    onAgain?.(textValue)
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
          width: 680
        }
      }}
      {...rest}
    >
      <Box sx={{ textAlign: 'end', pt: 20, pr: 20, cursor: 'pointer' }} onClick={handleClose}>
        <CloseSvg />
      </Box>
      <DialogContent sx={{ padding: '0  36px 48px' }}>
        <Typography variant="h2" sx={{ color: '#000000', fontWeight: 500, textAlign: 'center' }}>
          {title}
        </Typography>
        {contentType === 'Markdown' && (
          <Box
            sx={{
              margin: '40px'
            }}
          >
            <MarkdownEditor
              value={textValue}
              setEditorValue={value => {
                setTextValue(value)
              }}
              placeholder="Customized needs description"
            />
          </Box>
        )}

        {contentType === 'TextBox' && (
          <Box mx={8} sx={{ textAlign: 'center' }}>
            <TextField
              sx={{ width: '100%', margin: '24px 0' }}
              value={textValue}
              onChange={value => setTextValue(value.target.value)}
            />
          </Box>
        )}
        <Stack alignItems="center">
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

export const id = 'wordEdit-dialog-tips'

register(id, WordEditDialogTips)

export default WordEditDialogTips
