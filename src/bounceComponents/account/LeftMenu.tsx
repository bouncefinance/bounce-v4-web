import { Box, MenuItem, Stack, styled, Typography, useTheme } from '@mui/material'
import Tooltip from 'bounceComponents/common/Tooltip'
import Divider from 'components/Divider'
import { useNavigate } from 'react-router-dom'
import { LinksProps } from './AccountLayout'

const StyledMenuItem = styled(MenuItem)<{ selected?: boolean }>(({ selected }) => ({
  height: 52,
  borderRadius: '8px',
  backgroundColor: selected ? 'var(--ps-yellow-1)!important' : 'transparent',
  color: 'rgba(0, 0, 0, 0.87)',
  '& svg': {
    flex: 'none'
  }
}))

type LeftMenuProps = {
  Links: LinksProps[][]
  pathname: string
}

export default function LeftMenu({ Links, pathname }: LeftMenuProps) {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box>
      <Box
        sx={{
          position: 'fixed',
          top: `calc(${theme.height.header} + 1px)`,
          left: 0,
          width: 240,
          bottom: 0,
          padding: '16px 8px',
          backgroundColor: '#fff',
          borderRight: '1px solid var(--ps-text-5)',
          overflowY: 'auto'
        }}
      >
        <Stack spacing={8}>
          {Links.map((list, idx) => (
            <Box key={idx}>
              {idx !== 0 && <Divider />}
              <Typography color={'var(--ps-text-2)'} variant="body2">
                {idx === 1 ? 'Auctions' : idx === 2 ? 'Tools' : ''}
              </Typography>
              <Stack spacing={8} key={idx}>
                {list.map(item => (
                  <StyledMenuItem
                    selected={!!(item.route && pathname.includes(item.route))}
                    onClick={() =>
                      item.route
                        ? navigate(item.route)
                        : item.link
                        ? item._blank
                          ? window.open(item.link)
                          : (location.href = item.link)
                        : {}
                    }
                    key={item.name}
                  >
                    {item.svg}
                    {item.disabled ? (
                      <Tooltip title="Coming soon">
                        <Typography ml={10} sx={{ whiteSpace: 'pre-wrap' }}>
                          {item.name}
                        </Typography>
                      </Tooltip>
                    ) : item.link ? (
                      <Tooltip title={`Go to ${item.name}`}>
                        <Typography ml={10} sx={{ whiteSpace: 'pre-wrap' }}>
                          {item.name}
                        </Typography>
                      </Tooltip>
                    ) : (
                      <Typography ml={10} sx={{ whiteSpace: 'pre-wrap' }}>
                        {item.name}
                      </Typography>
                    )}
                  </StyledMenuItem>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
