import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { Box, Typography, Grid, Pagination } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import React, { useEffect, useCallback, useState } from 'react'
import { styled } from '@mui/material/styles'
import CloseIcon from 'assets/imgs/common/closeIcon.svg'
import { NFTCard } from 'pages/market/nftAuctionPool/index'
import { usePagination } from 'ahooks'
import { Params } from 'ahooks/lib/usePagination/types'
import { getPools } from 'api/market'
import FooterPc from 'components/Footer/FooterPc'
import FixedSelected from 'components/FixedNftSelected'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import EmptyData from 'bounceComponents/common/EmptyData'
import getAuctionPoolLink from 'utils/auction/getAuctionPoolRouteLink'
import useBreakpoint from 'hooks/useBreakpoint'
import MobileFixedNftSelected from 'components/FixedNftSelected/mobileFixedNftSelected'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface DialogParams {
  open: boolean
  handleClose: () => void
}
const NFTDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    borderRadius: '30px 30px 0 0'
  },
  [theme.breakpoints.up('sm')]: {
    '&.MuiDialog-root': {
      top: theme.height.header
    },
    '.MuiModal-backdrop': {
      top: theme.height.header,
      height: `calc(100% - ${theme.height.header})`
    },
    '.MuiDialog-paperScrollPaper': {
      position: 'relative',
      top: theme.height.header,
      height: `calc(100%)`
    },
    '.MuiDialog-paper': {
      borderRadius: '30px 30px 0 0',
      backgroundColor: 'var(--ps-text-8)',
      maxWidth: '100%',
      width: '100%'
    }
  },
  [theme.breakpoints.down('sm')]: {
    '.MuiDialog-paper': {
      position: 'relative',
      marginLeft: 0,
      marginRight: 0,
      marginTop: 44,
      marginBottom: 0,
      maxHeight: 'calc(100% - 44px)'
    },
    '.MuiDialogContent-root': {
      padding: '0 16px'
    }
  }
}))
interface TitleProps {
  title: string
  handleClose: () => void
}
const DialogTitle = (props: TitleProps) => {
  const { title, handleClose } = props
  const isSm = useBreakpoint('sm')
  return (
    <Box
      sx={{
        position: 'relative',
        height: isSm ? 70 : 140,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          lineHeight: '28px',
          fontFamily: `'Public Sans'`,
          fontSize: isSm ? 20 : 28,
          fontWeight: 600
        }}
      >
        {title}
      </Typography>
      <img
        src={CloseIcon}
        style={{
          position: 'absolute',
          right: isSm ? 0 : 72,
          top: '50%',
          marginTop: -30,
          width: 60,
          height: 60,
          cursor: 'pointer'
        }}
        onClick={() => {
          handleClose && handleClose()
        }}
        alt=""
        srcSet=""
      />
    </Box>
  )
}
export const initialValues = {
  searchText: '',
  searchType: 0,
  sortBy: 0,
  offset: 0,
  tokenFromAddress: '',
  tokenFromSymbol: '',
  tokenFromLogoURI: '',
  tokenFromDecimals: '',
  poolStatus: 0,
  auctionType: 0,
  chain: 2
}
export interface InitialValuesPros {
  searchText?: string
  searchType?: number
  sortBy?: number
  offset?: number
  tokenFromAddress?: string
  tokenFromSymbol?: string
  tokenFromLogoURI?: string
  tokenFromDecimals?: string
  poolStatus?: number
  auctionType?: number
  chain?: number
}
const defaultIdeaPageSize = 16
const NFTAuctionListDialog = (props: DialogParams) => {
  const { open, handleClose } = props
  const [filterValues, setFilterValues] = useState<InitialValuesPros>(initialValues)
  const {
    pagination: poolsPagination,
    data: poolsData,
    loading,
    run
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
    },
    {
      manual: true,
      defaultPageSize: defaultIdeaPageSize
    }
  )
  const handleSubmit = useCallback(
    (values: InitialValuesPros) => {
      return run({
        current: 1,
        pageSize: 16,
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
    },
    [run]
  )

  const handleScrollToTop = () => {
    const topEl = document.getElementById('topTitle')
    topEl &&
      topEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
  }
  const filterSubmit = (values: InitialValuesPros) => {
    setFilterValues(values)
    handleScrollToTop()
  }
  useEffect(() => {
    open && handleSubmit(filterValues)
    !open && setFilterValues(initialValues)
  }, [handleSubmit, open, filterValues])
  const handlePageChange = (_: any, p: number) => {
    poolsPagination.changeCurrent(p)
    handleScrollToTop()
  }
  const isSm = useBreakpoint('sm')
  return (
    <NFTDialog
      fullScreen={true}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Box id={'topTitle'}>
          <DialogTitle title={'NFT  Auction Space'} handleClose={handleClose} />
        </Box>
        <Box
          sx={{
            width: '100%',
            paddingBottom: 100,
            footer: {
              width: 'calc(100vw - 32px) !important'
            }
          }}
        >
          <Box
            mb={160}
            sx={{
              width: '100%',
              maxWidth: 1440,
              margin: '0 auto',
              paddingBottom: 100
            }}
          >
            {loading ? (
              <Box
                sx={{
                  width: '100%',
                  height: '70vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <BounceAnime />
              </Box>
            ) : poolsData?.total > 0 ? (
              <Grid container spacing={18}>
                {poolsData?.list?.map((fixedSwaptem: any, index: number) => (
                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={index}>
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
              <EmptyData />
            )}
            {poolsData?.total >= defaultIdeaPageSize && (
              <Box mt={58} display={'flex'} justifyContent={'center'}>
                <Pagination
                  onChange={handlePageChange}
                  count={Math.ceil(poolsData?.total / defaultIdeaPageSize) || 0}
                  variant="outlined"
                  siblingCount={0}
                  sx={{
                    '.MuiPaginationItem-root': {
                      margin: isSm ? '0 4px' : '0 12px'
                    },
                    '.MuiPagination-ul': {
                      flexWrap: 'nowrap',
                      alignItems: 'center'
                    }
                  }}
                />
              </Box>
            )}
          </Box>
          <FooterPc />
        </Box>
        {!isSm && <FixedSelected handleSubmit={filterSubmit} />}
        {isSm && <MobileFixedNftSelected handleSubmit={filterSubmit} />}
      </DialogContent>
    </NFTDialog>
  )
}
export default NFTAuctionListDialog
