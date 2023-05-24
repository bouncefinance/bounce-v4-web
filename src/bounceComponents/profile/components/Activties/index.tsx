import { Button, Grid, MenuItem, Select, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useRequest } from 'ahooks'
import { toast } from 'react-toastify'
import BigNumber from 'bignumber.js'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { ReactComponent as NoPoolFoundSVG } from 'assets/imgs/noPoolFound.svg'
import AuctionCard, { AuctionHolder, AuctionListItem } from 'bounceComponents/common/AuctionCard'
import FormItem from 'bounceComponents/common/FormItem'
import { getActivitiesTotal, getUserPoolsFixedSwap } from 'api/profile'
import { usePersonalInfo } from 'bounceHooks/user/usePersonalInfo'
import TokenImage from 'bounceComponents/common/TokenImage'
import { PoolType } from 'api/pool/type'
import { getLabelById, shortenAddress } from 'utils'
import { getIdeasList } from 'api/idea'
import InstitutionCard from 'bounceComponents/companies/InstitutionCard'
import { UserType } from 'api/market/type'
import { Link, useNavigate } from 'react-router-dom'
import { useOptionDatas } from 'state/configOptions/hooks'
import { useUserInfo } from 'state/users/hooks'
import { routes } from 'constants/routes'
import CertifiedTokenImage from 'components/CertifiedTokenImage'

export type IActivtiesProps = { type: UserType }

const poolType: Record<PoolType, string> = {
  [PoolType.FixedSwap]: 'Fixed-Price',
  [PoolType.Lottery]: 'Lottery',
  [PoolType.Duch]: 'Dutch Auction',
  [PoolType.SealedBid]: 'SealedBid'
}
const Activties: React.FC<IActivtiesProps> = ({ type }) => {
  const navigate = useNavigate()
  const { token } = useUserInfo()
  const optionDatas = useOptionDatas()
  const [btnSta, setBtnSta] = useState<string>('Auction')
  const [poolBtnSta] = useState<string>('Fixed')
  const [isCreated, setIsCreated] = useState(true)
  const [chain, setChain] = useState<number>(1)
  const handleCreateBtnClick = () => {
    if (!token) {
      toast.error('Please login')
      navigate(`${routes.login}?path=${routes.auction.createAuctionPool}?redirect=${routes.profile.activities}`)
    } else {
      navigate(`${routes.auction.createAuctionPool}?redirect=${routes.profile.activities}`)
    }
  }
  const { isMe, personalId } = usePersonalInfo(type)
  // getActivitiesTotal
  const { data: activitiesTotalData } = useRequest(
    async () => {
      if (!personalId) return
      const resp = await getActivitiesTotal({
        chainId: chain,
        userId: personalId
      })
      return {
        auctionTotal: resp.data.auctionTotal,
        ideaTotal: resp.data.ideaTotal,
        nftTotal: resp.data.nftTotal
      }
    },
    {
      // onSuccess: (resp) => {
      //   if (resp?.ideaTotal > resp?.auctionTotal) {
      //     setBtnSta('Ideas')
      //   } else {
      //     setBtnSta('Auction')
      //   }
      // },
      ready: !!personalId,
      refreshDeps: [chain, personalId]
    }
  )
  const { data: ideaListData, refresh } = useRequest(
    async () => {
      if (!personalId) return
      const resp = await getIdeasList({
        offset: 0,
        limit: 1000,
        UserId: personalId
      })
      return {
        total: resp.data.total,
        list: resp.data.list
      }
    },
    {
      ready: !!personalId,
      refreshDeps: [personalId]
    }
  )
  const { data: fixedSwapData } = useRequest(
    async () => {
      if (!personalId) return
      const resp = await getUserPoolsFixedSwap({
        action: isCreated ? 0 : 1,
        chainId: chain,
        userId: personalId
      })
      return {
        total: resp.data.total,
        list: resp.data.list,
        createdTotal: resp.data.createdTotal,
        participatedTotal: resp.data.participatedTotal
      }
    },
    {
      ready: !!personalId,
      refreshDeps: [isCreated, chain, personalId]
    }
  )

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} p={'0px 48px 38px'}>
        <Stack direction={'row'} spacing={10}>
          <Button
            variant={btnSta === 'Auction' ? 'contained' : 'outlined'}
            onClick={() => {
              setBtnSta('Auction')
            }}
          >
            Auction Pools ({activitiesTotalData?.auctionTotal})
          </Button>
          <Button
            variant={btnSta === 'Ideas' ? 'contained' : 'outlined'}
            onClick={() => {
              setBtnSta('Ideas')
            }}
          >
            Startup Ideas ({activitiesTotalData?.ideaTotal})
          </Button>
        </Stack>

        {btnSta === 'Auction' ? (
          <Stack direction={'row'} spacing={10}>
            <FormItem name="age" required sx={{ width: 190, height: 60 }}>
              <Select
                sx={{ borderRadius: 20 }}
                defaultValue={chain}
                onChange={e => {
                  setChain(e.target.value as number)
                }}
              >
                {optionDatas?.chainInfoOpt?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.chainName}
                  </MenuItem>
                ))}
              </Select>
            </FormItem>
            {isMe && (
              <Button
                variant="contained"
                sx={{ width: 156 }}
                endIcon={<AddCircleOutlineIcon />}
                onClick={handleCreateBtnClick}
              >
                Create pool
              </Button>
            )}
          </Stack>
        ) : (
          isMe && (
            <Button
              variant="contained"
              sx={{ width: 156 }}
              endIcon={<AddCircleOutlineIcon />}
              onClick={() => {
                if (!token) {
                  toast.error('Please login')
                  navigate(`${routes.login}?path=${routes.idea.create}`)
                } else {
                  navigate(routes.idea.create)
                }
              }}
            >
              Propose idea
            </Button>
          )
        )}
      </Box>
      {btnSta === 'Auction' ? (
        <Box sx={{ background: 'var(--ps-gray-50)', mx: 12, p: '42px 36px', borderRadius: 20 }}>
          {poolBtnSta === 'Fixed' && !isMe ? (
            <Typography variant="h2" fontSize={24} mb={30}>
              Auction Pools
            </Typography>
          ) : (
            <Box mb={30} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h2" fontSize={24}>
                Auction Pools
              </Typography>
              <Stack direction={'row'} spacing={10}>
                <Button
                  variant={isCreated ? 'contained' : 'outlined'}
                  onClick={() => {
                    setIsCreated(true)
                  }}
                >
                  Created ({fixedSwapData?.createdTotal})
                </Button>
                <Button
                  variant={!isCreated ? 'contained' : 'outlined'}
                  onClick={() => {
                    setIsCreated(false)
                  }}
                >
                  Participated ({fixedSwapData?.participatedTotal})
                </Button>
              </Stack>
            </Box>
          )}
          {isCreated ? (
            fixedSwapData?.createdTotal > 0 ? (
              <Grid container spacing={18}>
                {fixedSwapData?.list?.map((fixedSwaptem: any, index: number) => (
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={index}>
                    <Box
                      component={'a'}
                      target="_blank"
                      href={routes.auction.fixedPrice
                        .replace(':chainShortName', getLabelById(chain, 'shortName', optionDatas?.chainInfoOpt))
                        .replace(':poolId', fixedSwaptem.poolId)}
                    >
                      <AuctionCard
                        poolId={fixedSwaptem.poolId}
                        title={fixedSwaptem.name}
                        isMe={isMe}
                        isCreator={isCreated}
                        creatorClaimed={fixedSwaptem.creatorClaimed}
                        status={fixedSwaptem.status}
                        claimAt={fixedSwaptem.claimAt}
                        closeAt={fixedSwaptem.closeAt}
                        dateStr={fixedSwaptem.status == 1 ? fixedSwaptem.openAt : fixedSwaptem.closeAt}
                        holder={
                          fixedSwaptem.creatorUserInfo?.userType === UserType.Profile ? (
                            <AuctionHolder
                              href={`/profile/summary?id=${fixedSwaptem.creatorUserInfo?.userId}`}
                              avatar={fixedSwaptem.creatorUserInfo?.avatar}
                              name={fixedSwaptem.creatorUserInfo?.name}
                              description={
                                fixedSwaptem.creatorUserInfo?.publicRole?.length > 0
                                  ? fixedSwaptem.creatorUserInfo?.publicRole?.map((item: any, index: number) => {
                                      return (
                                        getLabelById(item, 'role', optionDatas?.publicRoleOpt) +
                                        `${index !== fixedSwaptem.creatorUserInfo?.publicRole?.length - 1 && ', '}`
                                      )
                                    })
                                  : 'Individual account'
                              }
                              isVerify={fixedSwaptem.creatorUserInfo?.isVerify}
                            />
                          ) : (
                            <AuctionHolder
                              href={`/company/summary?id=${fixedSwaptem.creatorUserInfo?.userId}`}
                              avatar={fixedSwaptem.creatorUserInfo?.companyAvatar}
                              name={fixedSwaptem.creatorUserInfo?.companyName}
                              description={fixedSwaptem.creatorUserInfo?.companyIntroduction || 'No description yet'}
                              isVerify={fixedSwaptem.creatorUserInfo?.isVerify}
                            />
                          )
                        }
                        progress={{
                          symbol: fixedSwaptem.token0.symbol?.toUpperCase(),
                          decimals: fixedSwaptem.token0.decimals,
                          sold: fixedSwaptem.swappedAmount0,
                          supply: fixedSwaptem.amountTotal0
                        }}
                        listItems={
                          <>
                            <AuctionListItem
                              label="Token symbol"
                              value={
                                <Stack direction="row" alignItems="center" spacing={4}>
                                  <TokenImage
                                    src={fixedSwaptem.token0.largeUrl}
                                    alt={fixedSwaptem.token0.symbol}
                                    size={20}
                                  />

                                  <span>{fixedSwaptem.token0.symbol.toUpperCase()}</span>
                                </Stack>
                              }
                            />
                            <AuctionListItem
                              label="Contract address"
                              value={
                                <Stack direction="row" alignItems="center" spacing={4}>
                                  <CertifiedTokenImage
                                    address={fixedSwaptem.token0.address}
                                    coingeckoId={fixedSwaptem.token0.coingeckoId}
                                    ethChainId={fixedSwaptem.ethChainId}
                                    backedChainId={fixedSwaptem.chainId}
                                  />
                                  <span>{shortenAddress(fixedSwaptem.token0.address)}</span>
                                  <CopyToClipboard text={fixedSwaptem.token0.address} />
                                </Stack>
                              }
                            />
                            <AuctionListItem
                              label="Fixed price ratio"
                              value={
                                <Stack direction="row" spacing={8}>
                                  <Typography fontSize={12}>1</Typography>
                                  <Typography fontSize={12}>
                                    {fixedSwaptem.token0.symbol.toUpperCase()} ={' '}
                                    {new BigNumber(fixedSwaptem.ratio)
                                      .decimalPlaces(6, BigNumber.ROUND_DOWN)
                                      .toFormat()}
                                  </Typography>
                                  <Typography fontSize={12}>{fixedSwaptem.token1.symbol.toUpperCase()}</Typography>
                                </Stack>
                              }
                            />
                            <AuctionListItem
                              label="Price,$"
                              value={
                                <span>
                                  {new BigNumber(fixedSwaptem.poolPrice)
                                    .decimalPlaces(6, BigNumber.ROUND_DOWN)
                                    .toFormat()}
                                </span>
                              }
                            />
                          </>
                        }
                        categoryName={poolType[fixedSwaptem.category as PoolType]}
                        whiteList={fixedSwaptem.enableWhiteList ? 'Whitelist' : 'Public'}
                        chainId={fixedSwaptem.chainId}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              // <NoData svgColor={'var(--ps-white)'} color={'var(--ps-gray-900)'} />
              <Box width={300} pt={33} pb={70} textAlign={'center'} margin={'0 auto'}>
                <NoPoolFoundSVG />
                <Typography mt={20} variant="body1" fontSize={20} color={'#908E96'}>
                  No pool found
                </Typography>
              </Box>
            )
          ) : !isCreated && fixedSwapData?.participatedTotal > 0 ? (
            <Grid container spacing={18}>
              {fixedSwapData?.list?.map((fixedSwaptem: any, index: number) => (
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={index}>
                  <Box
                    component={'a'}
                    target="_blank"
                    href={routes.auction.fixedPrice
                      .replace(':chainShortName', getLabelById(chain, 'shortName', optionDatas?.chainInfoOpt))
                      .replace(':poolId', fixedSwaptem.poolId)}
                  >
                    <AuctionCard
                      poolId={fixedSwaptem.poolId}
                      title={fixedSwaptem.name}
                      isMe={isMe}
                      isCreator={isCreated}
                      participantClaimed={fixedSwaptem.participant.claimed}
                      status={fixedSwaptem.status}
                      claimAt={fixedSwaptem.claimAt}
                      closeAt={fixedSwaptem.closeAt}
                      dateStr={fixedSwaptem.status == 1 ? fixedSwaptem.openAt : fixedSwaptem.closeAt}
                      holder={
                        fixedSwaptem.creatorUserInfo?.userType === UserType.Profile ? (
                          <AuctionHolder
                            href={`/profile/summary?id=${fixedSwaptem.creatorUserInfo?.userId}`}
                            avatar={fixedSwaptem.creatorUserInfo?.avatar}
                            name={fixedSwaptem.creatorUserInfo?.name}
                            description={
                              fixedSwaptem.creatorUserInfo?.publicRole?.length > 0
                                ? fixedSwaptem.creatorUserInfo?.publicRole?.map((item: any, index: number) => {
                                    return (
                                      getLabelById(item, 'role', optionDatas?.publicRoleOpt) +
                                      `${index !== fixedSwaptem.creatorUserInfo?.publicRole?.length - 1 && ', '}`
                                    )
                                  })
                                : 'Individual account'
                            }
                            isVerify={fixedSwaptem.creatorUserInfo?.isVerify}
                          />
                        ) : (
                          <AuctionHolder
                            href={`/company/summary?id=${fixedSwaptem.creatorUserInfo?.userId}`}
                            avatar={fixedSwaptem.creatorUserInfo?.companyAvatar}
                            name={fixedSwaptem.creatorUserInfo?.companyName}
                            description={fixedSwaptem.creatorUserInfo?.companyIntroduction || 'No description yet'}
                            isVerify={fixedSwaptem.creatorUserInfo?.isVerify}
                          />
                        )
                      }
                      progress={{
                        symbol: fixedSwaptem.token0.symbol?.toUpperCase(),
                        decimals: fixedSwaptem.token0.decimals,
                        sold: fixedSwaptem.swappedAmount0,
                        supply: fixedSwaptem.amountTotal0
                      }}
                      listItems={
                        <>
                          <AuctionListItem
                            label="Token symbol"
                            value={
                              <Stack direction="row" alignItems="center" spacing={4}>
                                <TokenImage
                                  src={fixedSwaptem.token0.largeUrl}
                                  alt={fixedSwaptem.token0.symbol}
                                  size={20}
                                />
                                <span>{fixedSwaptem.token0.symbol.toUpperCase()}</span>
                              </Stack>
                            }
                          />
                          <AuctionListItem
                            label="Contract address"
                            value={
                              <Stack direction="row" alignItems="center" spacing={4}>
                                <CertifiedTokenImage
                                  address={fixedSwaptem.token0.address}
                                  coingeckoId={fixedSwaptem.token0.coingeckoId}
                                  ethChainId={fixedSwaptem.ethChainId}
                                  backedChainId={fixedSwaptem.chainId}
                                />
                                <span>{shortenAddress(fixedSwaptem.token0.address)}</span>
                                <CopyToClipboard text={fixedSwaptem.token0.address} />
                              </Stack>
                            }
                          />
                          <AuctionListItem
                            label="Fixed price ratio"
                            value={
                              <Stack direction="row" spacing={8}>
                                <Typography fontSize={12}>1</Typography>
                                <Typography fontSize={12}>
                                  {fixedSwaptem.token0.symbol.toUpperCase()} ={' '}
                                  {new BigNumber(fixedSwaptem.ratio).decimalPlaces(6, BigNumber.ROUND_DOWN).toFormat()}
                                </Typography>
                                <Typography fontSize={12}>{fixedSwaptem.token1.symbol.toUpperCase()}</Typography>
                              </Stack>
                            }
                          />
                          <AuctionListItem
                            label="Price,$"
                            value={
                              <span>
                                {new BigNumber(fixedSwaptem.poolPrice)
                                  .decimalPlaces(6, BigNumber.ROUND_DOWN)
                                  .toFormat()}
                              </span>
                            }
                          />{' '}
                        </>
                      }
                      categoryName={poolType[fixedSwaptem.category as PoolType]}
                      whiteList={fixedSwaptem.enableWhiteList ? 'Whitelist' : 'Public'}
                      chainId={fixedSwaptem.chainId}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            // <NoData svgColor={'var(--ps-white)'} color={'var(--ps-gray-900)'} />
            <Box width={300} pt={33} pb={70} textAlign={'center'} margin={'0 auto'}>
              <NoPoolFoundSVG />
              <Typography mt={20} variant="body1" fontSize={20} color={'#908E96'}>
                No pool found
              </Typography>
            </Box>
          )}
        </Box>
      ) : btnSta === 'Ideas' ? (
        <Box sx={{ background: 'var(--ps-gray-50)', mx: 12, p: '42px 36px', borderRadius: 20 }}>
          <Typography variant="h2" fontSize={24} mt={15}>
            Startup Ideas
          </Typography>
          {ideaListData?.total > 0 ? (
            <Grid container spacing={18} mt={12}>
              {ideaListData?.list?.map((ideaListItem: any, index: number) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                  <Link to={`${routes.idea.create}?id=${ideaListItem?.id}`}>
                    <InstitutionCard
                      icon={ideaListItem.avatar}
                      status={ideaListItem.marketType}
                      title={ideaListItem.FullName}
                      ideaTitle={ideaListItem.title}
                      isVerify={ideaListItem.isVerify}
                      desc={ideaListItem.summary}
                      isEdit={isMe}
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
                      publicRole={ideaListItem.publicRole}
                      companyState={ideaListItem?.companyState}
                      startup={ideaListItem?.startup}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box width={300} pt={33} pb={70} textAlign={'center'} margin={'0 auto'}>
              <NoPoolFoundSVG />
              <Typography mt={20} variant="body1" fontSize={20} color={'#908E96'}>
                No idea found
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  )
}

export default Activties
