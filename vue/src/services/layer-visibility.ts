import { Container, Service } from 'typedi'

import { LayerElements, StaticStates } from '@/enums'
import { ILayerVisibility } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class LayerVisibilityService {
  private _layerElements: Record<string, string> = LayerElements
  private _staticStates: Record<string, string> = StaticStates

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  get state(): ILayerVisibility {
    const { LAYER_VISIBILITY } = this._staticStates
    return <ILayerVisibility>this._storeService.getStaticState(LAYER_VISIBILITY)
  }

  private set _state(layers: ILayerVisibility) {
    const { LAYER_VISIBILITY } = this._staticStates
    this._storeService.setStaticState(LAYER_VISIBILITY, layers)
  }

  setLayerVisibilityState(id: string): void {
    const { BIOSPHERE, BIOSPHERE_BORDER } = this._layerElements
    const state = this.state
    state[id as keyof ILayerVisibility].isActive = !state[id as keyof ILayerVisibility].isActive
    if (id === BIOSPHERE) {
      state[BIOSPHERE_BORDER as keyof ILayerVisibility].isActive =
        !state[BIOSPHERE_BORDER as keyof ILayerVisibility].isActive
    }
    this._state = state
  }
}
