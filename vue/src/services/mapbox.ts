import { Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/configuration'
import { StaticStates } from '@/enums'
import { IMapboxOptions, IMapboxSettings } from '@/interfaces'
import { MapStyleService, StoreService } from '@/services'
import { NavigationControlPosition } from '@/types'

@Service()
export default class MapboxService {
  private _navigationControl = mapbox.navigationControl
  private _options: IMapboxOptions = mapbox.options
  private _staticStates: Record<string, string> = StaticStates

  constructor(private _map: Map, private _mapStyleService: MapStyleService, private _storeService: StoreService) {
    this._mapStyleService = Container.get(MapStyleService)
    this._storeService = Container.get(StoreService)
  }

  get map(): Map {
    return this._map
  }

  private get _state(): IMapboxSettings {
    const { MAPBOX_SETTINGS } = this._staticStates
    return <IMapboxSettings>this._storeService.getStaticState(MAPBOX_SETTINGS)
  }

  private set _state(settings: IMapboxSettings) {
    const { MAPBOX_SETTINGS } = this._staticStates
    this._storeService.setStaticState(MAPBOX_SETTINGS, settings)
  }

  loadMapbox(): void {
    const { position, visualizePitch } = this._navigationControl
    const options: MapboxOptions = { ...this._options, ...this._state }
    this._map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), <NavigationControlPosition>position)
      .on('idle', (): void => this.onMapIdleHandler())
  }

  setInitialZoomState(zoom: number) {
    const state = this._state
    state.zoom = zoom
    this._state = state
  }

  removeMapInstance(): void {
    this._map.remove()
  }

  private onMapIdleHandler(): void {
    this.setMapboxSettingsState()
  }

  private setMapboxSettingsState(): void {
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
