import { muiDialogV5, useModal, create } from '@ebay/nice-modal-react'
import { Form, Formik } from 'formik'
// import * as Yup from 'yup'

import { Box, Button, FormHelperText, Typography, styled } from '@mui/material'
// import FormItem from 'bounceComponents/common/FormItem'
import Dialog from 'bounceComponents/common/DialogBase'
import { isAddress } from 'utils'
import { LineCom, ToolBoxInput } from 'pages/tokenToolBox/components/tokenLockerForm'
// import DropZone from 'bounceComponents/common/DropZone/DropZone'
// import Papa from 'papaparse'
import { BoxSpaceBetween, ConfirmBox, ConfirmDetailBox } from 'pages/tokenToolBox/page/disperse/disperse'
import { Body01, H4, SmallText } from 'components/Text'
import DropZone from 'bounceComponents/common/DropZone/DropZone'
import Papa from 'papaparse'
interface FormValues {
  whitelistWithAmount: string
}
const DialogStyle = styled(Dialog)({
  '& .MuiPaper-root': {
    width: '100%',
    padding: 50,
    minWidth: { xs: 350, sm: 500 },
    maxWidth: 860
  },
  '& .MuiDialogTitle-root': {
    padding: '10px !important',
    button: {
      width: 30,
      height: 30
    }
  },
  '& .MuiDialogContent-root': {
    padding: '10px !important'
  }
})
const isEqLength = (str1: string, str2: string[]) => {
  const s1 = str1
    .split('\n')
    .join('')
    .split('')
    .map(i => i.trim())
    .join('')
  const s2 = str2.join('')
  return s1 === s2
}
export function formatInput(input: string) {
  const regexNumber = /\b\d+(\.\d+)?\b/g
  console.log(
    'input',
    input
      .split('\n')
      .join('')
      .split('')
      .map(i => i.trim())
      .join('')
  )

  const arr = input
    .split('\n')
    .filter(v => v.length > 42)
    .filter(v => isAddress(v.substring(0, 42)))
    .filter(v => {
      const result = v.substring(42).match(regexNumber)
      return result && Number(result[0]) > 0 && isFinite(Number(result[0]))
    }) // contain number
    .map(v => {
      return [v.substring(0, 42), v.substring(42).match(regexNumber)?.[0]]
    })
    .filter((v, i, arr) => {
      const _arr = arr.slice(i + 1)
      return _arr.flat().findIndex(i => i?.toLocaleLowerCase() === v[0]?.toLocaleLowerCase()) === -1
    })

  const recipients: string[] = []
  const amount: string[] = []

  arr.forEach(v => {
    v[0] && recipients.push(v[0])
    v[1] && amount.push(v[1])
  })

  return [recipients, amount, arr]
}

const ImportWhitelistWithAmountDialog = create<{ whitelistWithAmount: string }>(({ whitelistWithAmount }) => {
  const modal = useModal()

  const handleResolve = (whitelistWithAmount: string) => {
    modal.resolve(whitelistWithAmount)
    modal.hide()
  }
  const handleReject = () => {
    modal.reject(new Error('Rejected'))
    modal.hide()
  }
  const initialValues: FormValues = {
    whitelistWithAmount: whitelistWithAmount
  }

  return (
    <DialogStyle title="Import whitelist with amount" {...muiDialogV5(modal)} onClose={handleReject}>
      <Typography variant="h4" sx={{ fontSize: { xs: 14, md: 16 } }}>
        Enter one address and amount per line.{' '}
      </Typography>
      <Formik
        // validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={values => {
          handleResolve(values.whitelistWithAmount)
        }}
      >
        {({ errors, values, setFieldValue }) => {
          console.log('errors', errors)

          return (
            <Form>
              {/* <FormItem name="whitelistWithAmount"> */}
              <Box
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': { width: '100%', padding: 0, maxHeight: 250, overflow: 'scroll' }
                }}
              >
                <ToolBoxInput
                  multiline={true}
                  sx={{ width: '100%', minHeight: '200px', marginTop: 20, marginBottom: 12, alignItems: 'flex-start' }}
                  value={values.whitelistWithAmount}
                  onChange={event => {
                    setFieldValue('whitelistWithAmount', event.target.value)
                  }}
                />
                <DropZone
                  getFile={file => {
                    Papa.parse(file, {
                      skipEmptyLines: true,
                      complete: function (results: any) {
                        setFieldValue('whitelistWithAmount', results.data.join('\n').replaceAll(',', ' '))
                      }
                    })
                  }}
                />
              </Box>

              <ConfirmBox>
                <H4>Confirm</H4>
                <ConfirmDetailBox sx={{ maxHeight: 250, overflow: 'scroll' }}>
                  <BoxSpaceBetween>
                    <SmallText>Address</SmallText>
                    <SmallText>Amount</SmallText>
                  </BoxSpaceBetween>
                  <LineCom />
                  {values.whitelistWithAmount &&
                    formatInput(values.whitelistWithAmount)[2].map((v, idx) => {
                      return (
                        <BoxSpaceBetween
                          key={idx}
                          sx={{
                            alignItems: 'center'
                          }}
                        >
                          <Body01>{v[0]}</Body01>
                          <Body01
                            sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: 250,
                              paddingLeft: 20
                            }}
                          >
                            {v[1]}
                          </Body01>
                        </BoxSpaceBetween>
                      )
                    })}
                </ConfirmDetailBox>
              </ConfirmBox>
              {!isEqLength(
                values.whitelistWithAmount,
                (formatInput(values.whitelistWithAmount)?.[2] as string[]).flat()
              ) && <FormHelperText style={{ marginTop: 10 }}>Some invalid data has been filtered out</FormHelperText>}
              <Button
                type="submit"
                variant="contained"
                sx={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: 300, marginTop: 20 }}
              >
                Save
              </Button>
            </Form>
          )
        }}
      </Formik>
    </DialogStyle>
  )
})

export default ImportWhitelistWithAmountDialog
