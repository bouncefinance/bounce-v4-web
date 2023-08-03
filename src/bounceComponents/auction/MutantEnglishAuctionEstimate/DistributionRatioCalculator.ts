import BigNumber from 'bignumber.js'
BigNumber.config({ EXPONENTIAL_AT: [-10, 40] })

export interface IDistributionRatioCalculatorItem {
  position: number
  curPrice: BigNumber
  platformOnceFees: BigNumber
  platformTotalFees: BigNumber
  creatorOnceShare: BigNumber
  creatorTotalShare: BigNumber
  creatorReceiveTotal: BigNumber
  prevParticipantShare: BigNumber
  winnerOnceShare: BigNumber
  winnerShare: BigNumber
}

export class DistributionRatioCalculator {
  private _startPrice: number | string
  private _incrRate: number | string
  private _creatorShareRatio: number | string
  private _prevParticipantShareRatio: number | string
  private _winnerShareRatio: number | string

  private _platformFeesRate: number | string = 0.006

  constructor(
    startPrice: number | string,
    incrRate: number | string,
    creatorShareRatio: number | string,
    prevParticipantShareRatio: number | string,
    winnerShareRatio: number | string
  ) {
    this._startPrice = startPrice
    this._incrRate = incrRate
    this._creatorShareRatio = creatorShareRatio
    this._prevParticipantShareRatio = prevParticipantShareRatio
    this._winnerShareRatio = winnerShareRatio
  }

  public get startPrice() {
    return this._startPrice
  }

  public get incrRate() {
    return this._incrRate
  }

  public get creatorShareRatio() {
    return this._creatorShareRatio
  }

  public get prevParticipantShareRatio() {
    return this._prevParticipantShareRatio
  }

  public get winnerShareRatio() {
    return this._winnerShareRatio
  }

  public get platformFeesRate() {
    return this._platformFeesRate
  }

  public setPlatformFeesRate(platformFeesRate: number | string) {
    this._platformFeesRate = platformFeesRate
  }

  public setStartPrice(startPrice: number | string) {
    this._startPrice = startPrice
  }
  public setIncrRate(incrRate: number | string) {
    this._incrRate = incrRate
  }
  public setCreatorShareRatio(creatorShareRatio: number | string) {
    this._creatorShareRatio = creatorShareRatio
  }
  public setPrevParticipantShareRatio(prevParticipantShareRatio: number | string) {
    this._prevParticipantShareRatio = prevParticipantShareRatio
  }
  public setWinnerShareRatio(winnerShareRatio: number | string) {
    this._winnerShareRatio = winnerShareRatio
  }

  public estimateDistributionResult(len = 10) {
    let prevItem: IDistributionRatioCalculatorItem | null = null
    const ret: IDistributionRatioCalculatorItem[] = []
    for (let index = 0; index < len; index++) {
      if (index === 0) {
        const curPriceBN = new BigNumber(this.startPrice)
        const platformOnceFees = curPriceBN.multipliedBy(this.platformFeesRate)
        const item: IDistributionRatioCalculatorItem = {
          position: index + 1,
          curPrice: curPriceBN,
          platformOnceFees: platformOnceFees,
          platformTotalFees: platformOnceFees,
          creatorOnceShare: new BigNumber(0),
          creatorTotalShare: new BigNumber(0),
          creatorReceiveTotal: curPriceBN.minus(platformOnceFees),
          prevParticipantShare: new BigNumber(0),
          winnerOnceShare: new BigNumber(0),
          winnerShare: new BigNumber(0)
        }
        prevItem = item
        ret.push(item)
      } else {
        if (!prevItem) throw new Error('PrevItem Error')
        const curPriceBN = new BigNumber(prevItem.curPrice).multipliedBy(new BigNumber(this.incrRate).plus(1))
        const platformOnceFees = curPriceBN.multipliedBy(this.platformFeesRate)

        const remainder = curPriceBN.minus(prevItem.curPrice).minus(platformOnceFees)
        const creatorOnceShare = remainder.multipliedBy(this.creatorShareRatio)
        const prevParticipantShare = remainder.multipliedBy(this.prevParticipantShareRatio)
        const winnerOnceShare = remainder.multipliedBy(this.winnerShareRatio)

        const item: IDistributionRatioCalculatorItem = {
          position: index + 1,
          curPrice: curPriceBN,
          platformOnceFees,
          platformTotalFees: prevItem.platformTotalFees.plus(platformOnceFees),
          creatorOnceShare,
          creatorTotalShare: prevItem.creatorTotalShare.plus(creatorOnceShare),
          creatorReceiveTotal: prevItem.creatorReceiveTotal.plus(creatorOnceShare),
          prevParticipantShare,
          winnerOnceShare,
          winnerShare: prevItem.winnerShare.plus(winnerOnceShare)
        }
        prevItem = item
        ret.push(item)
      }
    }
    return ret
  }

  public estimateDistributionToFixed(len = 10, decimalPlaces?: number | undefined) {
    const list = this.estimateDistributionResult(len)
    return list.map(item => ({
      position: item.position,
      curPrice: item.curPrice.toFormat(decimalPlaces),
      platformOnceFees: item.platformTotalFees.toFormat(decimalPlaces),
      platformTotalFees: item.platformTotalFees.toFormat(decimalPlaces),
      creatorOnceShare: item.creatorOnceShare.toFormat(decimalPlaces),
      creatorTotalShare: item.creatorTotalShare.toFormat(decimalPlaces),
      creatorReceiveTotal: item.creatorReceiveTotal.toFormat(decimalPlaces),
      prevParticipantShare: item.prevParticipantShare.toFormat(decimalPlaces),
      winnerOnceShare: item.winnerOnceShare.toFormat(decimalPlaces),
      winnerShare: item.winnerShare.toFormat(decimalPlaces)
    }))
  }
}
