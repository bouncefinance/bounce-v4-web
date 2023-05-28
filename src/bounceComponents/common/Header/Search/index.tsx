import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import HeaderSearchInput, { ISearchAllOption } from '../../SearchInput/HeaderSearchInput'
import { searchPoolAndUser } from 'api/optionsData'
import DefaultAvaSVG from 'assets/imgs/components/defaultAva.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { whiteLogoRoutes } from '../../../../components/Header'
import { PoolType } from 'api/pool/type'

const Search: React.FC = () => {
  const [userData, setUserData] = useState<ISearchAllOption[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [idx, setIdx] = useState(0)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (searchText.trim().length < 2) return
    searchPoolAndUser({
      limit: 100,
      offset: 0,
      value: searchText
    }).then(res => {
      const { code, data } = res
      if (code !== 200) {
        toast.error('search error')
      }
      setIdx(data?.pools.length)
      const temp = data?.users?.map((v: { name: any; avatar: any }) => {
        return {
          type: 'User',
          values: {
            label: v?.name,
            icon: v?.avatar || DefaultAvaSVG,
            value: v
          }
        }
      })
      const pool = data?.pools?.map(
        (pl: {
          name: string
          poolId: string | number
          chainId: number
          tokenType: string
          category: PoolType
          token0: any
        }) => {
          return {
            type: 'Auction',
            values: {
              name: pl?.name,
              poolId: pl?.poolId,
              chainId: pl?.chainId,
              tokenType: pl?.tokenType,
              category: pl?.category,
              token0: pl?.token0,
              value: pl
            }
          }
        }
      )
      const obj: ISearchAllOption[] = [...pool, ...temp]
      setUserData(obj)
    })
  }, [searchText])

  return (
    <Box
      sx={{
        width: '100%',
        height: 44,
        mixBlendMode: whiteLogoRoutes.includes(pathname) ? 'difference' : 'unset',
        position: 'relative',
        marginLeft: 48,
        // background: whiteLogoRoutes.includes(pathname) ? 'white' : 'var(--ps-text-4)',
        // color: whiteLogoRoutes.includes(pathname) ? 'black' : 'var(--ps-text-5)',
        '.Mui-focused': {
          '.MuiOutlinedInput-root': {
            // border: 'none !important'
          }
        },
        '.MuiOutlinedInput-root': {
          transition: 'all 0.5s',
          position: 'absolute',
          right: 0,
          width: '100%',
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
        placeholder={'Search by Auction Name, ID, User Name, User ID'}
        startIcon
        loadingText={'No result'}
        value={searchText}
        idx={idx}
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
          return navigate(`${routes.profile.summary}?id=${newVal?.values.value?.userId}`)
        }}
      />
    </Box>
  )
}

export default Search
