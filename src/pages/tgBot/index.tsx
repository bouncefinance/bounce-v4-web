import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { useValuesDispatch, ActionType } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { TgBotActiveStep } from 'bounceComponents/create-auction-pool/types'
import ValuesProvider from 'bounceComponents/create-auction-pool/ValuesProvider'
import { useActiveWeb3React } from 'hooks'
import { useUserInfo } from 'state/users/hooks'

const TelegramBotPage = () => {
  const navigate = useNavigate()
  const valuesDispatch = useValuesDispatch()
  const { userInfo } = useUserInfo()
  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (!account || !userInfo?.tg_token) {
      valuesDispatch({
        type: ActionType.SetTgBotActiveStep,
        payload: {
          tgBotActiveStep: TgBotActiveStep.GETAPITOKEN
        }
      })
      navigate(routes.telegramBot.guide)
    }
    if (userInfo?.tg_token) {
      valuesDispatch({
        type: ActionType.SetTgBotActiveStep,
        payload: {
          tgBotActiveStep: TgBotActiveStep.GUIDEFORM
        }
      })
      navigate(routes.telegramBot.home)
    }
  }, [account, navigate, userInfo, userInfo?.tg_token, valuesDispatch])
  return null
}

const TelegramBot = () => {
  return (
    <ValuesProvider>
      <TelegramBotPage />
    </ValuesProvider>
  )
}

export default TelegramBot