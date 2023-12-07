import { Box, Button, Stack, Tab, Tabs, styled, useTheme } from '@mui/material'
import { ReactComponent as AddSvg } from 'assets/imgs/user/add.svg'
import { useState } from 'react'
import Search from './Search'
import ChainSelect from 'bounceComponents/common/ChainSelect'
import { PoolStatus } from 'api/pool/type'
import StatusSelect from './StatusSelect'

const CustomTab = styled(Box)({
  '& .MuiTabs-root': {
    border: '1px solid #E4E4E4',
    borderRadius: '100px',
    padding: '4px',
    '.MuiTabs-indicator': {
      display: 'none'
    },
    button: {
      textTransform: 'none'
    },
    '& .Mui-selected': {
      color: '#121212',
      background: '#E1F25C',
      borderRadius: '100px'
    }
  }
})

export default function PreAuctionActivityTab() {
  const theme = useTheme()
  const [curChain, setCurChain] = useState(0)
  const [curTab, setCurTab] = useState(0)
  const [curPoolType, setCurPoolType] = useState<PoolStatus | 0>(0)

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <CustomTab>
          <Tabs onChange={(_e, val) => setCurTab(val)} value={curTab}>
            <Tab label="Participated" />
            <Tab label="Created" />
          </Tabs>
        </CustomTab>
        <Button
          sx={{
            width: 297,
            height: 48,
            borderRadius: 50,
            border: 'none',
            background: '#F6F6F3',
            color: theme.palette.text.primary,
            '&:hover': {
              color: '#121212'
            }
          }}
          onClick={() => {}}
          startIcon={<AddSvg />}
        >
          Create new Pre-Auction Activity
        </Button>
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={20}>
        <Search />
        <Stack direction={'row'} spacing={20}>
          <ChainSelect curChain={curChain} setCurChain={v => setCurChain(v || 0)} />
          <StatusSelect curPoolType={curPoolType} setCurPoolType={t => setCurPoolType(t)} />
        </Stack>
      </Stack>
    </Box>
  )
}
