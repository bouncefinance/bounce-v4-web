import FormItem from 'bounceComponents/common/FormItem'
import { CircularProgress, InputAdornment, OutlinedInput } from '@mui/material'
import { useFormikContext } from 'formik'
import { useToken } from 'state/wallet/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { isAddress } from 'utils'
import CheckIcon from '@mui/icons-material/Check'
import { Currency } from 'constants/token'
const TokenInput = ({
  label,
  name,
  comparisonName,
  setCurrency
}: {
  label: string
  name: string
  comparisonName?: string
  setCurrency: (v: Currency | undefined) => void
}) => {
  const formik = useFormikContext<any>()
  const { values, setFieldError, errors } = formik
  const value = useMemo(() => values[name], [name, values])
  const comparisonValue = useMemo(() => {
    if (comparisonName) {
      return values[comparisonName]
    }
  }, [comparisonName, values])
  const token = useToken(value)
  const [loading, setLoading] = useState(false)

  const verifyCallback = useCallback(() => {
    setCurrency(undefined)
    if (!value) {
      setFieldError(name, `Token is required`)
      return
    }
    if (!isAddress(value)) {
      setFieldError(name, `Token is not an address`)
      return
    }
    if (comparisonValue && value === comparisonValue) {
      setFieldError(name, `Please fill in a different token`)
      return
    }
    if (!token) {
      setLoading(true)
      setFieldError(name, `Querying token`)
      return
    }
    if (token) {
      setLoading(false)
      setFieldError(name, '')
      setCurrency(token)
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, token, value, errors])

  useEffect(() => {
    verifyCallback()
  }, [verifyCallback])

  return (
    <FormItem name={name} label={label}>
      <OutlinedInput
        placeholder={''}
        endAdornment={
          <InputAdornment position="start">
            {isAddress(value) && (loading ? <CircularProgress sx={{ color: 'red' }} /> : <CheckIcon />)}
          </InputAdornment>
        }
      />
    </FormItem>
  )
}
export default TokenInput
