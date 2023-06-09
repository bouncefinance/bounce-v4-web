import { Box, Skeleton } from '@mui/material'

const PoolCardSkeleton = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '370px',
        background: `#FFFFFF`,
        borderRadius: `24px`,
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '252px',
          backgroundColor: '#F6F7F3'
        }}
      >
        <Skeleton
          sx={{
            position: 'absolute',
            width: '100%',
            padding: '0 25px',
            bottom: '16px',
            left: 0,
            fontFamily: `'Inter'`,
            fontWeight: 400,
            fontSize: 12,
            color: '#fff',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
          variant="rectangular"
          width="100%"
          height="26px"
          animation="wave"
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          padding: '12px 16px 16px',
          background: '#fff'
        }}
      >
        <Skeleton
          sx={{
            width: '100%',
            fontFamily: `'Public Sans'`,
            fontWeight: 500,
            fontSize: 16,
            color: '#000',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            marginBottom: '4px'
          }}
          variant="rectangular"
          width="100%"
          height="26px"
          animation="wave"
        />
        <Skeleton
          sx={{
            width: '100%',
            fontFamily: `'Inter'`,
            fontWeight: 400,
            fontSize: 12,
            color: 'var(--ps-text-6)',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            marginBottom: '8px'
          }}
          variant="rectangular"
          width="100%"
          height="26px"
          animation="wave"
        />
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Skeleton
            sx={{
              flex: 1,
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: 20,
              color: 'var(--ps-text-3)',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
            variant="rectangular"
            width="100%"
            height="26px"
            animation="wave"
          />
          <Skeleton
            sx={{
              height: '37px',
              lineHeight: '37px',
              borderRadius: '6px'
              // background: 'var(--ps-yellow-1)',
            }}
            variant="rectangular"
            width="100%"
            height="26px"
            animation="wave"
          />
        </Box>
      </Box>
    </Box>
  )
}
export default PoolCardSkeleton
