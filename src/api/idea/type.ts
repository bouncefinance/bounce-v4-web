import { USER_TYPE } from '../user/type'
import { VerifyStatus } from '../profile/type'
import { IFile } from 'bounceComponents/common/Uploader'

export interface IUpdateIdeaParams {
  detail: string
  id: number
  marketType: number
  posts: IFile[]
  summary: string
  title: string
  userId?: number
  userType?: USER_TYPE
}

export interface IIdeaDetail extends IUpdateIdeaParams {
  likeCount: number
  dislikeCount: number
  myLike: number
  myDislike: number
}

export interface ILikeUnlikeParams {
  likeType: LIKE_TYPE
  likeObj: LIKE_OBJ
  objId: number
}
export interface CollectToggleParams {
  collected: boolean
  collectionId: number
  collectionType: 1 | 2 | 3 //1:job, 2:portfolio 3:pool
}

export interface ILikeUnlikeRes {
  dislikeCount: number
  likeCount: number
  myDislike: UNLIKE_STATUS
  myLike: LIKE_STATUS
}

export enum LIKE_TYPE {
  like = 1,
  cancelLike = 2,
  dislike = 3,
  cancelDislike = 4
}

export enum LIKE_OBJ {
  company = 1,
  thirdpartCompany = 2,
  idea = 3,
  pool = 4
}

export enum LIKE_STATUS {
  no = 1,
  yes = 2
}

export enum UNLIKE_STATUS {
  no = 1,
  yes = 2
}

export interface IIdeasListParams {
  UserId: number
  limit: number
  offset: number
  marketType?: number
}

export interface IIdeasListItems<ListType> {
  total: number
  list: ListType[]
}
export interface IIdeasListData {
  FullName: string
  active: number
  avatar: string
  bio: string
  commentCount: number
  dislikeCount: number
  id: number
  likeCount: number
  marketType: number
  myDislike: UNLIKE_STATUS
  myLike: LIKE_STATUS
  publicRole: number[]
  startup: number
  thirdpartId: number
  summary: string
  title: string
  userType: USER_TYPE
  ifKyc: VerifyStatus
  companyState?: number
}
