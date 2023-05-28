export interface ResOptionsData {
  chainInfoOpt: [{ chainName: string; chain_type: number; ethChainId: number; id: number; shortName: string }]
  companySizeOpt: [{ id: number; size: string }]
  companyStateOpt: [{ id: number; state: string }]
  degreeOpt: [{ degree: string; id: number }]
  experienceYearOpt: [{ years: string; id: number }]
  investmentTypeOpt: [{ investment_type: string; id: number }]
  investorTypeOpt: [{ investorType: string; id: number }]
  jobCareOpt: [{ jobCare: string; id: number }]
  jobStateOpt: [{ state: string; id: number }]
  jobTypeOpt: [{ jobType: string; id: number }]
  marketTypeOpt: [{ marketType: string; id: number }]
  primaryRoleOpt: [{ level1Name: string; child: [{ id: number; level2Name: string }] }]
  publicRoleOpt: [{ id: number; role: string }]
  serviceCategoryOpt: [{ id: number; category: string }]
}

export interface IsearchEduInfoParams {
  limit: number
  offset: number
  value: string
}

export interface ISearchUserParams {
  limit: number
  offset: number
  userType: number
  value: string
}

export interface ISearchUserPoolParams {
  limit: number
  offset: number
  value: string
}

export interface ISearchCreator {
  limit: number
  offset: number
  creatorName: string
}
