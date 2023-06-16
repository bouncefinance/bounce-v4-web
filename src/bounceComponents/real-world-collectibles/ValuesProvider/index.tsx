import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react'
import { RealWorldPool } from '../types'

const ValuesStateContext = createContext<RealWorldPool | null>(null)
const ValuesDispatchContext = createContext<Dispatch<any> | null>(null)

export const useValuesState = () => {
  const context = useContext(ValuesStateContext)
  if (!context) {
    throw new Error('useValuesState must be used within ValuesStateContext')
  }
  return context
}

export const useValuesDispatch = () => {
  const context = useContext(ValuesDispatchContext)
  if (!context) {
    throw new Error('useValuesDispatch must be used within ValuesDispatchContext')
  }
  return context
}

const initialValues: RealWorldPool = {
  categories: '',
  status: '',
  range: '',
  min: '',
  max: '',
  keyword: ''
}

export enum ActionType {
  SetCategories = 'SET_CATEGORIES',
  SetRange = 'SET_RANGE',
  SetMin = 'SET_MIN',
  SetMax = 'SET_MAX',
  SetStatus = 'SET_STATUS',
  SetKeyword = 'SET_KEY_WORD',
  ClearParams = 'CLEAR_PARAMS'
}

type Payload = {
  [ActionType.SetCategories]: {
    categories: string
  }
  [ActionType.SetRange]: {
    range: string
  }
  [ActionType.SetMin]: {
    min: string
  }
  [ActionType.SetMax]: {
    max: string
  }
  [ActionType.SetStatus]: {
    status: string
  }
  [ActionType.SetKeyword]: {
    keyword: string
  }
  [ActionType.ClearParams]: {
    categories: string
    status: string
    range: string
    min: string
    max: string
    keyword: string
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

const reducer = (state: RealWorldPool, action: Actions) => {
  console.log('action: ', action)
  switch (action.type) {
    case ActionType.SetCategories:
      return {
        ...state,
        categories: action.payload.categories
      }
    case ActionType.SetRange:
      return {
        ...state,
        range: action.payload.range
      }
    case ActionType.SetMax:
      return {
        ...state,
        max: action.payload.max
      }
    case ActionType.SetMin:
      return {
        ...state,
        min: action.payload.min
      }
    case ActionType.SetStatus:
      return {
        ...state,
        status: action.payload.status
      }
    case ActionType.SetKeyword:
      return {
        ...state,
        keyword: action.payload.keyword
      }
    case ActionType.ClearParams:
      return {
        ...state,
        categories: '',
        status: '',
        range: '',
        min: '',
        max: '',
        keyword: ''
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
