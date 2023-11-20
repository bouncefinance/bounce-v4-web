import { ProjectHead, Tabs } from 'pages/projectIntro'
import { Steps } from './Step'
import { PrivatePadCoinData } from 'pages/launchpad/PrivatePadDataList'
import FooterPc from 'components/Footer/FooterPc'

const Page = () => {
  return (
    <>
      <ProjectHead item={PrivatePadCoinData} />
      <div style={{ background: '#f5f5f1' }}>
        <Steps />
      </div>

      <Tabs item={PrivatePadCoinData} />
      <FooterPc />
    </>
  )
}
export default Page
