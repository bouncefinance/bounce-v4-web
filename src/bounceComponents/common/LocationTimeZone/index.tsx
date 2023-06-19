import { MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'

import Flags from 'country-flag-icons/react/3x2'
import countries from 'i18n-iso-countries'
import english from 'i18n-iso-countries/langs/en.json'
import { countries as shortCountries } from 'country-flag-icons'

countries.registerLocale(english)

type ICountryType = keyof typeof Flags
const date = new Date()
export const timezone = date.getTimezoneOffset() / -60
const LocationTimeZone: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  return (
    <Select
      value={value}
      onChange={e => onChange(e.target.value)}
      sx={{
        maxHeight: 300,
        '&.Mui-focused': { background: '#F6F6F3 !important' }
      }}
      renderValue={value => {
        const Flag = Flags[value as ICountryType]
        const label = countries.getName(value, 'en')
        return (
          <div>
            <Flag style={{ height: 16, marginRight: 10, verticalAlign: 'middle' }} />

            <Typography component="span">
              {label}
              &nbsp;(UTC
              {`${timezone > 0 && '+'}${timezone < 10 && '0'}${timezone}`}
              :00)
            </Typography>
          </div>
        )
      }}
    >
      {shortCountries
        .filter(country => !!countries.getName(country, 'en'))
        .map(country => {
          return {
            longCountry: countries.getName(country, 'en'),
            shortCountry: country
          }
        })
        .sort((a, b) => (a.longCountry > b.longCountry ? 1 : -1))
        .map(country => {
          const Flag = Flags[country.shortCountry as ICountryType]
          return (
            <MenuItem key={country.shortCountry} value={country.shortCountry}>
              <Stack direction="row">
                <Flag title={country.shortCountry} style={{ height: 16, marginRight: 10, verticalAlign: 'middle' }} />
                <Typography>{country.longCountry}</Typography>
              </Stack>
            </MenuItem>
          )
        })}
    </Select>
  )
}

export default LocationTimeZone
