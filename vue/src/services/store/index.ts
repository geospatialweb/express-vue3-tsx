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
import { LogState, LogStatus, ReactiveState as ReactiveStates, StaticState as StaticStates } from '@/enums'
import {
  IApp,
  IDeckglViewSetting,
  IHexagonLayerProp,
  IHexagonUILabelElement,
  ILayerElement,
  ILayerVisibility,
  ILogState,
  ILogStatus,
  IMapStyle,
  IMapboxSetting,
  IMarkerVisibility,
  IModal,
  IReactiveState,
  IStaticState
} from '@/interfaces'
import { LogService } from '@/services'
import { ReactiveState, StaticState } from '@/types'

@Service()
export default class StoreService {
  private _app: IApp
  private _deckglViewSettings: IDeckglViewSetting
  private _hexagonLayerProps: IHexagonLayerProp
  private _hexagonUILabelElement: IHexagonUILabelElement
  private _layerElements: ILayerElement[]
  private _layerVisibility: ILayerVisibility
  private _logStates: ILogState
  private _logStatus: ILogStatus
  private _mapStyles: IMapStyle[]
  private _mapboxSettings: IMapboxSetting
  private _markerVisibility: IMarkerVisibility
  private _modal: IModal
  private _reactiveState: Record<string, ReactiveState>
  private _reactiveStates: IReactiveState
  private _staticState: Record<string, StaticState>
  private _staticStates: IStaticState
  private _logService: LogService

  constructor() {
    this._app = cloneDeep(app)
    this._deckglViewSettings = cloneDeep(deckgl.settings)
    this._hexagonLayerProps = cloneDeep(hexagonLayer.reactiveProps)
    this._hexagonUILabelElement = cloneDeep(hexagonUILabelElement)
    this._layerElements = cloneDeep(layerElements)
    this._layerVisibility = cloneDeep(layerVisibility)
    this._logStates = LogState
    this._logStatus = LogStatus
    this._mapStyles = cloneDeep(mapbox.styles)
    this._mapboxSettings = cloneDeep(mapbox.settings)
    this._markerVisibility = cloneDeep(markerVisibility)
    this._modal = cloneDeep(modal)
    this._reactiveState = {}
    this._reactiveStates = ReactiveStates
    this._staticState = {}
    this._staticStates = StaticStates
    this._logService = Container.get(LogService)
    this._createReactiveState()
    this._createStaticState()
  }

  getReactiveState(state: string): ReactiveState {
    return cloneDeep(this._reactiveState[state])
  }

  setReactiveState(state: string, payload: ReactiveState): void {
    const { REACTIVE } = this._logStates
    const { NEW, OLD } = this._logStatus
    this._logState({ logState: REACTIVE, state, status: OLD })
    this._reactiveState[state] = cloneDeep(payload)
    this._logState({ logState: REACTIVE, state, status: NEW })
  }

  getStaticState(state: string): StaticState {
    return cloneDeep(this._staticState[state])
  }

  setStaticState(state: string, payload: StaticState): void {
    const { STATIC } = this._logStates
    const { NEW, OLD } = this._logStatus
    this._logState({ logState: STATIC, state, status: OLD })
    this._staticState[state] = cloneDeep(payload)
    this._logState({ logState: STATIC, state, status: NEW })
  }

  private _createReactiveState(): void {
    const { HEXAGON_LAYER_PROPS, HEXAGON_UI_LABEL_ELEMENT, LAYER_ELEMENTS, MODAL } = this._reactiveStates
    this._reactiveState = reactive({
      [HEXAGON_LAYER_PROPS]: this._hexagonLayerProps,
      [HEXAGON_UI_LABEL_ELEMENT]: this._hexagonUILabelElement,
      [LAYER_ELEMENTS]: this._layerElements,
      [MODAL]: this._modal
    })
  }

  private _createStaticState(): void {
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

  private _logState({ logState, state, status }: Record<string, string>): void {
    const { REACTIVE } = this._logStates
    const message = `${state} ${status} state:`
    this._logService.consoleLog(
      message,
      logState === REACTIVE ? this.getReactiveState(state) : this.getStaticState(state)
    )
  }
}
