import { Box, Stack, Typography, useTheme } from '@mui/material'
import Image from 'components/Image'
import LikeUnlike from 'bounceComponents/common/LikeUnlike'
import { LIKE_OBJ } from 'api/idea/type'
import { ChainListMap } from 'constants/chain'
import Favorite from 'bounceComponents/common/Favorite'
import { useUserInfo } from 'state/users/hooks'
import { PoolInfoProp } from '../type'
import useBreakpoint from '../../../hooks/useBreakpoint'

const styles = {
  p: '7px 16px',
  borderRadius: '50px',
  background: '#FFFFFF',
  '&:hover': {
    background: '#FFFFFF'
  }
}

const Header = ({
  poolInfo,
  getPoolInfo,
  typeName = 'Fixed-Price'
}: {
  poolInfo: PoolInfoProp
  getPoolInfo?: () => void
  typeName?: string
}): JSX.Element => {
  const { userId } = useUserInfo()
  const isMobile = useBreakpoint('lg')
  const theme = useTheme()
  if (!poolInfo.ethChainId) return <></>
  return (
    <Box sx={{ display: isMobile ? 'block' : 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {!isMobile && (
        <>
          <Stack direction="row" spacing={20} sx={{ alignItems: 'center' }} maxWidth={'80%'}>
            <Typography variant="h1" sx={{ fontSize: isMobile ? 22 : 30 }}>
              {poolInfo?.name} {typeName} Pool
            </Typography>

            <LikeUnlike
              likeObj={LIKE_OBJ.pool}
              objId={poolInfo?.id}
              likeAmount={{
                dislikeCount: poolInfo?.likeInfo?.dislikeCount,
                likeCount: poolInfo?.likeInfo?.likeCount,
                myDislike: poolInfo?.likeInfo?.myDislike,
                myLike: poolInfo?.likeInfo?.myLike
              }}
              onSuccess={getPoolInfo}
              likeSx={{
                ...styles,
                '&:hover': {
                  color: '#259C4A',
                  background: '#FFFFFF'
                }
              }}
              unlikeSx={{
                ...styles,
                '&:hover': {
                  color: '#CA2020',
                  background: '#FFFFFF'
                }
              }}
            />
            {!!userId && <Favorite collectionId={Number(poolInfo.id)} defaultCollected={poolInfo.ifCollect} />}
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ fontSize: 20, lineHeight: '20px' }}>
              #{poolInfo?.poolId}
            </Typography>
            <Box
              sx={{
                borderRadius: 20,
                bgcolor: '#fff',
                ml: 6,
                display: 'flex',
                alignItems: 'center',
                columnGap: 6,
                px: 10,
                py: 6
              }}
            >
              <Image src={ChainListMap[poolInfo.ethChainId]?.logo || ''} width={20} height={20} />
              <Typography variant="body1" sx={{ fontSize: 16, lineHeight: '20px' }}>
                {ChainListMap[poolInfo.ethChainId]?.name}
              </Typography>
            </Box>
          </Box>
        </>
      )}
      {isMobile && (
        <Box sx={{ px: 24 }}>
          <Typography variant="h1" sx={{ fontSize: 30 }}>
            {poolInfo?.name} {typeName} Pool11
          </Typography>

          <Box
            display={'flex'}
            alignItems={'center'}
            sx={{
              [theme.breakpoints.down('lg')]: {
                flexWrap: 'wrap',
                gap: 20,
                marginTop: 10
              }
            }}
          >
            <LikeUnlike
              likeObj={LIKE_OBJ.pool}
              objId={poolInfo?.id}
              likeAmount={{
                dislikeCount: poolInfo?.likeInfo?.dislikeCount,
                likeCount: poolInfo?.likeInfo?.likeCount,
                myDislike: poolInfo?.likeInfo?.myDislike,
                myLike: poolInfo?.likeInfo?.myLike
              }}
              onSuccess={getPoolInfo}
              likeSx={{
                ...styles,
                '&:hover': {
                  color: '#259C4A',
                  background: '#FFFFFF'
                }
              }}
              unlikeSx={{
                ...styles,
                '&:hover': {
                  color: '#CA2020',
                  background: '#FFFFFF'
                }
              }}
            />
            {!!userId && <Favorite collectionId={Number(poolInfo.id)} defaultCollected={poolInfo.ifCollect} />}
            <Typography variant="body1" sx={{ fontSize: 20, lineHeight: '20px', ml: 6 }}>
              #{poolInfo?.poolId}
            </Typography>
            <Box
              sx={{
                borderRadius: 20,
                bgcolor: '#fff',
                ml: 6,
                display: 'flex',
                alignItems: 'center',
                columnGap: 6,
                px: 10,
                py: 6
              }}
            >
              <Image src={ChainListMap[poolInfo.ethChainId]?.logo || ''} width={20} height={20} />
              <Typography variant="body1" sx={{ fontSize: 16, lineHeight: '20px' }}>
                {ChainListMap[poolInfo.ethChainId]?.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Header
