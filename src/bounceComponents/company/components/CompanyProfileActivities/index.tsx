import { Avatar, Box, Button, Grid, Link, Pagination, PaginationItem, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
import { usePagination } from 'ahooks'
import { Params } from 'ahooks/lib/usePagination/types'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Image from 'components/Image'
import { ReactComponent as NoPoolFoundSVG } from 'assets/imgs/noPoolFound.svg'
import CoingeckoSVG from 'assets/imgs/chains/coingecko.svg'
import AuctionCard, { AuctionListItem } from 'bounceComponents/common/AuctionCard'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { useGetCompanyTokens } from 'bounceHooks/company/useGetCompanyTokens'
import { getLabelById, shortenAddress } from 'utils'
// import DefaultAvatarSVG from 'assets/imgs/company/tokens/default-avatar.svg'
import { PoolType } from 'api/pool/type'
import { IAuctionPoolsData, IAuctionPoolsItems } from 'api/profile/type'
import { getUserActivitiesPool } from 'api/profile'
import { IIdeasListData, IIdeasListItems } from 'api/idea/type'
import { getIdeasList } from 'api/idea'
import InstitutionCard from 'bounceComponents/companies/InstitutionCard'
import TokenImage from 'bounceComponents/common/TokenImage'
import ErrorSVG from 'assets/imgs/icon/error_filled.svg'
import TokenDefaultSVG from 'assets/imgs/defaultAvatar/token.svg'
import { useOptionDatas } from 'state/configOptions/hooks'
import { useQueryParams } from 'hooks/useQueryParams'
import { routes } from 'constants/routes'

export type IActivitieProps = {
  personalInfoId: number
}
const defaultPageSize = 3
const defaultIdeaPageSize = 4
const poolType: Record<PoolType, string> = {
  [PoolType.FixedSwap]: 'Fixed-Price',
  [PoolType.Lottery]: 'Lottery',
  [PoolType.Duch]: 'Dutch Auction',
  [PoolType.SealedBid]: 'SealedBid'
}
const Activitie: React.FC<IActivitieProps> = ({ personalInfoId }) => {
  const optionDatas = useOptionDatas()
  const [btnSta, setBtnSta] = useState<string>('Auction')
  const { data: tokensData, runAsync: runGetCompanyTokens } = useGetCompanyTokens()
  const { thirdpartId } = useQueryParams()
  useEffect(() => {
    personalInfoId && runGetCompanyTokens({ limit: 100, offset: 0, companyId: Number(personalInfoId) })
  }, [runGetCompanyTokens, personalInfoId])

  const { pagination, data: auctionPoolData } = usePagination<IAuctionPoolsItems<IAuctionPoolsData>, Params>(
    async ({ current, pageSize }) => {
      if (personalInfoId) {
        const resp = await getUserActivitiesPool({
          offset: (current - 1) * pageSize,
          limit: pageSize,
          userId: personalInfoId
        })
        return {
          total: resp.data.total,
          list: resp.data.list
        }
      }
    },
    {
      ready: !!personalInfoId,
      defaultPageSize: defaultPageSize,
      refreshDeps: [personalInfoId]
    }
  )

  const {
    pagination: ideaPagination,
    data: ideaListData,
    refresh
  } = usePagination<IIdeasListItems<IIdeasListData>, Params>(
    async ({ current, pageSize }) => {
      if (personalInfoId) {
        const resp = await getIdeasList({
          offset: (current - 1) * pageSize,
          limit: pageSize,
          UserId: personalInfoId
        })
        return {
          total: resp.data.total,
          list: resp.data.list
        }
      }
    },
    {
      ready: !!personalInfoId,
      defaultPageSize: defaultIdeaPageSize,
      refreshDeps: [personalInfoId]
    }
  )

  const handlePageChange = (e, p) => {
    if (btnSta === 'Auction') {
      pagination.changeCurrent(p)
    } else {
      ideaPagination.changeCurrent(p)
    }
  }
  if (thirdpartId || (!tokensData?.data?.total && !auctionPoolData?.total && !ideaListData?.total)) {
    return <></>
  }

  return (
    <Box mx={12} mt={48} mb={52} p={'52px 30px 48px 36px'} bgcolor={'var(--ps-gray-50)'} borderRadius={20}>
      <Typography fontFamily={'"Sharp Grotesk DB Cyr Medium 22"'} fontSize={24}>
        Activities
      </Typography>
      <Box display={'flex'} justifyContent={'space-between'} mt={30} mb={16}>
        <Stack direction="row" spacing={10}>
          <Button
            variant={btnSta === 'Auction' ? 'contained' : 'outlined'}
            onClick={() => {
              setBtnSta('Auction')
            }}
          >
            Auction Pool {`(${Number(auctionPoolData?.total) || 0})`}
          </Button>
          <Button
            variant={btnSta === 'Ideas' ? 'contained' : 'outlined'}
            onClick={() => {
              setBtnSta('Ideas')
            }}
          >
            Startup Ideas {`(${Number(ideaListData?.total) || 0})`}
          </Button>
          <Button
            variant={btnSta === 'Token' ? 'contained' : 'outlined'}
            onClick={() => {
              setBtnSta('Token')
            }}
          >
            Token ({tokensData?.data?.total || 0})
          </Button>
        </Stack>
        <Stack direction="row">
          {btnSta === 'Auction' ? (
            auctionPoolData?.total <= defaultPageSize ? (
              <></>
            ) : (
              <Pagination
                onChange={handlePageChange}
                sx={{ '.MuiPagination-ul li button': { border: '1px solid' }, alignItems: 'end' }}
                count={Math.ceil(auctionPoolData?.total / defaultPageSize || 0)}
                renderItem={item => {
                  if (item.type === 'previous' || item.type === 'next') {
                    return <PaginationItem components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                  }
                }}
              />
            )
          ) : btnSta === 'Ideas' ? (
            ideaListData?.total <= defaultIdeaPageSize ? (
              <></>
            ) : (
              <Pagination
                onChange={handlePageChange}
                sx={{ '.MuiPagination-ul li button': { border: '1px solid' }, alignItems: 'end' }}
                count={Math.ceil(ideaListData?.total / defaultIdeaPageSize || 0)}
                renderItem={item => {
                  if (item.type === 'previous' || item.type === 'next') {
                    return <PaginationItem components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                  }
                }}
              />
            )
          ) : (
            <></>
          )}
        </Stack>
      </Box>
      {btnSta === 'Auction' ? (
        <Box>
          {auctionPoolData && auctionPoolData?.total > 0 ? (
            <Grid container spacing={18}>
              {auctionPoolData?.list?.map((auctionPoolItem, index) => (
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={index}>
                  <Box
                    component={'a'}
                    target="_blank"
                    href={routes.auction.fixedPrice
                      .replace(
                        ':chainShortName',
                        getLabelById(auctionPoolItem?.chainId, 'shortName', optionDatas?.chainInfoOpt)
                      )
                      .replace(':poolId', auctionPoolItem.poolId)}
                  >
                    <AuctionCard
                      poolId={auctionPoolItem.poolId}
                      title={auctionPoolItem.name}
                      status={auctionPoolItem.status}
                      claimAt={auctionPoolItem.claimAt}
                      closeAt={auctionPoolItem.closeAt}
                      dateStr={auctionPoolItem.status == 1 ? auctionPoolItem.openAt : auctionPoolItem.closeAt}
                      listItems={
                        <>
                          <AuctionListItem
                            label="Token symbol"
                            value={
                              <Stack direction="row" alignItems="center" spacing={4}>
                                <TokenImage
                                  src={auctionPoolItem.token0.largeUrl}
                                  alt={auctionPoolItem.token0.symbol}
                                  size={20}
                                />
                                <span>{auctionPoolItem.token0.symbol?.toUpperCase()}</span>
                              </Stack>
                            }
                          />
                          <AuctionListItem
                            label="Contract address"
                            value={
                              <Stack direction="row" alignItems="center" spacing={4}>
                                {/* <TokenImage src={CoingeckoSVG} alt="coingecko" size={20} /> */}
                                {auctionPoolItem.token0.coingeckoId ? (
                                  <TokenImage src={CoingeckoSVG} alt="coingecko" size={20} />
                                ) : (
                                  <Image src={ErrorSVG} width={20} height={20} alt="Dangerous" />
                                )}
                                <span>{shortenAddress(auctionPoolItem.token0.address)}</span>
                                <CopyToClipboard text={auctionPoolItem.token0.address} />
                              </Stack>
                            }
                          />
                        </>
                      }
                      categoryName={poolType[auctionPoolItem.category]}
                      whiteList={auctionPoolItem.enableWhiteList ? 'Whitelist' : 'Public'}
                      chainId={auctionPoolItem.chainId}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box width={300} pt={33} textAlign={'center'} margin={'0 auto'}>
              <NoPoolFoundSVG />
              <Typography mt={20} variant="body1" fontSize={20} color={'#908E96'}>
                No pool found
              </Typography>
            </Box>
          )}
        </Box>
      ) : btnSta === 'Token' ? (
        <Box>
          {tokensData?.data?.total > 0 ? (
            <Grid container spacing={32}>
              {tokensData?.data?.list?.map((v, i) => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={i}>
                  <Box
                    p={'20px 24px 17px'}
                    sx={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: 16, bgcolor: '#FFFFFF' }}
                  >
                    <Box display={'flex'} justifyContent="space-between">
                      <Box display={'flex'}>
                        <Avatar src={v.tokenLogo || TokenDefaultSVG} sx={{ width: 52, height: 52, borderRadius: 10 }} />
                        <Stack spacing={0} ml={12} alignSelf="center">
                          <Typography variant="h4">{v.tokenName}</Typography>
                          {v.isIssued ? <Typography variant="body1">(Token is not issued)</Typography> : null}
                        </Stack>
                      </Box>
                      <Button
                        component={Link}
                        variant="contained"
                        sx={{ height: 40, width: 90, alignSelf: 'flex-start' }}
                        disabled={v.isIssued}
                        target="_blank"
                        href={
                          Number(v?.tokenType) === 1
                            ? `https://www.sushi.com/swap?token1=${v?.tokenAddress}`
                            : `https://opensea.io/collections/${v?.tokenAddress}`
                        }
                        rel="noreferrer"
                      >
                        Buy
                      </Button>
                    </Box>
                    <Stack spacing={10} mt={16}>
                      <Box display={'flex'} justifyContent="space-between">
                        <Typography variant="body2" color={'var(--ps-gray-700)'}>
                          Token Type
                        </Typography>
                        <Typography variant="body2">
                          {getLabelById(v.tokenType, 'name', optionDatas?.tokenTypeOpt)}
                        </Typography>
                      </Box>
                      <Box display={'flex'} justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color={'var(--ps-gray-700)'}>
                          Contract address
                        </Typography>
                        <Box display={'flex'} height={20} alignItems="center">
                          <Typography variant="body2">
                            {v.tokenAddress ? shortenAddress(v.tokenAddress) : '-'}
                          </Typography>
                          <CopyToClipboard text={v.tokenAddress} />
                          <LaunchOutlinedIcon
                            sx={{ width: 14, height: 14, color: 'rgba(144, 142, 150, 0.7)', cursor: 'pointer' }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box width={300} pt={33} textAlign={'center'} margin={'0 auto'}>
              <NoPoolFoundSVG />
              <Typography mt={20} variant="body1" fontSize={20} color={'#908E96'}>
                No token found
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Box>
          {ideaListData?.total > 0 ? (
            <Grid container spacing={18}>
              {ideaListData?.list?.map((ideaListItem, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                  <Link target="_blank" href={`/idea/detail?id=${ideaListItem?.id}`}>
                    <InstitutionCard
                      icon={ideaListItem.avatar}
                      status={ideaListItem.marketType}
                      title={ideaListItem.FullName}
                      ideaTitle={ideaListItem.title}
                      isVerify={ideaListItem.isVerify}
                      desc={ideaListItem.summary}
                      likeAmount={{
                        dislikeCount: ideaListItem.dislikeCount,
                        likeCount: ideaListItem.likeCount,
                        myDislike: ideaListItem.myDislike,
                        myLike: ideaListItem.myLike
                      }}
                      acitve={ideaListItem.active}
                      objId={ideaListItem.id}
                      refresh={refresh}
                      commentCount={ideaListItem.commentCount}
                      publicRole={getLabelById(ideaListItem.publicRole?.[0], 'role', optionDatas?.publicRoleOpt)}
                      companyState={ideaListItem?.companyState}
                      startup={ideaListItem?.startup}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box width={300} pt={33} textAlign={'center'} margin={'0 auto'}>
              <NoPoolFoundSVG />
              <Typography mt={20} variant="body1" fontSize={20} color={'#908E96'}>
                No idea found
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Activitie
