import { muiDialogV5, useModal, create } from '@ebay/nice-modal-react'
import Dialog from 'bounceComponents/common/DialogBase'
import SumsubWebSdk from '@sumsub/websdk-react'
import { useRequest } from 'ahooks'
import { getSumsubAccessToken } from 'api/account'
import { useCallback } from 'react'
import { Box } from '@mui/material'

const SumsubWebDialog = create(({}) => {
  const modal = useModal()

  // const handleResolve = (whitelist: string) => {
  //   modal.resolve(whitelist ? whitelist.trim().split(/[\n,]/g) : [])
  //   modal.hide()
  // }
  const handleReject = () => {
    modal.reject(new Error('Rejected'))
    modal.hide()
  }

  return (
    <Dialog title="KYC verification with Sumsub" {...muiDialogV5(modal)} onClose={handleReject}>
      <Box sx={{ width: 600, minHeight: 500 }}>
        <SumsubWeb />
      </Box>
    </Dialog>
  )
})

export default SumsubWebDialog

function SumsubWeb() {
  const { data } = useRequest(
    async () => {
      return await getSumsubAccessToken()
    },
    { debounceWait: 1000 }
  )

  const accessTokenExpirationHandler = useCallback(async () => {
    const data = await getSumsubAccessToken()
    return data.data.token
  }, [])

  if (!data?.data.token) return null

  return (
    <SumsubWebSdk
      accessToken={data.data.token}
      // testEnv
      expirationHandler={accessTokenExpirationHandler}
      // config={config}
      // options={options}
      onMessage={(msg: any) => console.log('SumsubWeb', msg)}
      onError={(error: any) => console.error('SumsubWeb', error)}
    />
  )
}
