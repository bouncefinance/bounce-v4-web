import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import styles from './styles'
import { ReactComponent as LikeSVG } from 'assets/imgs/like.svg'
import { ReactComponent as UnlikeSVG } from 'assets/imgs/unlike.svg'
import { useLike } from 'bounceHooks/like/useLike'
import { ILikeUnlikeRes, LIKE_OBJ, LIKE_STATUS, LIKE_TYPE, UNLIKE_STATUS } from 'api/idea/type'

export interface ILikeUnlikeProps {
  likeObj: LIKE_OBJ
  objId: number
  likeAmount: ILikeUnlikeRes
  onSuccess?: (res?: ILikeUnlikeRes) => void
  likeSx?: any
  unlikeSx?: any
}

const LikeUnlike: React.FC<ILikeUnlikeProps> = ({ likeObj, objId, likeAmount, onSuccess, likeSx, unlikeSx }) => {
  const { postLike, likeRes } = useLike()
  likeAmount = likeRes?.data || likeAmount
  const postLikeStatus = async (likeType: LIKE_TYPE): Promise<any> => {
    try {
      const res = await postLike({
        likeType: likeType,
        likeObj,
        objId
      })
      onSuccess?.(res?.data)
    } catch (err: any) {
      if (err?.code === 20000) {
        return toast.error('Please login first!')
      }
      toast.error('Update failed')
    }
  }

  const handleLike = () => {
    if (likeAmount?.myLike === LIKE_STATUS.no) {
      postLikeStatus(LIKE_TYPE.like)
    } else {
      postLikeStatus(LIKE_TYPE.cancelLike)
    }
  }

  const handleUnlike = () => {
    if (likeAmount?.myDislike === UNLIKE_STATUS?.no) {
      postLikeStatus(LIKE_TYPE.dislike)
    } else {
      postLikeStatus(LIKE_TYPE.cancelDislike)
    }
  }

  return (
    <Stack
      direction={'row'}
      spacing={6}
      onClick={e => {
        e.preventDefault()
      }}
    >
      <Button
        sx={{
          ...styles.like,
          ...(likeAmount?.myLike === LIKE_STATUS.yes ? styles.activeLike : ''),
          '&:hover': {
            color: '#259C4A'
          },
          ...likeSx
        }}
        onClick={handleLike}
      >
        <LikeSVG />
        <Typography variant="body1" ml={6}>
          {likeAmount?.likeCount}
        </Typography>
      </Button>
      <Button
        sx={{
          ...styles.like,
          ...(likeAmount?.myDislike === UNLIKE_STATUS.yes ? styles.activeUnlike : ''),
          '&:hover': {
            color: '#CA2020'
          },
          ...unlikeSx
        }}
        onClick={handleUnlike}
      >
        <UnlikeSVG />
        <Typography variant="body1" ml={6}>
          {likeAmount?.dislikeCount}
        </Typography>
      </Button>
    </Stack>
  )
}

export default LikeUnlike
