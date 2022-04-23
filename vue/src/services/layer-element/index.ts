import { Container, Service } from 'typedi'

import { LayerElement as LayerElements, ReactiveState } from '@/enums'
import { ILayerElement, ILayerElements, IReactiveState } from '@/interfaces'
import {
  LayerVisibilityService,
  MapService,
  MapStyleService,
  MarkerService,
  RouterService,
  StoreService
} from '@/services'
import { LayerElement } from '@/types'

@Service()
export default class LayerElementService {
  private _layerElements: ILayerElements
  private _layerElementsHashmap: Record<string, (id: LayerElement) => void | Promise<void>>
  private _reactiveStates: IReactiveState
  private _layerVisibilityService: LayerVisibilityService
  private _mapService: MapService
  private _mapStyleService: MapStyleService
  private _markerService: MarkerService
  private _routerService: RouterService
  private _storeService: StoreService

  constructor() {
    this._layerElements = LayerElements
    this._layerElementsHashmap = {}
    this._reactiveStates = ReactiveState
    this._layerVisibilityService = Container.get(LayerVisibilityService)
    this._mapService = Container.get(MapService)
    this._mapStyleService = Container.get(MapStyleService)
    this._markerService = Container.get(MarkerService)
    this._routerService = Container.get(RouterService)
    this._storeService = Container.get(StoreService)
  }

  get state(): ILayerElement[] {
    const { LAYER_ELEMENTS } = this._reactiveStates
    return <ILayerElement[]>this._storeService.getReactiveState(LAYER_ELEMENTS)
  }

  private set _state(layerElements: ILayerElement[]) {
    const { LAYER_ELEMENTS } = this._reactiveStates
    this._storeService.setReactiveState(LAYER_ELEMENTS, layerElements)
  }

  displayLayerElement(id: string): void {
    !Object.keys(this._layerElementsHashmap).length && this._createLayerElementsHashmap()
    void this._layerElementsHashmap[id](<LayerElement>id)
  }

  private _createLayerElementsHashmap(): void {
    const { BIOSPHERE, DECKGL, OFFICE, PLACES, SATELLITE, TRAILS } = this._layerElements
    this._layerElementsHashmap = {
      [BIOSPHERE]: this._layer,
      [DECKGL]: this._route,
      [OFFICE]: this._marker,
      [PLACES]: this._marker,
      [SATELLITE]: this._satellite,
      [TRAILS]: this._layer
    }
  }

  private _layer = (id: LayerElement): void => {
    const { BIOSPHERE, BIOSPHERE_BORDER, TRAILS } = this._layerElements
    this._setLayerElementState(id)
    this._setLayerVisibilityState(id)
    this._setLayerVisibility(id)
    id === BIOSPHERE && this._setLayerVisibility(<LayerElement>BIOSPHERE_BORDER)
    id === TRAILS && this._toggleMarkerVisibility(id)
  }

  private _marker = (id: LayerElement): void => {
    this._setLayerElementState(id)
    this._toggleMarkerVisibility(id)
  }

  private _route = async (id: LayerElement): Promise<void> => {
    await this._setRoute(id)
  }

  private _satellite = (id: LayerElement): void => {
    this._setLayerElementState(id)
    this._setHiddenMarkersVisibility()
    this._setMapStyleState()
    this._setMapStyle()
  }

  private _setHiddenMarkersVisibility(): void {
    this._markerService.setHiddenMarkersVisibility()
  }

  private _setLayerElementState(id: LayerElement): void {
    const state = this.state
    const layerElement = (layerElement: ILayerElement): boolean => layerElement.id === id
    const i = state.findIndex(layerElement)
    if (i >= 0) {
      state[i].isActive = !state[i].isActive
      state[i].isActive ? (state[i].className = 'active') : (state[i].className = 'inactive')
      this._state = state
    }
  }

  private _setLayerVisibility(id: LayerElement): void {
    this._mapService.setLayerVisibility(id)
  }

  private _setLayerVisibilityState(id: LayerElement): void {
    this._layerVisibilityService.setLayerVisibilityState(id)
  }

  private _setMapStyle(): void {
    this._mapStyleService.setMapStyle()
    this._mapService.setMapStyle()
  }

  private _setMapStyleState(): void {
    this._mapStyleService.setMapStyleState()
  }

  private async _setRoute(id: LayerElement): Promise<void> {
    await this._routerService.setRoute(id)
  }

  private _toggleMarkerVisibility(id: LayerElement): void {
    this._markerService.toggleMarkerVisibility(id)
  }
}
