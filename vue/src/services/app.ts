import { Container, Service } from 'typedi'

import { mediaQueryCollection } from '@/configuration'
import { StaticStates } from '@/enums'
import { IApp } from '@/interfaces'
import { DeckglService, MapboxService, StoreService, TrailService } from '@/services'

@Service()
export default class AppService {
  private _mediaQueryCollection: Record<string, Record<string, number>> = mediaQueryCollection
  private _staticStates: Record<string, string> = StaticStates

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
    this.setAppState()
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
      const deckglService = Container.get(DeckglService)
      const mapboxService = Container.get(MapboxService)
      const trailService = Container.get(TrailService)
      deckglService.setInitialZoomState(deckgl)
      mapboxService.setInitialZoomState(mapbox)
      trailService.setInitialZoom(trail)
    }
  }

  private setAppState(): void {
    const state = this.state
    state.initialZoom = this.getInitialZoom()
    state.isMobile = this.getIsMobile()
    this._state = state
  }

  private getInitialZoom(): Record<string, number> | undefined {
    const isMatch = ([mediaQuery]: [string, Record<string, number>]): boolean => window.matchMedia(mediaQuery).matches
    const mediaQuery = Object.entries(this._mediaQueryCollection).find(isMatch)
    return mediaQuery && mediaQuery[1]
  }

  private getIsMobile(): boolean {
    const mobile = /Android|BB|iPad|iPhone|iPod|Nokia/i
    return !!navigator.userAgent.match(mobile)
  }
}
