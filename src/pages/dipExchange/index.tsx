/* eslint-disable react/no-unescaped-entities */
import { Box, styled } from '@mui/material'
import { IPrivatePadProp } from 'pages/launchpad/PrivatePadDataList'
import { ProjectHead, Tabs } from '../projectIntro'
import HeadBg from 'assets/imgs/dipExchange/head-bg.png'
import TabBg from 'assets/imgs/dipExchange/tab-bg.png'
import FooterPc from 'components/Footer/FooterPc'
import { PrivatePadDataList } from '../launchpad/PrivatePadDataList'

const defaultHeadData = PrivatePadDataList.find(item => item.keyId === 11) as IPrivatePadProp
const DipExchange = () => {
  return (
    <Box sx={{ background: 'black' }}>
      <DipHeadBox>
        <ProjectHead item={defaultHeadData} isDark={true} />
      </DipHeadBox>
      <DipTabBox>
        <Tabs item={defaultHeadData} isDark={true} />
        <FooterPc isDark={true} />
      </DipTabBox>
    </Box>
  )
}
const DipHeadBox = styled(Box)({
  width: '100%',
  paddingBottom: 50,
  backgroundImage: `url(${HeadBg})`,
  backgroundSize: 'cover'
})
const DipTabBox = styled(Box)({
  width: '100%',
  marginTop: 4,
  backgroundImage: `url(${TabBg})`,
  backgroundSize: 'cover',
  padding: '36px 0 50px'
})
export default DipExchange
