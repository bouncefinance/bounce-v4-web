import React from 'react'
import { Box, useTheme, Button } from '@mui/material'
import { ReactComponent as CrossCircle } from 'assets/componentsIcon/statusIcon/error_icon.svg'
import { OutlinedCard } from 'components/Card'
import Spinner from 'components/Spinner'
import { Connection } from 'connection/types'
import { ChainId } from 'constants/chain'
import { useSignLoginModalControl } from 'state/application/hooks'

export default function PendingView({
  connector,
  error = false,
  setPendingError,
  tryActivation,
  children
}: {
  children: React.ReactNode
  connector?: Connection
  error?: boolean
  setPendingError: (error: boolean) => void
  tryActivation: (connection: Connection, onSuccess: () => void, chainId?: ChainId | undefined) => Promise<void>
}) {
  const theme = useTheme()
  const { open } = useSignLoginModalControl()

  return (
    <Box display="grid" gap="32px" width="100%" justifyItems="center">
      {error ? (
        <Box display="grid" justifyItems="center" gap="16px" width="100%">
          <CrossCircle />
          <span>Error connecting. Please try again</span>
        </Box>
      ) : (
        <>
          <OutlinedCard color={theme.palette.primary.main} style={{ margin: '20px' }} padding="16px" width="80%">
            <Box display="flex" gap="16px" width="100%">
              <Spinner />
              Waiting to connect...
            </Box>
            {children}
          </OutlinedCard>
        </>
      )}

      {error && (
        <Box display="grid" gap="15px" gridTemplateColumns={'1fr 1fr'} width="100%">
          {children}
          {error && (
            <Button
              onClick={() => {
                setPendingError(false)
                connector && tryActivation(connector, () => open())
              }}
            >
              Try Again
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}
