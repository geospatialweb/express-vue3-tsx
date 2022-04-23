import { Feature, Point } from 'geojson'
import { LngLat, LngLatLike, MapLayerMouseEvent, Popup } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { MapboxService } from '@/services'

@Service()
export default class PopupService {
  private _popup: Popup
  private _mapboxService: MapboxService

  constructor() {
    this._popup = new Popup({ closeButton: false })
    this._mapboxService = Container.get(MapboxService)
  }

  addLayerPopup({ features, lngLat }: MapLayerMouseEvent): void {
    if (features?.length) {
      this._setLayerPopupLngLat(lngLat)
      this._setHTML(features[0])
      this._setOffset(4)
      this._addToMap()
    }
  }

  addMarkerPopup(feature: Feature): void {
    this._setMarkerPopupLngLat(feature)
    this._setHTML(feature)
    this._setOffset(14)
    this._addToMap()
  }

  removePopup(): void {
    this._popup.remove()
  }

  private _addToMap(): void {
    const { map } = this._mapboxService
    this._popup.addTo(map)
  }

  private _setLayerPopupLngLat(lngLat: LngLat): void {
    this._popup.setLngLat(lngLat)
  }

  private _setMarkerPopupLngLat({ geometry, properties }: Feature): void {
    if (properties) {
      const { lat, lng } = properties
      lat && lng
        ? this._popup.setLngLat([<number>lng, <number>lat])
        : this._popup.setLngLat(<LngLatLike>(<Point>geometry).coordinates)
    }
  }

  private _setHTML({ properties }: Feature): void {
    if (properties) {
      const { description, name } = properties
      this._popup.setHTML(
        `<div class="bold">${<string>name}</div>
         <div>${<string>description}</div>`
      )
    }
  }

  private _setOffset(offset: number): void {
    this._popup.setOffset(offset)
  }
}
