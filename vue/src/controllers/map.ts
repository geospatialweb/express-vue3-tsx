import { Map, MapLayerMouseEvent } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { LayerElements } from '@/enums'
import { AppService, MapboxService, PopupService } from '@/services'

@Service()
export default class MapController {
  private _layerElements: Record<string, string> = LayerElements

  constructor(
    private _appService: AppService,
    private _mapboxService: MapboxService,
    private _popupService: PopupService
  ) {
    this._appService = Container.get(AppService)
    this._mapboxService = Container.get(MapboxService)
    this._popupService = Container.get(PopupService)
  }

  private get _map(): Map {
    const { map } = this._mapboxService
    return map
  }

  addLayerVisibilityEventListeners(id: string): void {
    /* prettier-ignore */
    const { state: { isMobile } } = this._appService
    const { BIOSPHERE } = this._layerElements
    if (id === BIOSPHERE && !isMobile) {
      this._map
        .on('click', id, (evt: MapLayerMouseEvent): void => this.onMapClickHandler(evt))
        .on('mouseenter', id, (): void => this.onMapMouseEnterHandler())
        .on('mouseleave', id, (): void => this.onMapMouseLeaveHandler())
    }
  }

  removeLayerVisibilityEventListeners(id: string): void {
    /* prettier-ignore */
    const { state: { isMobile } } = this._appService
    const { BIOSPHERE } = this._layerElements
    if (id === BIOSPHERE && !isMobile) {
      this._map
        .off('click', id, (evt: MapLayerMouseEvent): void => this.onMapClickHandler(evt))
        .off('mouseenter', id, (): void => this.onMapMouseEnterHandler())
        .off('mouseleave', id, (): void => this.onMapMouseLeaveHandler())
    }
  }

  private onMapClickHandler(evt: MapLayerMouseEvent): void {
    this._popupService.addLayerPopup(evt)
  }

  private onMapMouseEnterHandler(): void {
    this._map.getCanvas().style.cursor = 'pointer'
  }

  private onMapMouseLeaveHandler(): void {
    this._map.getCanvas().style.cursor = ''
    this._popupService.removePopup()
  }
}
