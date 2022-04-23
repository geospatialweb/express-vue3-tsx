import { Container, Service } from 'typedi'

import { ReactiveState } from '@/enums'
import { IModal, IReactiveState } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class ModalService {
  private _reactiveStates: IReactiveState
  private _storeService: StoreService

  constructor() {
    this._reactiveStates = ReactiveState
    this._storeService = Container.get(StoreService)
  }

  get state(): IModal {
    const { MODAL } = this._reactiveStates
    return <IModal>this._storeService.getReactiveState(MODAL)
  }

  private set _state(modal: IModal) {
    const { MODAL } = this._reactiveStates
    this._storeService.setReactiveState(MODAL, modal)
  }

  hideModal(): void {
    this.state.isActive && this._setModalState()
  }

  showModal(): void {
    !this.state.isActive && this._setModalState()
  }

  private _setModalState(): void {
    const state = this.state
    state.isActive = !state.isActive
    this._state = state
  }
}
