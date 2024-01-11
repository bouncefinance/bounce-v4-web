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
  setCurrency,
  value: _value
}: {
  label: string
  name: string
  setCurrency: (v: Currency | undefined) => void
  value?: any
}) => {
  const formik = useFormikContext<any>()
  const { values, setFieldError, errors } = formik
  const value = useMemo(() => _value || values[name], [_value, name, values])
  const token = useToken(value)
  const [loading, setLoading] = useState(false)

  const verifyCallback = useCallback(() => {
    setCurrency(undefined)
    if (!value) {
      setFieldError(name, `${label} is required`)
      return
    }
    if (!isAddress(value)) {
      setFieldError(name, `${label} is not an address`)
      return
    }
    if (!token) {
      setLoading(true)
      setFieldError(name, `Querying token`)
      return
    }
    if (token) {
      setLoading(false)
      // setFieldError(name, '')
      setCurrency(token)
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, token, value, errors])

  useEffect(() => {
    verifyCallback()
  }, [verifyCallback])

  return (
    <FormItem name={name} label={label} firstTrigger>
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
