import cloneDeep from 'lodash.clonedeep'
import { Container, Service } from 'typedi'
import { reactive } from 'vue'

import {
  app,
  deckgl,
  hexagonLayer,
  hexagonUILabelElement,
  layerElements,
  layerVisibility,
  mapbox,
  markerVisibility,
  modal
} from '@/configuration'
import { LogStates, LogStatus, ReactiveStates, StaticStates } from '@/enums'
import {
  IApp,
  IDeckglViewSettings,
  IHexagonLayerProps,
  IHexagonUILabelElement,
  ILayerElement,
  ILayerVisibility,
  IMapStyle,
  IMapboxSettings,
  IMarkerVisibility,
  IModal
} from '@/interfaces'
import { LogService } from '@/services'
import { ReactiveState, StaticState } from '@/types'

@Service()
export default class StoreService {
  private _app: IApp = cloneDeep(app)
  private _deckglViewSettings: IDeckglViewSettings = cloneDeep(deckgl.settings)
  private _hexagonLayerProps: IHexagonLayerProps = cloneDeep(hexagonLayer.reactiveProps)
  private _hexagonUILabelElement: IHexagonUILabelElement = cloneDeep(hexagonUILabelElement)
  private _layerElements: Array<ILayerElement> = cloneDeep(layerElements)
  private _layerVisibility: ILayerVisibility = cloneDeep(layerVisibility)
  private _logStates: Record<string, string> = LogStates
  private _logStatus: Record<string, string> = LogStatus
  private _mapStyles: Array<IMapStyle> = cloneDeep(mapbox.styles)
  private _mapboxSettings: IMapboxSettings = cloneDeep(mapbox.settings)
  private _markerVisibility: IMarkerVisibility = cloneDeep(markerVisibility)
  private _modal: IModal = cloneDeep(modal)
  private _reactiveState: Record<string, ReactiveState> = {}
  private _reactiveStates: Record<string, string> = ReactiveStates
  private _staticState: Record<string, StaticState> = {}
  private _staticStates: Record<string, string> = StaticStates

  constructor(private _logService: LogService) {
    this._logService = Container.get(LogService)
    this.createReactiveState()
    this.createStaticState()
  }

  getReactiveState(state: string): ReactiveState {
    return cloneDeep(this._reactiveState[state])
  }

  setReactiveState(state: string, payload: ReactiveState): void {
    const { REACTIVE } = this._logStates
    const { NEW, OLD } = this._logStatus
    this.logState({ logState: REACTIVE, state, status: OLD })
    this._reactiveState[state] = cloneDeep(payload)
    this.logState({ logState: REACTIVE, state, status: NEW })
  }

  getStaticState(state: string): StaticState {
    return cloneDeep(this._staticState[state])
  }

  setStaticState(state: string, payload: StaticState): void {
    const { STATIC } = this._logStates
    const { NEW, OLD } = this._logStatus
    this.logState({ logState: STATIC, state, status: OLD })
    this._staticState[state] = cloneDeep(payload)
    this.logState({ logState: STATIC, state, status: NEW })
  }

  private createReactiveState(): void {
    const { HEXAGON_LAYER_PROPS, HEXAGON_UI_LABEL_ELEMENT, LAYER_ELEMENTS, MODAL } = this._reactiveStates
    this._reactiveState = reactive({
      [HEXAGON_LAYER_PROPS]: this._hexagonLayerProps,
      [HEXAGON_UI_LABEL_ELEMENT]: this._hexagonUILabelElement,
      [LAYER_ELEMENTS]: this._layerElements,
      [MODAL]: this._modal
    })
  }

  private createStaticState(): void {
    const { APP, DECKGL_VIEW_SETTINGS, LAYER_VISIBILITY, MAP_STYLES, MAPBOX_SETTINGS, MARKER_VISIBILITY } =
      this._staticStates
    this._staticState = {
      [APP]: this._app,
      [DECKGL_VIEW_SETTINGS]: this._deckglViewSettings,
      [LAYER_VISIBILITY]: this._layerVisibility,
      [MAP_STYLES]: this._mapStyles,
      [MAPBOX_SETTINGS]: this._mapboxSettings,
      [MARKER_VISIBILITY]: this._markerVisibility
    }
  }

  private logState({ logState, state, status }: Record<string, string>): void {
    const { REACTIVE } = this._logStates
    const message = `${state} ${status} state:`
    this._logService.consoleLog(
      message,
      logState === REACTIVE ? this.getReactiveState(state) : this.getStaticState(state)
    )
  }
}
