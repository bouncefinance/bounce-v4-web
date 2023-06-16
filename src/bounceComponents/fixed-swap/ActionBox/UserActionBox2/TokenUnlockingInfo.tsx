import { Box } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tokenReleaseTypeText } from 'bounceComponents/create-auction-pool/CreationConfirmation'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import PopperCard from 'components/PopperCard'
import { CurrencyAmount } from 'constants/token'

export default function TokenUnlockingInfo({
  releaseType,
  releaseData
}: {
  releaseType: IReleaseType | number
  releaseData: { startAt: number; endAt: number | undefined; ratio: string | undefined }[]
}) {
  return (
    <PoolInfoItem title="Methods of Token Unlocking">
      <PopperCard
        targetElement={
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            {tokenReleaseTypeText(releaseType)}
          </span>
        }
      >
        <Stack spacing={10} padding="10px 15px" maxWidth={400}>
          {releaseType === IReleaseType.Instant && (
            <Typography>Get token immediately when participating in the auction.</Typography>
          )}
          {releaseType === IReleaseType.Cliff && (
            <Typography>
              Tokens can be claimed after{' '}
              {releaseData?.[0].startAt ? new Date(releaseData?.[0].startAt * 1000).toLocaleString() : '-'}
            </Typography>
          )}
          {releaseType === IReleaseType.Linear && (
            <>
              <Typography>
                Linear unlocking of tokens begins after{' '}
                {releaseData?.[0].startAt ? new Date(releaseData?.[0].startAt * 1000).toLocaleString() : '-'}
              </Typography>
              <Typography>
                Linear unlocking of tokens ends after{' '}
                {releaseData?.[0].endAt ? new Date(releaseData?.[0].endAt * 1000).toLocaleString() : '-'}
              </Typography>
            </>
          )}
          {releaseType === IReleaseType.Fragment && (
            <>
              <Typography mb={10}>Staged release</Typography>
              <Box display="grid" gridTemplateColumns={'1fr 40px'} gap={5} width={300}>
                {releaseData.map((item, idx) => {
                  const ca = CurrencyAmount.ether(item.ratio || '0').multiply('100')
                  return (
                    <>
                      <Typography key={idx + 'a'}>
                        {item.startAt ? new Date(item.startAt * 1000).toLocaleString() : '-'}
                      </Typography>
                      <Typography width={100} key={idx}>
                        {ca.toSignificant(4)} %
                      </Typography>
                    </>
                  )
                })}
              </Box>
            </>
          )}
        </Stack>
      </PopperCard>
    </PoolInfoItem>
  )
}
