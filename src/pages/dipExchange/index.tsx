/* eslint-disable react/no-unescaped-entities */
import { Box, styled } from '@mui/material'
import { IPrivatePadProp } from 'pages/launchpad/PrivatePadDataList'
import { ProjectHead, Tabs } from '../projectIntro'
import HeadBg from 'assets/imgs/dipExchange/head-bg.png'
import TabBg from 'assets/imgs/dipExchange/tab-bg.png'
import FooterPc from 'components/Footer/FooterPc'
import { PrivatePadDataList } from '../launchpad/PrivatePadDataList'
import StageLine from './components/stageLine'
import { useState } from 'react'
import PoolTabs from './components/poolTabs'
import { PoolIndexType } from './components/poolTabs'
import DutchAuction from './components/dutchAuction/dutctAuction'
const defaultHeadData = PrivatePadDataList.find(item => item.keyId === 11) as IPrivatePadProp
import Erc20English from './components/erc20English/erc20english'
import { IS_TEST_ENV } from '../../constants'

// interface poolsDataItem {
//   timaSteamp: number
//   active: boolean
//   // english auction
//   dip: {
//     startAt: number
//     closeAt: number
//     id: number
//   }
//   // dutch aution
//   dgt: {
//     startAt: number
//     closeAt: number
//     id: number
//   }
// }
const DipExchange = () => {
  //   const nowDate = new Date().valueOf()
  //   const oneDay = 60 * 60 * 24 * 1000
  // all activities line data
  //   const poolsData: poolsDataItem[] = useMemo(() => [], [])
  const poolsData = !IS_TEST_ENV
    ? []
    : [
        {
          timaSteamp: 1692201600000,
          active: 1692201600000 <= new Date().valueOf(),
          // english auction
          dip: {
            startAt: 1692201600000,
            closeAt: 1692288000000,
            id: 20497
          },
          // dutch aution
          dgt: {
            startAt: 1692288000000,
            closeAt: 1692374400000,
            id: 20498
          }
        },
        {
          timaSteamp: 1692720000000,
          active: 1692720000000 <= new Date().valueOf(),
          // english auction
          dip: {
            startAt: 1692720000000,
            closeAt: 1692806400000,
            id: 20499
          },
          // dutch aution
          dgt: {
            startAt: 1692892800000,
            closeAt: 1692979200000,
            id: 20500
          }
        },
        {
          timaSteamp: 1697451600000,
          active: 1697451600000 <= new Date().valueOf(),
          // english auction
          dip: {
            startAt: 1697451600000,
            closeAt: 1697637600000,
            id: 20499
          },
          // dutch aution
          dgt: {
            startAt: 1697451600000,
            closeAt: 1697637600000,
            id: 20789
          }
        },
        {
          timaSteamp: 1698847200000,
          active: 1698847200000 <= new Date().valueOf(),
          // english auction
          dip: {
            startAt: 1698847200000,
            closeAt: 1698933600000,
            id: 18569
          },
          // dutch aution
          dgt: {
            startAt: 1698847200000,
            closeAt: 1698933600000,
            id: 18569
          }
        }
      ]
  // last date higt light
  let lastActiveIndex = 0
  poolsData.map((item, index) => {
    if (item?.active) {
      lastActiveIndex = index
    }
  })
  const [dataIndex, setDataIndex] = useState(lastActiveIndex)
  const setShowDataIndex = (index: number) => {
    setDataIndex(index)
  }
  const [poolType, setPoolType] = useState<PoolIndexType>(PoolIndexType.DGT)
  const handleSetPoolType = (type: PoolIndexType) => {
    setPoolType(type)
  }
  return (
    <Box sx={{ background: 'black' }}>
      <DipHeadBox>
        <ProjectHead item={defaultHeadData} isDark={true} />
      </DipHeadBox>
      <DipTabBox>
        {poolsData.length > 0 && (
          <DipCenter>
            {/* activities time line */}
            <StageLine poolsData={{ list: poolsData }} activeIndex={dataIndex} setIndex={setShowDataIndex} />
            <Box
              sx={{
                width: '100%',
                maxWidth: '100vw',
                overflowX: 'auto'
              }}
            >
              <PoolTabs
                poolsData={{ list: poolsData }}
                index={dataIndex}
                poolType={poolType}
                setPoolType={handleSetPoolType}
              ></PoolTabs>
            </Box>
            {poolType === PoolIndexType.DIP && <Erc20English poolsData={{ list: poolsData }} index={dataIndex} />}
            {poolType === PoolIndexType.DGT && <DutchAuction poolsData={{ list: poolsData }} index={dataIndex} />}
          </DipCenter>
        )}
        <Tabs item={defaultHeadData} isDark={true} />
        <FooterPc isDark={true} />
      </DipTabBox>
    </Box>
  )
}
const DipCenter = styled(Box)(() => ({
  width: '100%',
  maxWidth: '1296px',
  margin: '0 auto'
}))
const DipHeadBox = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingBottom: 50,
  backgroundImage: `url(${HeadBg})`,
  backgroundSize: 'cover',
  [theme.breakpoints.down('md')]: {
    paddingBottom: 0
  }
}))
const DipTabBox = styled(Box)({
  width: '100%',
  backgroundImage: `url(${TabBg})`,
  backgroundSize: 'cover',
  padding: '80px 0 148px'
})
export default DipExchange
