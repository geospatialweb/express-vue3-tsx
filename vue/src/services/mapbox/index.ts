import { Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/configuration'
import { StaticState } from '@/enums'
import { IMapboxOption, IMapboxSetting, IStaticState, ITrail } from '@/interfaces'
import { MapStyleService, StoreService } from '@/services'
import { NavigationControlPosition } from '@/types'

@Service()
export default class MapboxService {
  private _map: Map
  private _navigationControl
  private _options: IMapboxOption
  private _staticStates: IStaticState
  private _mapStyleService: MapStyleService
  private _storeService: StoreService

  constructor() {
    this._navigationControl = mapbox.navigationControl
    this._options = mapbox.options
    this._staticStates = StaticState
    this._mapStyleService = Container.get(MapStyleService)
    this._storeService = Container.get(StoreService)
  }

  get map(): Map {
    return this._map
  }

  private get _state(): IMapboxSetting {
    const { MAPBOX_SETTINGS } = this._staticStates
    return <IMapboxSetting>this._storeService.getStaticState(MAPBOX_SETTINGS)
  }

  private set _state(settings: IMapboxSetting) {
    const { MAPBOX_SETTINGS } = this._staticStates
    this._storeService.setStaticState(MAPBOX_SETTINGS, settings)
  }

  loadMapbox(): void {
    const { position, visualizePitch } = this._navigationControl
    const options: MapboxOptions = { ...this._options, ...this._state }
    this._map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), <NavigationControlPosition>position)
      .on('idle', (): void => this._onMapIdleHandler())
  }

  mapFlyTo({ center, zoom }: ITrail): void {
    this._map.flyTo({ center, zoom })
  }

  removeMapInstance(): void {
    ;() => this._map.remove()
  }

  setInitialZoomState(zoom: number) {
    const state = this._state
    state.zoom = zoom
    this._state = state
  }

  private _onMapIdleHandler(): void {
    this._setMapboxSettingsState()
  }

  private _setMapboxSettingsState(): void {
    const { mapStyle: style } = this._mapStyleService
    this._state = {
      bearing: this._map.getBearing(),
      center: this._map.getCenter(),
      pitch: this._map.getPitch(),
      zoom: this._map.getZoom(),
      style
    }
  }
}
