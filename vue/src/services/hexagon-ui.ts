import { Container, Service } from 'typedi'

import { ReactiveStates } from '@/enums'
import { IHexagonUILabelElement } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class HexagonUIService {
  private _reactiveStates: Record<string, string> = ReactiveStates

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  get state(): IHexagonUILabelElement {
    const { HEXAGON_UI_LABEL_ELEMENT } = this._reactiveStates
    return <IHexagonUILabelElement>this._storeService.getReactiveState(HEXAGON_UI_LABEL_ELEMENT)
  }

  private set _state(labelElement: IHexagonUILabelElement) {
    const { HEXAGON_UI_LABEL_ELEMENT } = this._reactiveStates
    this._storeService.setReactiveState(HEXAGON_UI_LABEL_ELEMENT, labelElement)
  }

  setHexagonUILabelElementState(id: string): void {
    const state = this.state
    state[id as keyof IHexagonUILabelElement] = !state[id as keyof IHexagonUILabelElement]
    this._state = state
  }
}
