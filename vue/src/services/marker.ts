import { Feature, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { StaticStates } from '@/enums'
import { IMarkerVisibility } from '@/interfaces'
import { MapboxService, PopupService, StoreService } from '@/services'

@Service()
export default class MarkerService {
  private _markers: Array<Array<Marker>> = []
  private _markersHashmap: Map<string, number> = new Map()
  private _reverseMarkersHashmap: Map<number, string> = new Map()
  private _staticStates: Record<string, string> = StaticStates

  constructor(
    private _mapboxService: MapboxService,
    private _popupService: PopupService,
    private _storeService: StoreService
  ) {
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

  setHiddenMarkersVisibility(): void {
    for (const [i, markers] of this._markers.entries()) {
      const id = <string>this._reverseMarkersHashmap.get(i)
      const { isActive } = this._state[id as keyof IMarkerVisibility]
      isActive && this.setHiddenMarkers(id, markers)
    }
  }

  setMarkers(id: string, features: Array<Feature>): void {
    this._markers = [...this._markers, this.createMarkers(id, features)]
    this.setMarkersHashmaps(id)
  }

  toggleMarkerVisibility(id: string): void {
    this.setMarkerVisibilityState(id)
    const index = <number>this._markersHashmap.get(id)
    const markers = this._markers[index]
    for (const marker of markers) {
      this.addRemoveMarkers(id, marker)
    }
  }

  private createMarkers(id: string, features: Array<Feature>): Array<Marker> {
    const marker = (feature: Feature): Marker => {
      const el = this.createMarkerElement(id, feature)
      return this.createMarker(el, feature)
    }
    return features.map(marker)
  }

  private createMarkerElement(id: string, feature: Feature): HTMLDivElement {
    const el = document.createElement('div')
    el.className = id
    el.addEventListener('touchstart', (): void => this.addMarkerPopup(feature), { passive: true })
    el.addEventListener('mouseenter', (): void => this.addMarkerPopup(feature))
    el.addEventListener('mouseleave', (): void => this.removeMarkerPopup())
    return el
  }

  private createMarker(el: HTMLDivElement, feature: Feature): Marker {
    const { geometry, properties } = feature
    const { lat, lng } = <Record<string, number>>properties
    if (lat && lng) return new Marker(el).setLngLat([lng, lat])
    return new Marker(el).setLngLat(<LngLatLike>(<Point>geometry).coordinates)
  }

  private setHiddenMarkers(id: string, markers: Array<Marker>) {
    this.setHiddenMarkerVisibilityState(id)
    for (const marker of markers) {
      this.addRemoveHiddenMarkers(id, marker)
    }
  }

  private setHiddenMarkerVisibilityState(id: string): void {
    const state = this._state
    state[id as keyof IMarkerVisibility].isHidden = !state[id as keyof IMarkerVisibility].isHidden
    this._state = state
  }

  private addRemoveHiddenMarkers(id: string, marker: Marker): void {
    this._state[id as keyof IMarkerVisibility].isHidden ? this.removeMarker(marker) : this.addMarker(marker)
  }

  private setMarkerVisibilityState(id: string): void {
    const state = this._state
    state[id as keyof IMarkerVisibility].isActive = !state[id as keyof IMarkerVisibility].isActive
    this._state = state
  }

  private addRemoveMarkers(id: string, marker: Marker): void {
    this._state[id as keyof IMarkerVisibility].isActive ? this.addMarker(marker) : this.removeMarker(marker)
  }

  private addMarker(marker: Marker): void {
    const { map } = this._mapboxService
    marker.addTo(map)
  }

  private removeMarker(marker: Marker): void {
    marker.remove()
  }

  private addMarkerPopup(feature: Feature): void {
    this._popupService.addMarkerPopup(feature)
  }

  private removeMarkerPopup(): void {
    this._popupService.removePopup()
  }

  private setMarkersHashmaps(id: string) {
    this._markersHashmap.set(id, this._markers.length - 1)
    this._reverseMarkersHashmap.set(this._markers.length - 1, id)
  }
}
