import { Container, Service } from 'typedi'

import { LayerElements, ReactiveStates } from '@/enums'
import { ILayerElement } from '@/interfaces'
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
  private _layerElements: Record<string, string> = LayerElements
  private _layerElementsHashmap: Record<string, (id: LayerElement) => void | Promise<void>> = {}
  private _reactiveStates: Record<string, string> = ReactiveStates

  constructor(
    private _layerVisibilityService: LayerVisibilityService,
    private _mapService: MapService,
    private _mapStyleService: MapStyleService,
    private _markerService: MarkerService,
    private _routerService: RouterService,
    private _storeService: StoreService
  ) {
    this._layerVisibilityService = Container.get(LayerVisibilityService)
    this._mapService = Container.get(MapService)
    this._mapStyleService = Container.get(MapStyleService)
    this._markerService = Container.get(MarkerService)
    this._routerService = Container.get(RouterService)
    this._storeService = Container.get(StoreService)
    this.createLayerElementsHashmap()
  }

  get state(): Array<ILayerElement> {
    const { LAYER_ELEMENTS } = this._reactiveStates
    return <Array<ILayerElement>>this._storeService.getReactiveState(LAYER_ELEMENTS)
  }

  private set _state(layerElements: Array<ILayerElement>) {
    const { LAYER_ELEMENTS } = this._reactiveStates
    this._storeService.setReactiveState(LAYER_ELEMENTS, layerElements)
  }

  async displayLayerElement(id: string): Promise<void> {
    id.endsWith('-icon') && (id = id.split('-icon')[0])
    await this._layerElementsHashmap[id](<LayerElement>id)
  }

  private createLayerElementsHashmap(): void {
    const { BIOSPHERE, DECKGL, OFFICE, PLACES, SATELLITE, TRAILS } = this._layerElements
    this._layerElementsHashmap = {
      [BIOSPHERE]: this.layer,
      [DECKGL]: this.route,
      [OFFICE]: this.marker,
      [PLACES]: this.marker,
      [SATELLITE]: this.satellite,
      [TRAILS]: this.layer
    }
  }

  private layer = (id: LayerElement): void => {
    const { BIOSPHERE, BIOSPHERE_BORDER, TRAILS } = this._layerElements
    this.setLayerElementState(id)
    this.setLayerVisibilityState(id)
    this.setLayerVisibility(id)
    id === BIOSPHERE && this.setLayerVisibility(<LayerElement>BIOSPHERE_BORDER)
    id === TRAILS && this.toggleMarkerVisibility(id)
  }

  private marker = (id: LayerElement): void => {
    this.setLayerElementState(id)
    this.toggleMarkerVisibility(id)
  }

  private route = async (id: LayerElement): Promise<void> => {
    await this.setRoute(id)
  }

  private satellite = (id: LayerElement): void => {
    this.setLayerElementState(id)
    this.setHiddenMarkersVisibility()
    this.setMapStyleState()
    this.setMapStyle()
  }

  private setLayerElementState(id: LayerElement): void {
    const state = this.state
    const layerElement = (layerElement: ILayerElement): boolean => layerElement.id === id
    const i = state.findIndex(layerElement)
    if (i >= 0) {
      state[i].isActive = !state[i].isActive
      this._state = state
    }
  }

  private setHiddenMarkersVisibility(): void {
    this._markerService.setHiddenMarkersVisibility()
  }

  private setLayerVisibility(id: LayerElement): void {
    this._mapService.setLayerVisibility(id)
  }

  private setLayerVisibilityState(id: LayerElement): void {
    this._layerVisibilityService.setLayerVisibilityState(id)
  }

  private setMapStyle(): void {
    this._mapStyleService.setMapStyle()
    this._mapService.setMapStyle()
  }

  private setMapStyleState(): void {
    this._mapStyleService.setMapStyleState()
  }

  private async setRoute(id: LayerElement): Promise<void> {
    await this._routerService.setRoute(id)
  }

  private toggleMarkerVisibility(id: LayerElement): void {
    this._markerService.toggleMarkerVisibility(id)
  }
}
