import { Map, MapLayerMouseEvent } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { MapboxService, PopupService } from '@/services'

@Service()
export default class MapController {
  constructor(private _mapboxService: MapboxService, private _popupService: PopupService) {
    this._mapboxService = Container.get(MapboxService)
    this._popupService = Container.get(PopupService)
  }

  private get _map(): Map {
    const { map } = this._mapboxService
    return map
  }

  addLayerVisibilityEventListeners(id: string): void {
    this._map
      .on('click', id, (evt: MapLayerMouseEvent): void => this.onMapClickHandler(evt))
      .on('mouseenter', id, (): void => this.onMapMouseEnterHandler())
      .on('mouseleave', id, (): void => this.onMapMouseLeaveHandler())
  }

  removeLayerVisibilityEventListeners(id: string): void {
    this._map
      .off('click', id, (evt: MapLayerMouseEvent): void => this.onMapClickHandler(evt))
      .off('mouseenter', id, (): void => this.onMapMouseEnterHandler())
      .off('mouseleave', id, (): void => this.onMapMouseLeaveHandler())
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
