import CoingeckoSVG from 'assets/imgs/chains/coingecko.svg'
import ErrorSVG from 'assets/imgs/icon/error_outline.svg'
import { ChainId } from 'constants/chain'
import { useCertifiedTokenAddress } from 'hooks/useCertifiedTokenAddress'
import Image from 'components/Image'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'

export default function CertifiedTokenImage({
  coingeckoId,
  backedChainId,
  ethChainId,
  address
}: {
  coingeckoId: string
  ethChainId?: ChainId
  backedChainId?: number
  address: string
}) {
  const chainConfigInBackend = useChainConfigInBackend('id', backedChainId || '')
  const isCertifiedAddress = useCertifiedTokenAddress(
    ethChainId || chainConfigInBackend?.ethChainId || undefined,
    address
  )

  return coingeckoId ? (
    <Image src={CoingeckoSVG} width={20} height={20} alt="coingecko" />
  ) : isCertifiedAddress ? (
    <CheckCircleOutlineIcon color="success" />
  ) : (
    <Image src={ErrorSVG} width={20} height={20} alt="Dangerous" />
  )
}
