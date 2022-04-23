import { Feature, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { StaticState } from '@/enums'
import { ILngLat, IMarkerVisibility, IStaticState } from '@/interfaces'
import { MapboxService, PopupService, StoreService } from '@/services'

@Service()
export default class MarkerService {
  private _markers: Marker[][]
  private _markersHashmap: Map<string, number>
  private _reverseMarkersHashmap: Map<number, string>
  private _staticStates: IStaticState
  private _mapboxService: MapboxService
  private _popupService: PopupService
  private _storeService: StoreService

  constructor() {
    this._markers = []
    this._markersHashmap = new Map()
    this._reverseMarkersHashmap = new Map()
    this._staticStates = StaticState
    this._mapboxService = Container.get(MapboxService)
    this._popupService = Container.get(PopupService)
    this._storeService = Container.get(StoreService)
  }

  private get _state(): IMarkerVisibility {
    const { MARKER_VISIBILITY } = this._staticStates
    return <IMarkerVisibility>this._storeService.getStaticState(MARKER_VISIBILITY)
  }

  private set _state(markers: IMarkerVisibility) {
    const { MARKER_VISIBILITY } = this._staticStates
    this._storeService.setStaticState(MARKER_VISIBILITY, markers)
  }

  setMarkers(id: string, features: Feature[]): void {
    this._markers = [...this._markers, this._createMarkers(id, features)]
    this._setMarkersHashmaps(id)
  }

  setHiddenMarkersVisibility(): void {
    for (const [i, markers] of this._markers.entries()) {
      const id = <string>this._reverseMarkersHashmap.get(i)
      const { isActive } = this._state[id as keyof IMarkerVisibility]
      isActive && this._setHiddenMarkers(id, markers)
    }
  }

  toggleMarkerVisibility(id: string): void {
    this._setMarkerVisibilityState(id)
    const index = <number>this._markersHashmap.get(id)
    const markers = this._markers[index]
    for (const marker of markers) {
      this._addRemoveMarkers(id, marker)
    }
  }

  private _createMarkers(id: string, features: Feature[]): Marker[] {
    const marker = (feature: Feature): Marker => {
      const el = this._createMarkerElement(id, feature)
      return this._createMarker(el, feature)
    }
    return features.map(marker)
  }

  private _createMarkerElement(id: string, feature: Feature): HTMLDivElement {
    const el = document.createElement('div')
    el.className = id
    el.addEventListener('touchstart', (): void => this._addMarkerPopup(feature), { passive: true })
    el.addEventListener('mouseenter', (): void => this._addMarkerPopup(feature))
    el.addEventListener('mouseleave', (): void => this._removeMarkerPopup())
    return el
  }

  private _addMarkerPopup(feature: Feature): void {
    this._popupService.addMarkerPopup(feature)
  }

  private _removeMarkerPopup(): void {
    this._popupService.removePopup()
  }

  private _createMarker(el: HTMLDivElement, feature: Feature): Marker {
    const { geometry, properties } = feature
    const { lat, lng } = <ILngLat>properties
    if (lat && lng) return new Marker(el).setLngLat([lng, lat])
    return new Marker(el).setLngLat(<LngLatLike>(<Point>geometry).coordinates)
  }

  private _setMarkersHashmaps(id: string) {
    this._markersHashmap.set(id, this._markers.length - 1)
    this._reverseMarkersHashmap.set(this._markers.length - 1, id)
  }

  private _setHiddenMarkers(id: string, markers: Marker[]) {
    this._setHiddenMarkerVisibilityState(id)
    for (const marker of markers) {
      this._addRemoveHiddenMarkers(id, marker)
    }
  }

  private _setHiddenMarkerVisibilityState(id: string): void {
    const state = this._state
    state[id as keyof IMarkerVisibility].isHidden = !state[id as keyof IMarkerVisibility].isHidden
    this._state = state
  }

  private _addRemoveHiddenMarkers(id: string, marker: Marker): void {
    this._state[id as keyof IMarkerVisibility].isHidden ? this._removeMarker(marker) : this._addMarker(marker)
  }

  private _setMarkerVisibilityState(id: string): void {
    const state = this._state
    state[id as keyof IMarkerVisibility].isActive = !state[id as keyof IMarkerVisibility].isActive
    this._state = state
  }

  private _addRemoveMarkers(id: string, marker: Marker): void {
    this._state[id as keyof IMarkerVisibility].isActive ? this._addMarker(marker) : this._removeMarker(marker)
  }

  private _addMarker(marker: Marker): void {
    const { map } = this._mapboxService
    marker.addTo(map)
  }

  private _removeMarker(marker: Marker): void {
    marker.remove()
  }
}
