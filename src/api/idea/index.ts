import { ApiInstance } from '..'
import { CollectToggleParams, IIdeasListParams, ILikeUnlikeParams, IUpdateIdeaParams } from './type'

//
export const createUpdateIdea = (body: IUpdateIdeaParams) => {
  return ApiInstance.post('/user/update_idea', body)
}

//
export const getIdeaDetail = (body: { ideaId: number }) => {
  return ApiInstance.post('/user/idea', body)
}

//
export const deleteIdea = (body: { ideaId: number }) => {
  return ApiInstance.post('/user/delete_idea', body)
}

export const likeAndUnlike = (body: ILikeUnlikeParams) => {
  return ApiInstance.post('/user/like', body)
}

export const collectToggle = (body: CollectToggleParams) => {
  return ApiInstance.post('/user/collect', body)
}

export const getIdeasList = (body: IIdeasListParams) => {
  return ApiInstance.post('/com/search/idea', body)
}
