/* eslint-disable react/no-children-prop */
import {
  Box,
  Typography,
  Stack,
  styled,
  //  IconButton,
  Grid
} from '@mui/material'
import BotSetUpInfoItem from '../components/BotSetUpInfoItem'
import { useCallback, useState } from 'react'
import { bindTgTokenApi } from 'api/pool'
import { BindTgTokenApiParams } from 'api/pool/type'
import { useValuesDispatch, ActionType } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { TgBotActiveStep } from 'bounceComponents/create-auction-pool/types'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { useUserInfo, useRefreshUserInfoCallback } from 'state/users/hooks'
import {
  InvitationItem
  // BindInviteLinksParams
} from 'api/market/type'
import DialogBotTips from 'bounceComponents/common/DialogTips/DialogBotTips'
import WordEditDialogTips from 'bounceComponents/common/WordEditDialogTips'
import { show } from '@ebay/nice-modal-react'
import { ReactComponent as Edit } from './svg/edit.svg'
// import { ReactComponent as Add } from './svg/add.svg'
// import { ReactComponent as Del } from './svg/del.svg'
import { ReactComponent as Bot } from './svg/bot.svg'
// import ReactMarkdown from 'react-markdown'
import { useRequest } from 'ahooks'
import {
  getInviteLinks
  // , bindInviteLinks
} from 'api/market'
import { LoadingButton } from '@mui/lab'

const CusButton = styled(LoadingButton)`
  padding: 20px 40px;
`
const TwoColumnPanel = ({ children }: { children: JSX.Element }) => {
  return (
    <Box mt={'24px'} mb={'60px'} display={'flex'} justifyContent={'center'}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          maxWidth: '544px',
          background: 'var(--yellow, #E1F25C)',
          borderRadius: '24px 0 0 24px'
        }}
      >
        <Bot />
      </Box>
      <Box
        overflow={'hidden'}
        sx={{
          borderRadius: '0 24px 24px 0',
          background: '#fff',
          padding: '56px'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

const CusTextBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  display: flex;
  padding: 20px 16px;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 8px;
  background: var(--grey-06, #f6f6f3);
  color: var(--grey-01, var(--grey-01, #20201e));
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  overflow-wrap: normal;
  overflow-wrap: anywhere;
  overflow-wrap: break-word;
`

const CusTopTip = styled(Typography)`
  display: flex;
  height: 160px;
  padding: 20px 20px 40px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  border-radius: 8px;
  background: var(--grey-06, #f6f6f3);
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`

const CircleBorder = styled(Typography)`
  display: flex;
  width: 30px;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 100px;
  border: 1px solid #000;
  color: #000;
  font-family: Public Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.24px;
  text-transform: capitalize;
`

export default function BotSetup() {
  const valuesDispatch = useValuesDispatch()
  const navigate = useNavigate()
  const { userInfo } = useUserInfo()
  const refreshUserInfoCallback = useRefreshUserInfoCallback()
  const [isRemoveTokening, setIsRemoveTokening] = useState(false)

  const removeTokenApi = useCallback(async () => {
    const params: BindTgTokenApiParams = {
      tgToken: ''
    }
    try {
      setIsRemoveTokening(true)
      const res = await bindTgTokenApi(params)
      refreshUserInfoCallback()
      console.log('bindTgTokenApi res', res)
      valuesDispatch({
        type: ActionType.SetTgToken,
        payload: {
          tgToken: ''
        }
      })
      valuesDispatch({
        type: ActionType.SetTgBotActiveStep,
        payload: {
          tgBotActiveStep: TgBotActiveStep.GUIDEFORM
        }
      })
      setTimeout(() => {
        setIsRemoveTokening(false)
        navigate(routes.telegramBot.index)
      }, 3000)
    } catch (error) {
      console.log('bindTgTokenApi error', error)
    }
  }, [refreshUserInfoCallback, valuesDispatch, navigate])

  const editIntroduction = useCallback(
    async (value: string) => {
      if (!value) return
      if (!userInfo) return
      const params: BindTgTokenApiParams = {
        tgToken: userInfo?.tg_token,
        tgIntroduction: value
      }
      try {
        const res = await bindTgTokenApi(params)
        console.log('bindTgTokenApi res', res)
        refreshUserInfoCallback()
      } catch (error) {
        console.log('bindTgTokenApi error', error)
      }
    },
    [refreshUserInfoCallback, userInfo]
  )

  const {
    data: invitationList
    // run: runGetInviteLinks
  } = useRequest(
    async () => {
      if (!userInfo || !userInfo?.tg_token)
        return {
          total: 0,
          list: []
        }
      const params = {
        tgToken: userInfo?.tg_token
      }
      const resp = await getInviteLinks(params)
      return {
        list: resp.data.list,
        total: resp.data.total
      }
    },
    {
      debounceWait: 500,
      refreshDeps: []
    }
  )

  // const toBindInviteLinks = useCallback(
  //   async (value: string) => {
  //     if (!value) return
  //     if (!userInfo || !userInfo.tg_token) return
  //     const params: BindInviteLinksParams = {
  //       botToken: userInfo.tg_token,
  //       groupInviteLinks: value
  //     }
  //     try {
  //       const res = await bindInviteLinks(params)
  //       runGetInviteLinks()
  //       console.log('bindInviteLinks res', res)
  //     } catch (error) {
  //       console.log('bindTgTokenApi error', error)
  //     }
  //   },
  //   [runGetInviteLinks, userInfo]
  // )

  return (
    <TwoColumnPanel>
      <Stack minWidth={679} direction={'column'}>
        <Typography fontSize={28} fontWeight={600} component={'h2'}>
          Bot linking
        </Typography>
        <Grid maxWidth={679} my={32} container spacing={16}>
          <Grid item xs={6}>
            <CusTopTip>
              <CircleBorder>1</CircleBorder>
              <Typography fontSize={14} component={'span'}>
                {`Go to `}
                <a style={{ color: '#1B52E1' }} href="">{`@BotFather. `}</a>
                {`Press his name to do that and then press 'Send Messege' if it's needed.`}
              </Typography>
            </CusTopTip>
          </Grid>
          <Grid item xs={6}>
            <CusTopTip>
              <CircleBorder>2</CircleBorder>
              <Typography fontSize={14} component={'span'}>
                {`Create a new bot with him. To do this use the 'newbot' command inside @BotFather. `}
              </Typography>
            </CusTopTip>
          </Grid>
          <Grid item xs={6}>
            <CusTopTip>
              <CircleBorder>3</CircleBorder>
              <Typography fontSize={14} component={'span'}>
                {`Copy the API token that @BotFather will give you.`}
              </Typography>
            </CusTopTip>
          </Grid>
          <Grid item xs={6}>
            <CusTopTip>
              <CircleBorder>4</CircleBorder>
              <Typography fontSize={14} component={'span'}>
                {`Come back to here and send the copied API token here.`}
              </Typography>
            </CusTopTip>
          </Grid>
        </Grid>

        <BotSetUpInfoItem title="Link">
          <Stack direction="row" spacing={6} sx={{ alignItems: 'center' }}>
            <CusTextBox>{userInfo ? userInfo?.tg_token : ''}</CusTextBox>
            <CusButton
              variant="contained"
              loadingPosition="start"
              loading={isRemoveTokening}
              onClick={() => {
                show(DialogBotTips, {
                  cancelBtn: 'Cancel',
                  againBtn: 'Again',
                  title: 'remove tg bot',
                  content: 'Are you sure to remove this robot connection ? ',
                  onAgain: () => removeTokenApi()
                })
              }}
            >
              remove
            </CusButton>
          </Stack>
        </BotSetUpInfoItem>
        <BotSetUpInfoItem
          title="Introduction"
          iconButton={<Edit />}
          iconButtonCallBack={() => {
            show(WordEditDialogTips, {
              cancelBtn: 'Cancel',
              againBtn: 'Again',
              title: 'Edit introduction',
              content: '',
              value: userInfo ? userInfo?.tgIntroduction : '',
              contentType: 'TextArea',
              onAgain: (value: string) => {
                editIntroduction(value)
              }
            })
          }}
        >
          <Stack direction="row" spacing={6} sx={{ alignItems: 'center' }}>
            {userInfo ? userInfo?.tgIntroduction : ''}
            {/* <CusTextBox>
              <ReactMarkdown children={userInfo ? userInfo?.tgIntroduction : ''} />
            </CusTextBox> */}
          </Stack>
        </BotSetUpInfoItem>
        <BotSetUpInfoItem
          title="Edit Group invitation link"
          // iconButton={<Add />}
          // iconButtonCallBack={() => {
          //   show(WordEditDialogTips, {
          //     cancelBtn: 'Cancel',
          //     againBtn: 'Again',
          //     title: 'Add introduction',
          //     content: '',
          //     contentType: 'TextBox',
          //     onAgain: (value: string) => {
          //       toBindInviteLinks(value)
          //     }
          //   })
          // }}
        >
          <Stack spacing={12}>
            {invitationList?.list.map((invitation: InvitationItem) => (
              <CusTextBox key={invitation.address}>
                <Typography component={'span'}>{invitation.address}</Typography>
                <Stack direction={'row'} gap={8}>
                  {/* <IconButton
                    onClick={() => {
                      show(WordEditDialogTips, {
                        cancelBtn: 'Cancel',
                        againBtn: 'Again',
                        title: 'Edit introduction',
                        content: '',
                        contentType: 'TextBox',
                        onAgain: () => {}
                      })
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      show(DialogBotTips, {
                        cancelBtn: 'Cancel',
                        againBtn: 'Again',
                        title: 'delete Group invitation link',
                        content: 'Are you sure to delete this Group invitation link? ',
                        onAgain: () => {}
                      })
                    }}
                  >
                    <Del />
                  </IconButton> */}
                </Stack>
              </CusTextBox>
            ))}
          </Stack>
        </BotSetUpInfoItem>
      </Stack>
    </TwoColumnPanel>
  )
}
