import FormItem from 'bounceComponents/common/FormItem'
import { CircularProgress, InputAdornment, OutlinedInput } from '@mui/material'
import { useFormikContext } from 'formik'
import { useToken } from 'state/wallet/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { isAddress } from 'utils'
import CheckIcon from '@mui/icons-material/Check'
const TokenInput = ({ label, name, onChange }: { label: string; name: string; onChange: (val: string) => void }) => {
  const formik = useFormikContext<any>()
  const { values, setFieldError, errors } = formik
  const value = useMemo(() => values[name], [name, values])
  const token = useToken(value)
  const [loading, setLoading] = useState(false)

  const verifyCallback = useCallback(() => {
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
      setFieldError(name, '')
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, token, value, errors])

  useEffect(() => {
    verifyCallback()
  }, [verifyCallback])

  return (
    <FormItem
      name={name}
      label={label}
      onChange={e => {
        onChange((e.target as any).value)
      }}
    >
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
