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
import DutchAuction from './components/dutctAuction'
const defaultHeadData = PrivatePadDataList.find(item => item.keyId === 11) as IPrivatePadProp

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
        dip: {
          startAt: 1689521217979,
          closeAt: 1689921217979,
          id: 18517,
          active: true
        },
        dgt: {
          startAt: 1689521217979,
          closeAt: 1689921217979,
          id: 18520, // live
          //   id: 18517, // claimable
          //   id: 18516, // claimed
          //   id: 18514, // no join
          active: true
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
          <StageLine poolsData={{ list: poolsData }} activeIndex={dataIndex} setIndex={setShowDataIndex} />
          <PoolTabs
            poolsData={{ list: poolsData }}
            index={dataIndex}
            poolType={poolType}
            setPoolType={handleSetPoolType}
          ></PoolTabs>
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
const DipHeadBox = styled(Box)({
  width: '100%',
  paddingBottom: 50,
  backgroundImage: `url(${HeadBg})`,
  backgroundSize: 'cover'
})
const DipTabBox = styled(Box)({
  width: '100%',
  backgroundImage: `url(${TabBg})`,
  backgroundSize: 'cover',
  padding: '80px 0 148px'
})
export default DipExchange
