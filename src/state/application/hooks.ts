import { ChainId } from 'constants/chain'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveWeb3React } from '../../hooks'
import { AppDispatch, AppState } from '../index'
import {
  addPopup,
  ApplicationModal,
  PopupContent,
  removePopup,
  setCurrentConnectedAccount,
  setCurrentRegion,
  setOpenModal
} from './actions'

export function useBlockNumber(chainId?: ChainId): number | undefined {
  const { chainId: curChainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.application.blockNumber[chainId || curChainId || -1])
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal])
}

const isBlockAll = false
const BlockPoolIds: { [key in ChainId]?: string[] } = {
  [ChainId.BSC]: ['34']
}
export function useCurrentRegionBlock(chainId?: ChainId, poolId?: string) {
  const currentRegion = useSelector((state: AppState) => state.application.currentRegion)
  return useMemo(() => {
    return isBlockAll ? currentRegion === 'US' : chainId && poolId && BlockPoolIds?.[chainId]?.includes(poolId)
  }, [chainId, currentRegion, poolId])
}

export function useSetCurrentRegion() {
  const dispatch = useDispatch()

  return useCallback(
    (val: string | null) => {
      dispatch(setCurrentRegion({ val }))
    },
    [dispatch]
  )
}

export function useCloseModals(): () => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(null)), [dispatch])
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}

export function useSwitchNetworkModalToggle(): () => void {
  return useToggleModal(ApplicationModal.SWITCH_NETWORK)
}

export function useSignLoginModalToggle(): () => void {
  return useToggleModal(ApplicationModal.SIGN_LOGIN)
}

export function useSettingsModalToggle(): () => void {
  return useToggleModal(ApplicationModal.SETTINGS)
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch()

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }))
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch]
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter(item => item.show), [list])
}

export function useSetCurrentConnectedAddress() {
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentConnectedAccount({ account: account || null }))
  }, [account, dispatch])
}
