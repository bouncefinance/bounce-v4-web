import { ReactNode } from 'react'
import { IconButton } from '@mui/material'

const SocialMediaButton = ({
  children,
  href,
  disabled
}: {
  children?: ReactNode
  href: string
  disabled?: boolean | undefined
}) => {
  return (
    <IconButton
      href={href}
      disabled={disabled}
      target="_blank"
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.27)',
        width: 38,
        height: 38,
        p: 5,
        opacity: disabled ? 0.5 : 1,
        filter: disabled ? 'grayscale(100%)' : 'unset',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {children}
    </IconButton>
  )
}

export default SocialMediaButton
