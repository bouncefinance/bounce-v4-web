import Icon1 from 'assets/imgs/nftLottery/tokenInformation/token-icon1.svg'
import Icon2 from 'assets/imgs/nftLottery/tokenInformation/token-icon2.svg'
import Icon3 from 'assets/imgs/nftLottery/tokenInformation/token-icon3.svg'
import Icon4 from 'assets/imgs/nftLottery/tokenInformation/token-icon4.svg'
import Icon5 from 'assets/imgs/nftLottery/tokenInformation/token-icon5.png'
import Icon6 from 'assets/imgs/nftLottery/tokenInformation/bdid.png'

export const colorList = ['#CCC496', '#DBAC48', '#AB883C', '#9E9871', '#9E7871', '#614C1F']
export const muColorList = ['#7966E7', '#90BE6D', '#3F90FF', '#0BFFDA', '#0BF1DA', '#51DCF6']
export const iconList: { [key in string]: string } = {
  AUCTION: Icon1,
  MUBI: Icon2,
  DAII: Icon3,
  BSSB: Icon4,
  BDID: Icon6,
  AMMX: Icon5
}
export function getIcon(name: string | undefined) {
  if (name) {
    if (iconList[name.toUpperCase()] === undefined) {
      return null
    } else {
      return iconList[name.toUpperCase()]
    }
  } else {
    return null
  }
}
