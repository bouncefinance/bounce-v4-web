import { Token } from 'bounceComponents/fixed-swap/type'
import { ChainId, NETWORK_CHAIN_ID } from 'constants/chain'
import { Currency } from 'constants/token'
import { useQueryParams } from 'hooks/useQueryParams'
import { Moment } from 'moment'
import { createContext, Dispatch, ReactNode, useContext, useMemo, useReducer } from 'react'
import { isAddress } from 'utils'
import {
  AllocationStatus,
  AuctionPool,
  CompletedSteps,
  NFTToken,
  ParticipantStatus,
  TokenType,
  AuctionType,
  IReleaseType,
  IReleaseData
} from '../types'

const ValuesStateContext = createContext<AuctionPool | null>(null)
const ValuesDispatchContext = createContext<Dispatch<any> | null>(null)

export const useValuesState = () => {
  const context = useContext(ValuesStateContext)
  if (!context) {
    throw new Error('useValuesState must be used within ValuesStateContext')
  }
  return context
}

export const useAuctionERC20Currency = () => {
  const { tokenFrom, tokenTo } = useValuesState()

  const makeCurrency = (_token: Token) => {
    if (isAddress(_token.address) && _token.chainId && _token.decimals) {
      return new Currency(
        _token.chainId,
        _token.address,
        _token.decimals,
        _token.symbol,
        _token.name,
        _token.logoURI,
        _token.dangerous
      )
    }
    return undefined
  }

  return useMemo(
    () => ({
      currencyFrom: makeCurrency(tokenFrom),
      currencyTo: makeCurrency(tokenTo)
    }),
    [tokenFrom, tokenTo]
  )
}

export const useAuctionInChain = () => {
  const { chainIdOrName } = useQueryParams()
  return useMemo(() => {
    if (!chainIdOrName || Number.isNaN(Number(chainIdOrName))) {
      throw new Error('Route error')
    }
    return Number(chainIdOrName) as ChainId
  }, [chainIdOrName])
}

export const useValuesDispatch = () => {
  const context = useContext(ValuesDispatchContext)
  if (!context) {
    throw new Error('useValuesDispatch must be used within ValuesDispatchContext')
  }
  return context
}

const initialValues: AuctionPool = {
  tokenType: TokenType.ERC20,
  priceFloor: '',
  amountMinIncr1: '',
  tokenFrom: {
    chainId: NETWORK_CHAIN_ID,
    address: '',
    logoURI: '',
    symbol: '',
    decimals: 18
  },
  auctionChainId: '',
  nft721TokenFrom: [],
  nftTokenFrom: {
    contractAddr: '',
    contractName: '',
    tokenId: '',
    balance: '',
    name: '',
    description: '',
    image: ''
  },
  tokenTo: {
    chainId: NETWORK_CHAIN_ID,
    address: '',
    logoURI: '',
    symbol: '',
    decimals: 18
  },
  swapRatio: '',
  poolSize: '',
  allocationPerWallet: '',
  allocationStatus: AllocationStatus.NoLimits,
  poolName: '',
  startTime: null,
  endTime: null,
  shouldDelayUnlocking: false,
  delayUnlockingTime: null,
  releaseType: IReleaseType.Cliff,
  releaseDataArr: [],
  whitelist: [],
  activeStep: 0,
  completed: {},
  participantStatus: ParticipantStatus.Public,
  auctionType: AuctionType.FIXED_PRICE,
  winnerNumber: 0,
  ticketPrice: '',
  enableReverse: true,
  maxParticipantAllowed: 0
}

export enum ActionType {
  SetActiveStep = 'SET_ACTIVE_STEP',
  SetTokenFrom = 'SET_TOKEN_FROM',
  SetTokenType = 'SET_TOKEN_TYPE',
  SetAuctionType = 'SET_AUCTION_TYPE',
  CommitTokenImformation = 'COMMIT_TOKEN_IMFORMATION',
  CommitToken1155Information = 'COMMIT_TOKEN_1155_INFORMATION',
  CommitToken721Information = 'COMMIT_TOKEN_721_INFORMATION',
  CommitAuctionParameters = 'COMMIT_AUCTION_PARAMETERS',
  CommitRandomSelectionAuctionParameters = 'COMMIT_RANDOM_SELECTION_AUCTION_PARAMETERS',
  CommitAdvancedSettings = 'COMMIT_ADVANCED_SETTINGS',
  HandleStep = 'HANDLE_STEP',
  SetWhitelist = 'SET_WHITELIST'
}

type Payload = {
  // [ActionType.SetActiveStep]: {
  //   activeStep: number
  //   completed: CompletedSteps
  // }
  [ActionType.SetAuctionType]: {
    auctionType: AuctionType
  }
  [ActionType.SetTokenType]: {
    tokenType: TokenType
  }
  [ActionType.SetTokenFrom]: {
    tokenFrom: Token
  }
  [ActionType.CommitTokenImformation]: {
    tokenFrom: Token
    activeStep: number
    completed: CompletedSteps
  }
  [ActionType.CommitToken721Information]: {
    nft721TokenFrom: NFTToken[]
    activeStep: number
    completed: CompletedSteps
  }
  [ActionType.CommitToken1155Information]: {
    nftTokenFrom: {
      contractAddr: string
      contractName: string
      tokenId: string
      balance: string
      name: string
      description: string
      image: string
    }
    activeStep: number
    completed: CompletedSteps
  }
  [ActionType.CommitAuctionParameters]: {
    tokenTo: Token
    swapRatio: string
    poolSize: string
    allocationStatus: AllocationStatus
    allocationPerWallet: string
    priceFloor?: string
    amountMinIncr1?: string
    activeStep: number
    completed: CompletedSteps
  }
  [ActionType.CommitRandomSelectionAuctionParameters]: {
    tokenTo: Token
    swapRatio: string
    activeStep: number
    completed: CompletedSteps
    ticketPrice: string
    winnerNumber: number
    maxParticipantAllowed: number
  }
  [ActionType.CommitAdvancedSettings]: {
    poolName: string
    startTime: Moment
    endTime: Moment
    delayUnlockingTime: Moment
    whitelist: string[]
    enableReverse: boolean
    participantStatus: ParticipantStatus
    shouldDelayUnlocking: boolean
    releaseType: IReleaseType
    releaseDataArr: IReleaseData[]
  }
  [ActionType.HandleStep]: {
    activeStep: number
  }
  [ActionType.SetWhitelist]: {
    whitelist: string[]
  }
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>]

const reducer = (state: AuctionPool, action: Actions) => {
  console.log('action: ', action)

  switch (action.type) {
    case ActionType.SetTokenFrom:
      return {
        ...state,
        tokenFrom: {
          ...state.tokenFrom,
          ...action.payload.tokenFrom
        }
      }
    case ActionType.SetTokenType:
      return {
        ...state,
        tokenType: action.payload.tokenType
      }
    case ActionType.CommitTokenImformation:
      return {
        ...state,
        tokenFrom: {
          ...state.tokenFrom,
          ...action.payload.tokenFrom
        },
        activeStep: state.activeStep + 1,
        completed: { ...state.completed, [state.activeStep]: true }
      }
    case ActionType.CommitToken721Information:
      return {
        ...state,
        nft721TokenFrom: action.payload.nft721TokenFrom,
        activeStep: state.activeStep + 1,
        completed: { ...state.completed, [state.activeStep]: true }
      }
    case ActionType.CommitToken1155Information:
      return {
        ...state,
        nftTokenFrom: {
          ...state.nftTokenFrom,
          ...action.payload.nftTokenFrom
        },
        activeStep: state.activeStep + 1,
        completed: { ...state.completed, [state.activeStep]: true }
      }
    case ActionType.CommitAuctionParameters:
      return {
        ...state,
        tokenTo: {
          ...state.tokenTo,
          ...action.payload.tokenTo
        },
        swapRatio: action.payload.swapRatio,
        poolSize: action.payload.poolSize,
        allocationStatus: action.payload.allocationStatus,
        priceFloor: action.payload.priceFloor,
        amountMinIncr1: action.payload.amountMinIncr1,
        allocationPerWallet: action.payload.allocationPerWallet,
        activeStep: state.activeStep + 1,
        completed: { ...state.completed, [state.activeStep]: true }
      }
    case ActionType.CommitRandomSelectionAuctionParameters:
      return {
        ...state,
        tokenTo: {
          ...state.tokenTo,
          ...action.payload.tokenTo
        },
        swapRatio: action.payload.swapRatio,
        ticketPrice: action.payload.ticketPrice,
        winnerNumber: action.payload.winnerNumber,
        maxParticipantAllowed: action.payload.maxParticipantAllowed,
        activeStep: state.activeStep + 1,
        completed: { ...state.completed, [state.activeStep]: true }
      }
    case ActionType.CommitAdvancedSettings:
      return {
        ...state,
        poolName: action.payload.poolName,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        whitelist: action.payload.whitelist,
        releaseType: action.payload.releaseType,
        releaseDataArr: action.payload.releaseDataArr,
        delayUnlockingTime: action.payload.delayUnlockingTime,
        enableReverse: action.payload.enableReverse === undefined ? true : action.payload.enableReverse || false,
        activeStep: state.activeStep + 1,
        completed: { ...state.completed, [state.activeStep]: true },
        participantStatus: action.payload.participantStatus,
        shouldDelayUnlocking: action.payload.shouldDelayUnlocking
      }

    case ActionType.HandleStep:
      return {
        ...state,
        activeStep: action.payload.activeStep,
        completed: { ...state.completed, [action.payload.activeStep]: false }
      }
    case ActionType.SetWhitelist:
      return {
        ...state,
        whitelist: action.payload.whitelist
      }
    case ActionType.SetAuctionType:
      return {
        ...state,
        auctionType: action.payload.auctionType
      }
    default:
      return state
  }
}

const ValuesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialValues)

  return (
    <ValuesStateContext.Provider value={state}>
      <ValuesDispatchContext.Provider value={dispatch}>{children}</ValuesDispatchContext.Provider>
    </ValuesStateContext.Provider>
  )
}

export default ValuesProvider
