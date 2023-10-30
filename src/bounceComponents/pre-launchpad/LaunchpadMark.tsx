import { Box, Stack, Link } from '@mui/material'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import Image from 'components/Image'

import { useRequest } from 'ahooks'
import { updateLaunchpadPool } from 'api/user'

import { IBasicInfoParams, IPoolInfoParams, PoolStatus } from 'pages/launchpad/create-launchpad/type'

import ShowDetailIcon from 'assets/imgs/auction/show-detail-icon.svg'
import EditDetailIcon from 'assets/imgs/auction/edit-detail-icon.svg'
import { useToDetailInfo } from 'bounceHooks/launchpad/useToDetailInfo'
import { toast } from 'react-toastify'

import { show } from '@ebay/nice-modal-react'

import LanguageIcon from '@mui/icons-material/Language'
import SendIcon from '@mui/icons-material/Send'

import DialogDarkTips from 'bounceComponents/common/DialogTips/DialogDarkTips'
import LaunchpadCover from 'bounceComponents/pre-launchpad/LaunchpadCover'
import { CardSize } from 'pages/account/AccountPrivateLaunchpad'
import { poolStrictSchema } from 'pages/launchpad/create-launchpad/schema'
import CreatePoolDialog from './CreatePoolDialog'
const LaunchpadMark = ({
  poolInfo,
  basicInfo,
  getInfo
}: {
  poolInfo: IPoolInfoParams & { opId?: number }
  basicInfo: IBasicInfoParams
  getInfo: () => void
  size: CardSize
}) => {
  const detailInfo = useToDetailInfo({ ...poolInfo, chainId: poolInfo.opId as number })
  const [showCreateDia, setShowCreateDia] = useState(false)
  const navigate = useNavigate()
  const { run } = useRequest(
    (status: PoolStatus.Released) => {
      const newPool = { ...poolInfo, chainId: poolInfo.opId, status }
      delete newPool.opId
      return updateLaunchpadPool(newPool as IPoolInfoParams)
    },
    {
      manual: true,
      onSuccess: () => {
        getInfo()
        show(DialogDarkTips, {
          iconType: 'success',
          title: 'Сongratulations!',
          content: 'You have successfully submit, Please wait patiently for review.',
          cancelBtn: 'Confirm',
          PaperProps: {
            sx: {
              '&.MuiPaper-root': {
                '& .MuiButtonBase-root': {
                  backgroundColor: '#121212',
                  color: '#fff'
                },
                backgroundColor: '#fff',
                '& svg path': {
                  stroke: '#171717'
                },
                '& .MuiDialogContent-root h2': {
                  color: '#121212'
                }
              }
            }
          }
        })
      }
    }
  )
  const toCreatePool = () => {
    poolStrictSchema
      .validate(detailInfo.poolInfo)
      .then(res => {
        console.log(res)
        setShowCreateDia(true)
      })
      .catch(() => {
        toast.error('There is still some content that has not been filled out!')
        setTimeout(() => navigate('/launchpad/create?type=2&id=' + detailInfo.poolInfo.id + '&strict'), 1000)
      })
  }
  return (
    <LaunchpadCover
      poolInfo={poolInfo}
      basicInfo={basicInfo}
      size={CardSize.Small}
      mark={
        <Box
          className="mask"
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            background: 'rgba(23, 23, 23, 0.30)'
          }}
        >
          <Stack
            sx={{
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 74
            }}
          >
            <Link onClick={() => navigate(`/account/launchpad/${poolInfo.id}`)}>
              <Image src={ShowDetailIcon} />
            </Link>
            {poolInfo.status !== PoolStatus.On_Chain && (
              <Link onClick={() => navigate(routes.thirdPart.CreateLaunchpad + '?type=2&id=' + poolInfo.id)}>
                <Image src={EditDetailIcon} />
              </Link>
            )}

            {poolInfo.status !== PoolStatus.On_Chain && poolInfo.status !== PoolStatus.Approved && (
              <Box onClick={() => run(PoolStatus.Released)}>
                <SendIcon sx={{ color: '#fff', fontSize: 60 }} />
              </Box>
            )}

            {poolInfo.status === PoolStatus.Approved && (
              <Box onClick={toCreatePool}>
                <LanguageIcon sx={{ color: '#fff', fontSize: 60 }} />
              </Box>
            )}
          </Stack>
          {showCreateDia && <CreatePoolDialog setShow={setShowCreateDia} show={showCreateDia} poolInfo={poolInfo} />}
        </Box>
      }
    />
  )
}
export default LaunchpadMark
