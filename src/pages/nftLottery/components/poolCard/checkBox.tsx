import React, { useState } from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup, Stack, Typography, styled } from '@mui/material'
import { BaseBtnStyle } from './bidBtnBox'
import CheckIconSvg from 'assets/imgs/nftLottery/check-icon.svg'
import CheckedIconSvg from 'assets/imgs/nftLottery/checked-icon.svg'
interface CheckProps {
  onConfirm: () => void
}
const FormGroupStyle = styled(FormGroup)`
  &.MuiFormGroup-root {
    ${({ theme }) => theme.breakpoints.up('sm')} {
      gap: 16px;
      margin-top: 16px;
    }
  }
  & .MuiFormControlLabel-root:nth-child(even) {
    align-items: start;
  }
`
const FormControlLabelStyle = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    width: 100%;
    align-items: center;
    ${({ theme }) => theme.breakpoints.down('sm')} {
      width: 100%;
      align-items: center;
      gap: 5px;
      margin-top: 16px;
    }
  }

  & .MuiCheckbox-root {
    /* padding: 0px; */
    /* padding-left: 10px; */
    /* padding-top: 3px; */
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
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 17px;
  }
`
const CheckIcon = styled(Box)`
  width: 20px;
  height: 20px;
  background: url(${CheckIconSvg});
  background-position: 0px -4px;
`
const CheckedIcon = styled(Box)`
  width: 20px;
  height: 20px;
  background: url(${CheckedIconSvg});
  background-position: left;
`
const Title = styled(Typography)`
  color: #20201e;

  /* AI/D/body 02 */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 17px;
  }
`
const CheckboxStyle = styled(Checkbox)`
  color: #8f9288;
  & .MuiSvgIcon-root {
    border-radius: 6px;
    font-size: 20px;
  }
  &.Mui-checked {
    color: var(--AI-green, #76ba1e);
  }
`

const CheckBox = ({ onConfirm }: CheckProps) => {
  const [confirmationState, setConfirmationState] = useState({
    notice1: false,
    notice2: false,
    notice3: false,
    notice4: false
  })

  const handleChange = (event: React.ChangeEvent<any>) => {
    setConfirmationState({
      ...confirmationState,
      [event.target.name]: event.target.checked
    })
  }

  const { notice1, notice2, notice3, notice4 } = confirmationState
  const icons = { icon: <CheckIcon />, checkedIcon: <CheckedIcon /> }

  return (
    <Box sx={{ margin: '0 auto', mt: 40, width: '100%', maxWidth: 753 }}>
      <Box sx={{ maxWidth: 574 }}>
        <Title>Please check the following information before your participation</Title>

        <FormGroupStyle>
          <FormControlLabelStyle
            checked={notice1}
            name="notice1"
            control={<CheckboxStyle defaultChecked {...icons} />}
            onChange={handleChange}
            label="I researched the creator"
          />
          <FormControlLabelStyle
            checked={notice2}
            control={<CheckboxStyle {...icons} />}
            onChange={handleChange}
            name="notice2"
            label="I checked the token and contract address to make sure it is not fake token"
          />
          <FormControlLabelStyle
            checked={notice3}
            control={<CheckboxStyle {...icons} />}
            onChange={handleChange}
            name="notice3"
            label="I checked the price"
          />
          <FormControlLabelStyle
            checked={notice4}
            control={<CheckboxStyle {...icons} />}
            onChange={handleChange}
            name="notice4"
            label="The assets you use to purchase lottery tickets will be burned by the bounce"
          />
        </FormGroupStyle>
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
    </Box>
  )
}

export default CheckBox
