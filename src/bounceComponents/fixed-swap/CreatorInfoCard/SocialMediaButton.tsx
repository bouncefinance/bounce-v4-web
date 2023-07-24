import { ReactNode } from 'react'
import { IconButton } from '@mui/material'

const SocialMediaButton = ({ children, href }: { children?: ReactNode; href: string }) => {
  return (
    <IconButton
      href={href}
      target="_blank"
      sx={{ border: '1px solid rgba(0, 0, 0, 0.27)', width: 38, height: 38, p: 5 }}
    >
      {children}
    </IconButton>
  )
}

export default SocialMediaButton
