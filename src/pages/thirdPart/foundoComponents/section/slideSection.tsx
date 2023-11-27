import { Typography } from '@mui/material'
import CenterSeciont from '../centerSection'
import React, { useState } from 'react'
import { useIsSMDown } from 'themes/useTheme'
import AddIcon from 'assets/imgs/thirdPart/foundoDetail/addIcon.svg'
import DscIcon from 'assets/imgs/thirdPart/foundoDetail/dscIcon.svg'

const SlideSection = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const isSm = useIsSMDown()
  return (
    <CenterSeciont
      style={{
        maxWidth: '100vw',
        flexFlow: isSm ? 'column nowrap' : 'row nowrap',
        justifyContent: isSm ? 'flex-start' : 'space-between',
        alignItems: 'flex-start',
        minHeight: isSm ? '45px' : '104px',
        overflow: 'hidden',
        maxHeight: open ? 'auto' : isSm ? '45px' : '104px',
        borderBottom: `1px solid rgba(255, 255, 255, 0.4)`
      }}
    >
      <Typography
        sx={{
          width: '100%',
          fontFamily: `'Inter'`,
          fontWeight: 600,
          fontSize: isSm ? 16 : 20,
          color: '#fff',
          cursor: 'pointer',
          lineHeight: isSm ? '46px' : '104px',
          display: 'flex',
          flexFLow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        onClick={() => {
          const result = !open
          setOpen(result)
        }}
      >
        {title}
        {isSm && (
          <img
            src={open ? DscIcon : AddIcon}
            style={{
              width: '13px',
              height: '13px'
            }}
            alt=""
          />
        )}
      </Typography>
      {open && children}
    </CenterSeciont>
  )
}
export default SlideSection
