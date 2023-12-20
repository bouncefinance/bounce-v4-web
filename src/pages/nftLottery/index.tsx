import Banner from './sections/banner/index'
import ArtistsList from './sections/artistsList'
import ArtistsInformation from './sections/artistsInformation'
import TokenInformation from './sections/tokenInformation'
import PoolDetail from './sections/poolDetail'
import FooterPc from 'components/Footer/FooterPc'
import useBreakpoint from 'hooks/useBreakpoint'
const NftLottery = () => {
  const isSm = useBreakpoint('sm')
  return (
    <>
      <Banner />
      {!isSm && (
        <>
          <TokenInformation />
          <PoolDetail />
        </>
      )}
      <ArtistsList />
      <ArtistsInformation />
      <FooterPc isDark={false} />
    </>
  )
}

export default NftLottery
