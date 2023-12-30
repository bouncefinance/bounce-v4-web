import Banner from './sections/banner/index'
import ArtistsList from './sections/artistsList'
import ArtistsInformation from './sections/artistsInformation'
import TokenInformation from './sections/tokenInformation'
import PoolDetail from './sections/poolDetail'
import FooterPc from 'components/Footer/FooterPc'
import Goback from './components/banner/goBack'
import { useEffect } from 'react'
import useRandomSelectionNFTPoolInfo from 'bounceHooks/auction/useRandomSelectionNFTPoolInfo'

const NftLottery = () => {
  const { data: poolInfo } = useRandomSelectionNFTPoolInfo()
  useEffect(() => {
    document.getElementById('body')?.setAttribute('style', 'padding-top: 0;')
    return () => {
      document.getElementById('body')?.removeAttribute('style')
    }
  }, [])
  return (
    <>
      <Banner />
      <TokenInformation />
      {poolInfo && <PoolDetail poolInfo={poolInfo} />}
      <ArtistsList />
      <ArtistsInformation />
      <FooterPc isDark={false} />
      <Goback />
    </>
  )
}

export default NftLottery
