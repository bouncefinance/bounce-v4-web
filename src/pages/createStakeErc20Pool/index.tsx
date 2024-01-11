import { Box, Typography } from '@mui/material'
import SingleTokenPool from './singleTokenPool'
import React from 'react'
import MultipleTokenPools from './multipleTokenPools'

interface TabContent {
  title: string
  index: number
}

interface Tab extends TabContent {
  subTab?: TabContent[]
}

export const Tabs: Tab[] = [
  { title: 'Single', index: 1 },
  { title: 'Multiple', index: 2 }
]

const CreateStakeErc20Pool = () => {
  const [tabIndex, setTabNumber] = React.useState(0)
  return (
    <Box>
      <Box
        sx={{
          maxWidth: 800,
          margin: '20px auto 0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {Tabs.map(({ title }, idx) => (
          <Box
            key={idx}
            sx={{
              flex: 1,
              fontSize: 14,
              padding: '12px 0px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: tabIndex === idx ? 'rgba(225,242,92,1)' : 'rgb(255, 255, 255)'
            }}
            onClick={() => setTabNumber(idx)}
          >
            <Typography
              variant="h4"
              sx={{
                margin: 0,
                color: '#000',
                fontWeight: 600
              }}
            >
              {title}
            </Typography>
          </Box>
        ))}
      </Box>
      {tabIndex === 0 ? <SingleTokenPool /> : <MultipleTokenPools />}
    </Box>
  )
}

export default CreateStakeErc20Pool
