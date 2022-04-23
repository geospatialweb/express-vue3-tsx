import { Container, Service } from 'typedi'

import { mediaQueryCollection } from '@/configuration'
import { StaticState } from '@/enums'
import { IApp, IStaticState } from '@/interfaces'
import { DeckglService, MapboxService, StoreService, TrailService } from '@/services'

@Service()
export default class AppService {
  private _mediaQueryCollection: Record<string, Record<string, number>>
  private _staticStates: IStaticState
  private _deckglService: DeckglService
  private _mapboxService: MapboxService
  private _storeService: StoreService
  private _trailService: TrailService

  constructor() {
    this._mediaQueryCollection = mediaQueryCollection
    this._staticStates = StaticState
    this._deckglService = Container.get(DeckglService)
    this._mapboxService = Container.get(MapboxService)
    this._storeService = Container.get(StoreService)
    this._trailService = Container.get(TrailService)
    this._setAppState()
  }

  get state(): IApp {
    const { APP } = this._staticStates
    return <IApp>this._storeService.getStaticState(APP)
  }

  private set _state(state: IApp) {
    const { APP } = this._staticStates
    this._storeService.setStaticState(APP, state)
  }

  setInitialZoom(): void {
    const { initialZoom } = this.state
    if (initialZoom) {
      const { deckgl, mapbox, trail } = initialZoom
      this._deckglService.setInitialZoomState(deckgl)
      this._mapboxService.setInitialZoomState(mapbox)
      this._trailService.setInitialZoom(trail)
    }
  }

  private _setAppState(): void {
    const state = this.state
    state.initialZoom = this._getInitialZoom()
    state.isMobile = this._getIsMobile()
    this._state = state
  }

  private _getInitialZoom(): Record<string, number> | undefined {
    const isMatch = ([mediaQuery]: [string, Record<string, number>]): boolean => window.matchMedia(mediaQuery).matches
    const mediaQuery = Object.entries(this._mediaQueryCollection).find(isMatch)
    return mediaQuery && mediaQuery[1]
  }

  private _getIsMobile(): boolean {
    const mobile = /Android|BB|iPad|iPhone|iPod|Nokia/i
    return !!navigator.userAgent.match(mobile)
  }
}
