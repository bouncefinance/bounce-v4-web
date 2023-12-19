import React, { useState } from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup, Stack, Typography, styled } from '@mui/material'
import { BaseBtnStyle } from './bidBtnBox'

interface CheckProps {
  onConfirm: () => void
}
const FormControlLabelStyle = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    width: max-content;
  }
  &.MuiFormControlLabel-root .MuiTypography-root {
    color: #20201e;

    /* AI/D/body 02 */
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 25.2px */
  }
  & .Mui-checked {
    color: #76ba1e !important;
    border-radius: 6px;
  }
`
const Title = styled(Typography)`
  color: #20201e;

  /* AI/D/body 02 */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
`
const CheckBox = ({ onConfirm }: CheckProps) => {
  const [confirmationState, setConfirmationState] = useState({
    notice1: false,
    notice2: false,
    notice3: false
  })

  const handleChange = (event: React.ChangeEvent<any>) => {
    setConfirmationState({
      ...confirmationState,
      [event.target.name]: event.target.checked
    })
  }

  const { notice1, notice2, notice3 } = confirmationState

  return (
    <Box sx={{ margin: '0 auto', mt: 40, width: '100%', maxWidth: 753 }}>
      <Title>Please check the following information before your participation</Title>

      <FormGroup>
        <FormControlLabelStyle
          checked={notice1}
          name="notice1"
          control={<Checkbox defaultChecked />}
          onChange={handleChange}
          label="I researched the creator"
        />
        <FormControlLabelStyle
          checked={notice2}
          control={<Checkbox />}
          onChange={handleChange}
          name="notice2"
          label="I checked the token and contract address to make sure it is not fake token"
        />
        <FormControlLabelStyle
          checked={notice3}
          control={<Checkbox />}
          onChange={handleChange}
          name="notice3"
          label="I checked the price"
        />
      </FormGroup>
      <Stack justifyContent={'center'}>
        <BaseBtnStyle
          disabled={!Object.values(confirmationState).every(item => item === true)}
          sx={{ mt: 24 }}
          onClick={onConfirm}
        >
          Confirm and continue
        </BaseBtnStyle>
      </Stack>
    </Box>
  )
}

export default CheckBox
