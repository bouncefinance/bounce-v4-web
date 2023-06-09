import { Box, Stack, Typography } from '@mui/material'
import Image from 'components/Image'
import LikeUnlike from 'bounceComponents/common/LikeUnlike'
import { LIKE_OBJ } from 'api/idea/type'
import { ChainListMap } from 'constants/chain'
import Favorite from 'bounceComponents/common/Favorite'
import { useUserInfo } from 'state/users/hooks'
import { FixedSwapPoolParams } from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'
import BackIcon from 'assets/images/back.png'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from '../../../hooks/useBreakpoint'
const styles = {
  p: '7px 16px',
  borderRadius: '50px',
  background: '#FFFFFF',
  '&:hover': {
    background: '#FFFFFF'
  }
}

const Header = ({ poolInfo, getPoolInfo }: FixedSwapPoolParams): JSX.Element => {
  const { userId } = useUserInfo()
  const isMobile = useBreakpoint('lg')
  const navigator = useNavigate()
  if (!poolInfo.ethChainId) return <></>
  return (
    <Box sx={{ display: isMobile ? 'block' : 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {!isMobile && (
        <>
          <Stack direction="row" spacing={20} sx={{ alignItems: 'center' }} maxWidth={'80%'}>
            <Image
              style={{
                cursor: 'pointer'
              }}
              src={BackIcon}
              width={46}
              height={46}
              onClick={() => {
                navigator(-1)
              }}
            />
            <Typography variant="h1" sx={{ fontSize: 30 }}>
              {poolInfo?.name} Random-Selection Pool
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
        <>
          <Box>
            <Image
              style={{
                cursor: 'pointer'
              }}
              src={BackIcon}
              width={46}
              height={46}
              onClick={() => {
                navigator(-1)
              }}
            />
            <Typography variant="h1" sx={{ fontSize: 30 }}>
              {poolInfo?.name} Random-Selection Pool
            </Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}>
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
    </Box>
  )
}

export default Header
