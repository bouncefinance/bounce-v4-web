import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
  Typography
} from '@mui/material'
import { Form, Formik, useFormikContext } from 'formik'
import { PoolStatus } from 'api/pool/type'
import React, { useEffect, useRef, useState } from 'react'
import { show } from '@ebay/nice-modal-react'
import { usePagination } from 'ahooks'
import { Params } from 'ahooks/lib/usePagination/types'
import Image from 'components/Image'
import { ReactComponent as SearchSVG } from 'assets/imgs/companies/search.svg'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import FormItem from 'bounceComponents/common/FormItem'
import { getLabelById } from 'utils'
import NoData from 'bounceComponents/common/NoData'
import TokenDialog from 'bounceComponents/create-auction-pool/TokenDialog'
import { getPools } from 'api/market'
import TotalPaginationBox from 'bounceComponents/market/components/TotalPaginationBox'
import FakeOutlinedInput from 'bounceComponents/create-auction-pool/FakeOutlinedInput'
import { UserType } from 'api/market/type'
import DefaultAvatarSVG from 'assets/imgs/profile/yellow_avatar.svg'
import NFTDefaultIcon from 'bounceComponents/create-auction-pool/TokenERC1155InforationForm/components/NFTCard/emptyNFTIcon.png'
import { ReactComponent as SizeIcon } from 'assets/imgs/auction/size-icon.svg'

import NftPoolStatus from 'bounceComponents/fixed-swap-nft/ActionBox/NftPoolStatus'
import { useOptionDatas } from 'state/configOptions/hooks'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { ChainListMap } from 'constants/chain'
import { ChainId } from 'constants/chain'
import { Token } from 'bounceComponents/fixed-swap/type'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import { FixedSwapPool } from 'api/pool/type'
import getAuctionPoolLink from 'utils/auction/getAuctionPoolRouteLink'

const initialValues = {
  searchText: '',
  searchType: 0,
  sortBy: 0,
  tokenFromAddress: '',
  tokenFromSymbol: '',
  tokenFromLogoURI: '',
  tokenFromDecimals: '',
  poolStatus: 0,
  auctionType: 5,
  chain: 2
}
const defaultIdeaPageSize = 12
const searchOptions = ['Pool Name', 'Pool ID', 'Creator Name', 'Creator Address']

export interface IFormObserverProps {
  handleSubmit: any
}

const FormObserver: React.FC<IFormObserverProps> = ({ handleSubmit }) => {
  const { values }: any = useFormikContext()
  const refPoolStatus = useRef(0)
  const refTokenFromAddress = useRef('')
  const refAuctionType = useRef(1)
  const refChain = useRef(3)
  const refSortBy = useRef(0)
  useEffect(() => {
    if (values.poolStatus !== refPoolStatus.current) {
      refPoolStatus.current = values.poolStatus
      handleSubmit(values)
    } else if (values.tokenFromAddress !== refTokenFromAddress.current) {
      refTokenFromAddress.current = values.tokenFromAddress
      handleSubmit(values)
    } else if (values.auctionType !== refAuctionType.current) {
      refAuctionType.current = values.auctionType
      handleSubmit(values)
    } else if (values.chain !== refChain.current) {
      refChain.current = values.chain
      handleSubmit(values)
    } else if (values.sortBy !== refSortBy.current) {
      refSortBy.current = values.sortBy
      handleSubmit(values)
    } else {
      return
    }
  }, [handleSubmit, values])
  return null
}

interface NFTPrams {
  nft: FixedSwapPool
  hiddenStatus?: boolean
}

export const NFTCard = (props: NFTPrams) => {
  const optionDatas = useOptionDatas()
  const {
    creatorUserInfo,
    status,
    openAt,
    closeAt,
    claimAt,
    is721,
    enableWhiteList,
    name,
    ratio,
    token0,
    chainId,
    token1,
    amountTotal0
  } = props.nft
  const chainConfigInBackend = useChainConfigInBackend('id', chainId)
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: '100%',
        background: '#fff',
        // border: `1px solid rgba(0, 0, 0, 0.1)`,
        boxShadow: `0px 5px 20px rgba(0, 0, 0, 0.08)`,
        borderRadius: '24px'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: '86%',
          borderRadius: '24px 24px 0 0',
          overflow: 'hidden'
        }}
        mb={16}
      >
        <Image
          src={token0?.largeUrl || token0?.smallUrl || token0?.thumbUrl || NFTDefaultIcon}
          width={'100%'}
          height={'100%'}
          alt="NFT"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate3D(-50%, -50%, 0)',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'cover'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            padding: '12px',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              background: '#12121233',
              borderRadius: '12px',
              padding: '8px 12px'
            }}
            onClick={e => {
              e.preventDefault()
              navigate(`${routes.profile.summary}?id=${creatorUserInfo?.userId}`)
            }}
          >
            <Avatar
              src={creatorUserInfo.avatar || DefaultAvatarSVG}
              sx={{ width: 32, height: 32, marginRight: '12px' }}
            />
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'space-between',
                flex: 1,
                overflow: 'hidden',
                padding: '4px 0'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '13px',
                  lineHeight: '140%',
                  color: '#FFFFFF'
                }}
              >
                {(creatorUserInfo?.userType === UserType.Profile
                  ? creatorUserInfo.name
                  : creatorUserInfo.companyName) || '--'}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '12px',
                  lineHeight: '140%',
                  color: '#D7D6D9'
                }}
              >
                {creatorUserInfo &&
                creatorUserInfo?.publicRole &&
                Array.isArray(creatorUserInfo.publicRole) &&
                creatorUserInfo.publicRole.length > 0
                  ? creatorUserInfo?.publicRole
                      ?.map((item: string | number) => {
                        return getLabelById(item, 'role', optionDatas?.publicRoleOpt)
                      })
                      .join(', ')
                  : 'Individual account'}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              right: 12
            }}
          >
            <NftPoolStatus openTime={openAt} closeTime={closeAt} claimAt={claimAt} status={status} />
            <Box
              sx={{
                marginTop: '6px',
                width: '100%',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-start'
              }}
            >
              <Box
                sx={{
                  height: 24,
                  lineHeight: '24px',
                  padding: '0 8px',
                  background: `rgba(255, 255, 255, 0.2)`,
                  color: '#fff',
                  borderRadius: 20,
                  fontFamily: 'Sharp Grotesk DB Cyr Book 20',
                  fontWeight: 400,
                  fontSize: 12
                }}
                mr={4}
              >
                Fixed Price
              </Box>
              <Box
                sx={{
                  height: 24,
                  lineHeight: '24px',
                  padding: '0 8px',
                  background: `rgba(255, 255, 255, 0.2)`,
                  color: '#fff',
                  borderRadius: 20,
                  fontFamily: 'Sharp Grotesk DB Cyr Book 20',
                  fontWeight: 400,
                  fontSize: 12
                }}
                mr={4}
              >
                {Number(is721) === 2 ? 'ERC721' : 'ERC1155'}
              </Box>
              <Box
                sx={{
                  height: 24,
                  lineHeight: '24px',
                  padding: '0 8px',
                  background: `rgba(255, 255, 255, 0.2)`,
                  color: '#fff',
                  borderRadius: 20,
                  fontFamily: 'Sharp Grotesk DB Cyr Book 20',
                  fontWeight: 400,
                  fontSize: 12
                }}
                mr={4}
              >
                {enableWhiteList ? 'Whitelist' : 'Public'}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box m={'16px 12px 22px'}>
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 500,
            fontSize: 16,
            color: '#000',
            width: '100%',
            height: '21px',
            lineHeight: '21px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginBottom: '17px'
          }}
        >
          {name} Fixed Price Auction Pool
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 500,
              fontSize: 20,
              color:
                status === PoolStatus.Upcoming
                  ? 'var(--ps-text-2)'
                  : status === PoolStatus.Live
                  ? 'var(--ps-green-1)'
                  : status === PoolStatus.Closed || status === PoolStatus.Cancelled
                  ? 'var(--ps-text-7)'
                  : '#171717',
              height: '21px',
              lineHeight: '21px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginBottom: '17px',
              maxWidth: '40%'
            }}
            component={'span'}
          >
            {`${ratio} ${token1?.name}`}
          </Typography>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-end'
            }}
          >
            <Box
              sx={{
                fontFamily: 'Sharp Grotesk DB Cyr Book 20',
                fontWeight: 400,
                fontSize: 12,
                color: '#171717',
                height: '24px',
                lineHeight: '24px',
                marginBottom: '17px',
                background: '#F5F5F5',
                padding: '0 8px',
                borderRadius: 20,
                marginRight: '4px'
              }}
            >
              <picture
                style={{
                  marginRight: '4px',
                  verticalAlign: 'middle'
                }}
              >
                <img src={token1.largeUrl} width={12} height={12} />
              </picture>
              {chainConfigInBackend?.ethChainId ? ChainListMap[chainConfigInBackend?.ethChainId as ChainId]?.name : '-'}
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              sx={{
                marginBottom: '17px',
                background: '#F5F5F5',
                padding: '0 8px',
                borderRadius: 20
              }}
            >
              <SizeIcon
                style={{
                  marginRight: 7
                }}
              />
              <Typography
                noWrap
                sx={{
                  fontFamily: 'Sharp Grotesk DB Cyr Book 20',
                  fontWeight: 400,
                  fontSize: 12,
                  color: '#171717',
                  height: '24px',
                  maxWidth: 20,
                  lineHeight: '24px'
                }}
              >
                {amountTotal0}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
const Pools: React.FC = ({}) => {
  const optionDatas = useOptionDatas()
  const [chain, setChain] = useState<number>(3)
  const showTokenDialog = (setFieldValue: (field: string, value: any) => void) => {
    show<Token>(TokenDialog, { chainId: getLabelById(chain, 'ethChainId', optionDatas?.chainInfoOpt || []) })
      .then(res => {
        setFieldValue('tokenFromAddress', res.address)
        setFieldValue('tokenFromSymbol', res.symbol)
        setFieldValue('tokenFromLogoURI', res.logoURI)
        setFieldValue('tokenFromDecimals', res.decimals)
      })
      .catch(err => {
        console.log('TokenDialog Rejected: ', err)
      })
  }

  const {
    pagination: poolsPagination,
    data: poolsData,
    run,
    params
  } = usePagination<any, Params>(
    async ({
      current,
      pageSize,
      category,
      chainId,
      creatorAddress,
      creatorName,
      orderBy,
      poolId,
      poolName,
      poolStatusFrontend,
      token0Address
    }) => {
      if (!chainId) {
        return Promise.reject(new Error('No ChainId'))
      }

      const resp = await getPools({
        offset: (current - 1) * pageSize,
        limit: pageSize,
        category: category,
        chainId: chainId,
        tokenType: 2, // erc20:1, nft:2
        creatorAddress: creatorAddress,
        creatorName: creatorName,
        orderBy: orderBy === 0 ? 'openTs' : 'createTs',
        poolId: poolId,
        poolName: poolName,
        poolStatusFrontend: poolStatusFrontend === 0 ? null : poolStatusFrontend,
        token0Address: token0Address
      })
      return {
        list: resp.data.fixedSwapNftList.list,
        total: resp.data.fixedSwapNftList.total
      }
      //   }
    },
    {
      manual: true,
      defaultPageSize: defaultIdeaPageSize
    }
  )

  const handleSubmit = (values: typeof initialValues) => {
    setChain(values.chain)
    run({
      current: 1,
      pageSize: 12,
      category: values.auctionType,
      chainId: values.chain,
      creatorAddress: values.searchType === 3 ? values.searchText : '',
      creatorName: values.searchType === 2 ? values.searchText : '',
      orderBy: values.sortBy,
      poolId: values.searchType === 1 ? values.searchText : '',
      poolName: values.searchType === 0 ? values.searchText : '',
      poolStatusFrontend: values.poolStatus,
      token0Address: values.tokenFromAddress
    })
  }

  const handlePageChange = (_: any, p: number) => {
    poolsPagination.changeCurrent(p)
  }

  return (
    <section>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => {
          return (
            <Box>
              <Box sx={{ height: 358, background: 'var(--ps-gray-900)' }} />
              <Box sx={{ position: 'relative', mt: -358 }}>
                <FormObserver handleSubmit={handleSubmit} />
                <Container maxWidth="lg">
                  <Stack spacing={32} pt={60} pb={48} component={Form}>
                    <Typography variant="h1" sx={{ color: 'var(--ps-white)', textAlign: 'left' }}>
                      NFT Auction Pools
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                      <FormItem name="searchType" label="searchType" sx={{ width: 320 }}>
                        <Select defaultValue={0}>
                          {searchOptions.map((opt, index) => [
                            <MenuItem value={index} key={index}>
                              {opt}
                            </MenuItem>
                          ])}
                        </Select>
                      </FormItem>
                      <FormItem name="searchText" sx={{ width: 648, ml: 8 }}>
                        <OutlinedInput
                          placeholder={`Search by ${searchOptions[values.searchType]?.toLocaleLowerCase()}`}
                          startAdornment={
                            <InputAdornment position="start">
                              <SearchSVG />
                            </InputAdornment>
                          }
                        />
                      </FormItem>
                      <Button
                        type="submit"
                        sx={{
                          width: 204,
                          ml: 20,
                          '&.MuiButton-textPrimary': {
                            background: 'var(--ps-blue)',
                            color: 'var(--ps-white)',
                            '&:hover': {
                              background: 'var(--ps-blue-50)'
                            },
                            '&:active': {
                              background: 'var(--ps-blue-100)'
                            }
                          }
                        }}
                      >
                        Search
                      </Button>
                    </Box>
                  </Stack>
                </Container>
                <Container maxWidth="lg" sx={{ position: 'relative' }}>
                  <TotalPaginationBox total={poolsData?.total || 0} create={true}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={10}>
                        {values?.tokenFromAddress ? (
                          <FormItem
                            name="tokenFromSymbol"
                            label="token"
                            startAdornment={
                              <Avatar
                                alt={values?.tokenFromSymbol}
                                src={values?.tokenFromLogoURI}
                                sx={{ width: 32, height: 32 }}
                              />
                            }
                          >
                            <FakeOutlinedInput
                              disabled
                              sx={{ maxWidth: 200 }}
                              endAdornment={
                                <IconButton
                                  onClick={e => {
                                    e.stopPropagation()
                                    setFieldValue('tokenFromAddress', '')
                                    setFieldValue('tokenFromSymbol', '')
                                    run({
                                      ...params,
                                      tokenFromAddress: '',
                                      current: 1,
                                      pageSize: 12
                                    })
                                  }}
                                >
                                  <HighlightOffIcon />
                                </IconButton>
                              }
                              onClick={() => {
                                showTokenDialog(setFieldValue)
                              }}
                            />
                          </FormItem>
                        ) : (
                          <FormItem name="tokenFromSymbol" label="Select a token">
                            <FakeOutlinedInput
                              disabled
                              onClick={() => {
                                showTokenDialog(setFieldValue)
                              }}
                            />
                          </FormItem>
                        )}
                        <FormItem name="poolStatus" label="Pool Status" sx={{ width: 190 }}>
                          <Select>
                            <MenuItem value={0}>All Status</MenuItem>
                            <MenuItem value={'live'}>Live</MenuItem>
                            <MenuItem value={'upcoming'}>Upcoming</MenuItem>
                            <MenuItem value={'finished'}>Closed</MenuItem>
                          </Select>
                        </FormItem>
                        <FormItem name="auctionType" label="Auction type" sx={{ width: 190 }}>
                          <Select defaultValue={5}>
                            <MenuItem value={5}>Fixed Swap NFT</MenuItem>
                          </Select>
                        </FormItem>
                        <FormItem name="chain" label="Chain" sx={{ width: 190 }}>
                          <Select defaultValue={1}>
                            {optionDatas?.chainInfoOpt?.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {ChainListMap[item.ethChainId as ChainId]?.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormItem>
                      </Stack>
                      <FormItem name="sortBy" label="Sort by" sx={{ width: 190 }}>
                        <Select>
                          <MenuItem value={0}>Start time</MenuItem>
                          <MenuItem value={1}>Creation time</MenuItem>
                        </Select>
                      </FormItem>
                    </Stack>
                    <Box mt={16}>
                      {poolsData?.total > 0 ? (
                        <Grid container spacing={18}>
                          {poolsData?.list?.map((fixedSwaptem: any, index: number) => (
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={index}>
                              <Box
                                component={'a'}
                                href={getAuctionPoolLink(
                                  fixedSwaptem.id,
                                  fixedSwaptem.category,
                                  fixedSwaptem.chainId,
                                  fixedSwaptem.poolId.toString()
                                )}
                              >
                                <NFTCard nft={fixedSwaptem} hiddenStatus={true} />
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <NoData />
                      )}

                      {poolsData?.total >= defaultIdeaPageSize && (
                        <Box mt={58} display={'flex'} justifyContent={'center'}>
                          <Pagination
                            onChange={handlePageChange}
                            count={Math.ceil(poolsData?.total / defaultIdeaPageSize) || 0}
                            variant="outlined"
                          />
                        </Box>
                      )}
                    </Box>
                  </TotalPaginationBox>
                </Container>
              </Box>
            </Box>
          )
        }}
      </Formik>
    </section>
  )
}

export default Pools
