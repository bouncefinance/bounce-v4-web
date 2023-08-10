import { IconButton, Tooltip, TooltipProps } from '@mui/material'
import Image from 'components/Image'
import React, { useEffect, useState } from 'react'
import ReactCopyToClipboard from 'react-copy-to-clipboard'
import CopySVG from './assets/copy.svg'
import SureSVG from './assets/sure.svg'

export type ICopyToClipboardProps = {
  text: string
  children?: any
  placement?: TooltipProps['placement']
}

const CopyToClipboard: React.FC<ICopyToClipboardProps> = ({ text, children, placement = 'top' }) => {
  const [copied, setCopied] = useState<boolean>(false)
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])
  return (
    <div onClick={ev => ev.preventDefault()}>
      <ReactCopyToClipboard
        text={text}
        onCopy={() => {
          setCopied(true)
        }}
      >
        <Tooltip title={copied ? 'Copied' : 'Copy'} placement={placement} arrow>
          {children ? (
            <div>{children}</div>
          ) : (
            <IconButton size="small" sx={{ background: 'none', height: 'fit-content', p: 0 }}>
              <Image src={copied ? SureSVG : CopySVG} width={20} height={20} alt="copied-icon" />
            </IconButton>
          )}
        </Tooltip>
      </ReactCopyToClipboard>
    </div>
  )
}

export default CopyToClipboard
