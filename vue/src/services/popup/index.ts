import { Feature, Point } from 'geojson'
import { LngLat, LngLatLike, Popup } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { IGeoJsonProperties } from '@/interfaces'
import { MapboxService } from '@/services'

@Service()
export default class PopupService {
  private _popup: Popup
  private _mapboxService: MapboxService

  constructor() {
    this._popup = new Popup({ closeButton: false })
    this._mapboxService = Container.get(MapboxService)
  }

  addLayerPopup(feature: Feature, lngLat: LngLatLike): void {
    const { properties } = feature
    this._setLayerPopupLngLat(lngLat)
    this._setHTML(<IGeoJsonProperties>properties)
    this._setOffset(4)
    this._addToMap()
  }

  addMarkerPopup(feature: Feature): void {
    const { properties } = feature
    this._setMarkerPopupLngLat(feature)
    this._setHTML(<IGeoJsonProperties>properties)
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

  private _setLayerPopupLngLat(lngLat: LngLatLike): void {
    this._popup.setLngLat(lngLat)
  }

  private _setMarkerPopupLngLat({ geometry, properties }: Feature): void {
    if (Object.keys(<IGeoJsonProperties>properties).length) {
      const { lat, lng } = <LngLat>properties
      lat && lng ? this._popup.setLngLat([lng, lat]) : this._popup.setLngLat(<LngLatLike>(<Point>geometry).coordinates)
    }
  }

  private _setHTML(properties: IGeoJsonProperties): void {
    if (Object.keys(properties).length) {
      const { description, name } = properties
      this._popup.setHTML(
        `<div class="bold">${name}</div>
         <div>${description}</div>`
      )
    }
  }

  private _setOffset(offset: number): void {
    this._popup.setOffset(offset)
  }
}
