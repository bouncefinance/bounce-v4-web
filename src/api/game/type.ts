interface RankItem {
  address: string
  avatar: string
  name: string
  score: string
  rank: number
  userId?: string
}
export interface IRankResponse {
  list: RankItem[]
  total: number
}
export interface IAllRankParams {
  payableId: number
}
export interface IScoreParams {
  address: string
  message: string
  payableId: number
  signature: string
}
