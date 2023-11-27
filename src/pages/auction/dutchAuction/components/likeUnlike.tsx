import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { useLike } from 'bounceHooks/like/useLike'
import { ILikeUnlikeRes, LIKE_OBJ, LIKE_STATUS, LIKE_TYPE, UNLIKE_STATUS } from 'api/idea/type'
import { ReactComponent as UpIcon } from 'assets/imgs/dutchAuction/up.svg'
import { ReactComponent as DownIcon } from 'assets/imgs/dutchAuction/down.svg'

export interface ILikeUnlikeProps {
  likeObj: LIKE_OBJ
  objId: number
  likeAmount: ILikeUnlikeRes
  onSuccess?: (res?: ILikeUnlikeRes) => void
}
const CollectBox = styled(Box)(() => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '.collectItem': {
    width: '66px',
    height: '32px',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 16px',
    marginRight: '8px',
    border: '1px solid #FFFFFF',
    backdropFilter: 'blur(5px)',
    borderRadius: '50px',
    cursor: 'pointer',
    '.img': {
      width: '13px',
      height: '13px',
      marginRight: '6px',
      display: 'inline-block'
    },
    '.num': {
      fontFamily: `'Inter'`,
      fontWeight: 600,
      fontSize: '14px',
      letterSpacing: '-0.02em',
      color: '#FFFFFF'
    }
  },
  '.collectItem.collected': {
    border: '1px solid #20994B',
    '.img path': {
      fill: '#20994B'
    },
    '.num': {
      color: '#20994B'
    }
  },
  '.collectItem.collect:hover': {
    border: '1px solid #20994B',
    '.img path': {
      fill: '#20994B'
    },
    '.num': {
      color: '#20994B'
    }
  },
  '.collectItem.discontented': {
    border: '1px solid #FD3333',
    '.img path': {
      fill: '#FD3333'
    },
    '.num': {
      color: '#FD3333'
    }
  },
  '.collectItem.discontent:hover': {
    border: '1px solid #FD3333',
    '.img path': {
      fill: '#FD3333'
    },
    '.num': {
      color: '#FD3333'
    }
  }
}))
const LikeUnlike: React.FC<ILikeUnlikeProps> = ({ likeObj, objId, likeAmount, onSuccess }) => {
  const { postLike } = useLike()

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
    <CollectBox>
      <Box
        className={likeAmount?.myLike === LIKE_STATUS.yes ? 'collectItem collected' : ' collectItem collect'}
        onClick={handleLike}
      >
        <UpIcon className="img" />
        <Typography className="num">{likeAmount?.likeCount}</Typography>
      </Box>
      <Box
        className={
          likeAmount?.myDislike === UNLIKE_STATUS?.yes ? 'collectItem discontented' : ' collectItem discontent'
        }
        onClick={handleUnlike}
      >
        <DownIcon className="img" />
        <Typography className="num">{likeAmount?.dislikeCount}</Typography>
      </Box>
    </CollectBox>
  )
}

export default LikeUnlike
