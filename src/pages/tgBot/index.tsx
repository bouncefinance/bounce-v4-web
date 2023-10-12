import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { useValuesDispatch, ActionType } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { TgBotActiveStep } from 'bounceComponents/create-auction-pool/types'
import ValuesProvider from 'bounceComponents/create-auction-pool/ValuesProvider'

const TelegramBotPage = () => {
  const navigate = useNavigate()
  const [tgToken] = useState(false)
  const valuesDispatch = useValuesDispatch()

  useEffect(() => {
    if (!tgToken) {
      valuesDispatch({
        type: ActionType.SetTgBotActiveStep,
        payload: {
          tgBotActiveStep: TgBotActiveStep.GETAPITOKEN
        }
      })
      navigate(routes.telegramBot.guide)
    }
    if (tgToken) {
      valuesDispatch({
        type: ActionType.SetTgBotActiveStep,
        payload: {
          tgBotActiveStep: TgBotActiveStep.GUIDEFORM
        }
      })
    }
  }, [tgToken, navigate, valuesDispatch])
  return <Box>123</Box>
}

const TelegramBot = () => {
  return (
    <ValuesProvider>
      <TelegramBotPage />
    </ValuesProvider>
  )
}

export default TelegramBot
