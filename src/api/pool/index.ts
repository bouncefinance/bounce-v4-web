import { ApiInstance, BotApiInstance } from '..'
import {
  GetPoolCreationSignatureParams,
  GetPoolCreationSignatureResponse,
  GetPoolHistoryParams,
  GetPoolHistoryResponse,
  GetPoolInfoParams,
  GetPoolInfoResponse,
  GetWhitelistMerkleTreeRootParams,
  GetWhitelistMerkleTreeRootResponse,
  UpdateAuctionBackgroundParams,
  GetWinnersListParams,
  GetWinnersListResponse,
  BindTgTokenApiParams
} from './type'

/**
 * Get signature for auction pool creation
 */
export const getPoolCreationSignature = (params: GetPoolCreationSignatureParams) => {
  return ApiInstance.post<GetPoolCreationSignatureResponse>('/user/create_pool_sign', params)
}

/**
 * Get signature for bot auction pool creation
 */
export const getBotPoolCreationSignature = (params: GetPoolCreationSignatureParams) => {
  return BotApiInstance.post<GetPoolCreationSignatureResponse>('/bot/create_pool_sign', params)
}

/**
 * bind tg token_api
 */
export const bindTgTokenApi = (params: BindTgTokenApiParams) => {
  return ApiInstance.post('/user/tg_token/bind', params)
}

/**
 * Get merkle tree root of whitelist
 */
export const getWhitelistMerkleTreeRoot = (params: GetWhitelistMerkleTreeRootParams) => {
  return ApiInstance.post<GetWhitelistMerkleTreeRootResponse>('/user/import_whitelist', params)
}

/**
 * Get merkle tree root of whitelist
 */
export const getTgWhitelistMerkleTreeRoot = (params: GetWhitelistMerkleTreeRootParams) => {
  return BotApiInstance.post<GetWhitelistMerkleTreeRootResponse>('/bot/import_whitelist', params)
}

/**
 * Get info of single pool
 */
export const getPoolInfo = (params: GetPoolInfoParams) => {
  return ApiInstance.post<GetPoolInfoResponse>('/pools/pool', params)
}

/**
 * Get info of single pool
 */
export const getPoolHistory = (params: GetPoolHistoryParams) => {
  return ApiInstance.post<GetPoolHistoryResponse>('/pools/pool/activities', params)
}
/**
 * Get winners list for random selection pool
 */
export const getWinnersList = (params: GetWinnersListParams) => {
  return ApiInstance.post<GetWinnersListResponse>('/pools/pool/lottery/winners', params)
}
/**
 * Update auction background.
 * @param {Object} params
 * @param {number} employee.id -  ID of auction pool to be updated.
 * @param {string} employee.description - New description.
 * @param {Object[]} employee.posts - New files.
 */
export const updateAuctionBackground = (params: UpdateAuctionBackgroundParams) => {
  return ApiInstance.post('/user/update_pool', params)
}
