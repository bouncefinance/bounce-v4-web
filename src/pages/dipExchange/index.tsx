/* eslint-disable react/no-unescaped-entities */
import { Box, styled } from '@mui/material'
import { IPrivatePadProp } from 'pages/launchpad/PrivatePadDataList'
import { ProjectHead, Tabs } from '../projectIntro'
import HeadBg from 'assets/imgs/dipExchange/head-bg.png'
import TabBg from 'assets/imgs/dipExchange/tab-bg.png'
import FooterPc from 'components/Footer/FooterPc'
import { PrivatePadDataList } from '../launchpad/PrivatePadDataList'
import StageLine from './components/stageLine'
import { useState, useMemo } from 'react'
import PoolTabs from './components/poolTabs'
import { PoolIndexType } from './components/poolTabs'
import DutchAuction from './components/dutchAuction/dutctAuction'
const defaultHeadData = PrivatePadDataList.find(item => item.keyId === 11) as IPrivatePadProp
import Erc20English from './components/erc20English/erc20english'
const DipExchange = () => {
  const nowDate = new Date().valueOf()
  const oneDay = 60 * 60 * 24 * 1000
  // all activities line data
  const poolsData = Array(10)
    .fill({
      timaSteamp: nowDate - oneDay * 2,
      active: false
    })
    .map((item, index) => {
      return {
        timaSteamp: item.timaSteamp + oneDay * index,
        active: item.timaSteamp + oneDay * index <= new Date().valueOf(),
        // english auction
        dip: {
          startAt: 1690012800000,
          closeAt: 1690099200000,
          id: 18657
        },
        // dutch aution
        dgt: {
          startAt: 1690016400000,
          closeAt: 1690102800000,
          id: 18658
        }
      }
    })
  // last date higt light
  const lastActiveIndex = useMemo(() => {
    let lastIndex = 0
    poolsData.map((item, index) => {
      if (item.active) {
        lastIndex = index
      }
    })
    return lastIndex
  }, [poolsData])
  const [dataIndex, setDataIndex] = useState(lastActiveIndex)
  const setShowDataIndex = (index: number) => {
    setDataIndex(index)
  }
  const [poolType, setPoolType] = useState<PoolIndexType>(PoolIndexType.DIP)
  const handleSetPoolType = (type: PoolIndexType) => {
    setPoolType(type)
  }
  return (
    <Box sx={{ background: 'black' }}>
      <DipHeadBox>
        <ProjectHead item={defaultHeadData} isDark={true} />
      </DipHeadBox>
      <DipTabBox>
        <DipCenter>
          {/* activities time line */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '100vw',
              overflowX: 'auto',
              paddingLeft: '16px'
            }}
          >
            <StageLine poolsData={{ list: poolsData }} activeIndex={dataIndex} setIndex={setShowDataIndex} />
          </Box>
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
