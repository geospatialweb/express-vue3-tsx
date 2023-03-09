/* eslint-disable */
import { Deck } from '@deck.gl/core'
import { LngLatLike, Map, MapboxOptions } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { deckgl } from '@/configuration'
import { StaticState } from '@/enums'
import { IDeckglOption, IDeckglViewSetting, IStaticState } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class DeckglService {
  private _options: IDeckglOption
  private _staticStates: IStaticState
  private _storeService: StoreService

  constructor(private _deck: any, private _map: Map) {
    this._options = deckgl.options
    this._staticStates = StaticState
    this._storeService = Container.get(StoreService)
  }

  get deck(): any {
    return this._deck
  }

  get map(): Map {
    return this._map
  }

  private get _state(): IDeckglViewSetting {
    const { DECKGL_VIEW_SETTINGS } = this._staticStates
    return <IDeckglViewSetting>this._storeService.getStaticState(DECKGL_VIEW_SETTINGS)
  }

  private set _state(settings: IDeckglViewSetting) {
    const { DECKGL_VIEW_SETTINGS } = this._staticStates
    this._storeService.setStaticState(DECKGL_VIEW_SETTINGS, settings)
  }

  loadDeckgl(): void {
    const { canvas, controller, id, maxPitch, maxZoom, minZoom } = this._options
    const options = {
      canvas,
      controller,
      id,
      initialViewState: { maxPitch, maxZoom, minZoom, ...this._state }
    }
    this._deck = new Deck({
      ...options,
      onViewStateChange: ({ viewState: { bearing, latitude, longitude, pitch, zoom } }: any): void => {
        const center: LngLatLike = { lng: longitude, lat: latitude }
        const state: IDeckglViewSetting = { bearing, center, latitude, longitude, pitch, zoom }
        this._setDeckglViewSettingsState(state)
        this._mapJumpTo()
      },
      getTooltip: ({ object }: Record<string, Record<string, number[]>>): string | null => {
        if (!object) return null
        const { points }: Record<string, number[]> = object
        return `${points.length} Accidents`
      }
    })
  }

  loadMapbox(): void {
    const { container, interactive, style } = this._options
    const options: MapboxOptions = { container, interactive, style, ...this._state }
    this._map = new Map(options)
  }

  removeDeckInstance(): void {
    ;(): void => this._deck.finalize()
  }

  removeMapInstance(): void {
    ;(): void => this._map.remove()
  }

  setInitialZoomState(zoom: number) {
    const state = this._state
    state.zoom = zoom
    this._state = state
  }

  private _mapJumpTo(): void {
    this._map.jumpTo(this._state)
  }

  private _setDeckglViewSettingsState(state: IDeckglViewSetting): void {
    this._state = state
  }
}
