import { Alchemy } from 'alchemy-sdk'
import getAlchemyNetwork from '../utils/getAlchemyNetwork'

export const getAlchemy = (chainId: number) => {
  const network = getAlchemyNetwork(chainId)

  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_KEY,
    network
  }
  const alchemy = new Alchemy(config)
  return alchemy
}
