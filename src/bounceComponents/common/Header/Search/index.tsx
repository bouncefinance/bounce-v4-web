import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import HeaderSearchInput, { ISearchOption } from '../../SearchInput/HeaderSearchInput'
import { searchUser } from 'api/optionsData'
import DefaultAvaSVG from 'assets/imgs/components/defaultAva.svg'
import { USER_TYPE } from 'api/user/type'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { whiteLogoRoutes } from '../../../../components/Header'

const Search: React.FC = () => {
  const [userData, setUserData] = useState<ISearchOption[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    searchUser({
      limit: 100,
      offset: 0,
      userType: USER_TYPE.USER,
      value: searchText
    }).then(res => {
      const { code, data } = res
      if (code !== 200) {
        toast.error('search error')
      }
      const temp = data?.list?.map((v: { name: any; avatar: any }) => {
        return {
          label: v?.name,
          icon: v?.avatar || DefaultAvaSVG,
          value: v
        }
      })
      setUserData([...temp])
    })
  }, [searchText])

  return (
    <Box
      sx={{
        height: 44,
        width: 44,
        position: 'relative',
        '.Mui-focused': {
          '.MuiOutlinedInput-root': {
            background: whiteLogoRoutes.includes(pathname) ? 'white' : 'var(--ps-text-4)',
            color: whiteLogoRoutes.includes(pathname) ? 'black' : 'var(--ps-text-5)',
            border: 'none !important',
            width: 400
          }
        },
        '.MuiOutlinedInput-root': {
          transition: 'all 0.5s',
          position: 'absolute',
          right: 0,
          width: 44,
          height: 44,
          overflow: 'hidden',
          background: whiteLogoRoutes.includes(pathname) ? 'white' : 'rgba(18, 18, 18, 0.06)',
          padding: '0 !important',
          border: 'none',
          '& input': {
            padding: '0 !important'
          }
        }
      }}
    >
      <HeaderSearchInput
        options={userData}
        filterOptions={(list: any) => list}
        renderOption={option => {
          return (
            <span>
              {option?.label}
              {option?.value?.userType === USER_TYPE.USER && (
                <span style={{ color: 'rgba(23, 23, 23, 0.7)', marginLeft: 8 }}>#{option?.value?.fullNameId}</span>
              )}
            </span>
          )
        }}
        placeholder={'Search by username'}
        startIcon
        loadingText={'No result'}
        value={searchText}
        onChange={(_, newValue) => {
          setSearchText(newValue)
        }}
        onSelect={(_, newVal) => {
          setSearchText('')
          // if (newVal?.value?.thirdpartId) {
          //   return navigate(`/company/summary?thirdpartId=${newVal?.value?.thirdpartId}`)
          // }
          // if (newVal?.value?.userType === USER_TYPE.USER) {
          //   return navigate(`/profile/summary?id=${newVal?.value?.userId}`)
          // }

          // return navigate(`/company/summary?id=${newVal?.value?.userId}`)
          return navigate(`${routes.profile.summary}?id=${newVal?.value?.userId}`)
        }}
      />
    </Box>
  )
}

export default Search
