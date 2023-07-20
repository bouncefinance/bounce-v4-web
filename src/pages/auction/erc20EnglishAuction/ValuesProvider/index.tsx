import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { useErc20EnglishAuctionInfo } from 'bounceHooks/auction/useErc20EnglishAuctionInfo'
import usePrevious from 'hooks/usePrevious'
import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'
import { isEqual } from 'lodash'
interface IContent {
  loading: boolean
  run: () => void
  data: Erc20EnglishAuctionPoolProp | undefined
}

const ValuesStateContext = createContext<IContent | null>(null)
// const ValuesDispatchContext = createContext<Dispatch<any> | null>(null)

const useValuesState = () => {
  const context = useContext(ValuesStateContext)
  if (!context) {
    throw new Error('useValuesState must be used within ValuesStateContext')
  }
  return context
}

// const useValuesDispatch = () => {
//   const context = useContext(ValuesDispatchContext)
//   if (!context) {
//     throw new Error('useValuesDispatch must be used within ValuesDispatchContext')
//   }
//   return context
// }

enum ActionType {
  SET_POOL = 'SET_POOL'
}

type Payload = {
  [ActionType.SET_POOL]: IContent
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

type Actions = ActionMap<Payload>[keyof ActionMap<Payload>]

const reducer = (
  state: {
    loading: boolean
    run: () => void
    data: Erc20EnglishAuctionPoolProp | undefined
  },
  action: Actions
) => {
  switch (action.type) {
    case ActionType.SET_POOL:
      return {
        loading: action.payload.loading,
        run: action.payload.run,
        data: action.payload.data
      }
    default:
      return state
  }
}
const initialValues: IContent = {
  loading: true,
  run: () => {},
  data: undefined
}

export function useErc20EnglishAuctionPoolInfo() {
  const valuesState = useValuesState()
  return valuesState
}

const EnglishAuctionValuesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const { poolInfo: data, run, loading } = useErc20EnglishAuctionInfo()
  const prevData = usePrevious(data)

  useEffect(() => {
    if (isEqual(prevData, data)) return
    dispatch({
      type: ActionType.SET_POOL,
      payload: {
        data,
        run,
        loading
      }
    })
  }, [data, loading, prevData, run])

  return <ValuesStateContext.Provider value={state}>{children}</ValuesStateContext.Provider>
}

export default EnglishAuctionValuesProvider
