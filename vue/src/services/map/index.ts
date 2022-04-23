import { FillLayer, LineLayer, Map, MapLayerMouseEvent, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/configuration'
import { LayerElement, StaticState } from '@/enums'
import { ILayerElements, ILayerVisibility, IMapboxSetting, IStaticState } from '@/interfaces'
import {
  AppService,
  GeoJsonLayerService,
  LayerVisibilityService,
  MapStyleService,
  MapboxService,
  MarkerService,
  ModalService,
  PopupService,
  StoreService
} from '@/services'

@Service()
export default class MapService {
  private _layerElements: ILayerElements
  private _map: Map
  private _skyLayer: SkyLayer
  private _staticStates: IStaticState
  private _appService: AppService
  private _geoJsonLayerService: GeoJsonLayerService
  private _layerVisibilityService: LayerVisibilityService
  private _mapStyleService: MapStyleService
  private _mapboxService: MapboxService
  private _markerService: MarkerService
  private _modalService: ModalService
  private _popupService: PopupService
  private _storeService: StoreService

  constructor() {
    this._layerElements = LayerElement
    this._skyLayer = <SkyLayer>mapbox.skyLayer
    this._staticStates = StaticState
    this._appService = Container.get(AppService)
    this._geoJsonLayerService = Container.get(GeoJsonLayerService)
    this._layerVisibilityService = Container.get(LayerVisibilityService)
    this._mapStyleService = Container.get(MapStyleService)
    this._mapboxService = Container.get(MapboxService)
    this._markerService = Container.get(MarkerService)
    this._modalService = Container.get(ModalService)
    this._popupService = Container.get(PopupService)
    this._storeService = Container.get(StoreService)
  }

  private get _state(): IMapboxSetting {
    const { MAPBOX_SETTINGS } = this._staticStates
    return <IMapboxSetting>this._storeService.getStaticState(MAPBOX_SETTINGS)
  }

  private set _state(settings: IMapboxSetting) {
    const { MAPBOX_SETTINGS } = this._staticStates
    this._storeService.setStaticState(MAPBOX_SETTINGS, settings)
  }

  loadMapLayer(): void {
    this._mapboxService.loadMapbox()
    this._setMapInstance()
  }

  setInitialZoomState(zoom: number) {
    const state = this._state
    state.zoom = zoom
    this._state = state
  }

  setLayerVisibility(id: string): void {
    /* prettier-ignore */
    const { state: { isMobile } } = this._appService
    const { state: layers } = this._layerVisibilityService
    const { BIOSPHERE } = this._layerElements
    if (layers[id as keyof ILayerVisibility].isActive) {
      this._map.setLayoutProperty(id, 'visibility', 'visible')
      id === BIOSPHERE && !isMobile && this._addLayerVisibilityEventListeners(id)
    } else {
      this._map.setLayoutProperty(id, 'visibility', 'none')
      id === BIOSPHERE && !isMobile && this._removeLayerVisibilityEventListeners(id)
    }
  }

  setMapStyle(): void {
    const { mapStyle } = this._mapStyleService
    this._map.setStyle(mapStyle)
    this._resetMapFeatures()
  }

  private _setMapInstance(): void {
    const { map } = this._mapboxService
    this._map = map.on('load', (): void => this._onMapLoadHandler())
  }

  private _onMapLoadHandler(): void {
    this._addSkyLayer()
    this._addGeoJsonLayers()
    this._hideModal()
  }

  private _addSkyLayer(): void {
    this._map.getLayer(this._skyLayer.id) ?? this._map.addLayer(this._skyLayer)
  }

  private _addGeoJsonLayers(): void {
    const { layers } = this._geoJsonLayerService
    for (const layer of layers) {
      const { id } = layer
      this._map.getLayer(id) ?? this._map.addLayer(<FillLayer | LineLayer>layer)
      this.setLayerVisibility(id)
    }
  }

  private _hideModal(): void {
    setTimeout((): void => this._modalService.hideModal(), 100)
  }

  /* reset layers & marker visibility after delay to set mapStyle (basemap) */
  private _resetMapFeatures(): void {
    this._resetSkyLayer()
    this._resetGeoJsonLayers()
    this._resetHiddenMarkersVisibility()
  }

  private _resetSkyLayer(): void {
    setTimeout((): void => this._addSkyLayer(), 100)
  }

  private _resetGeoJsonLayers(): void {
    setTimeout((): void => this._addGeoJsonLayers(), 200)
  }

  private _resetHiddenMarkersVisibility(): void {
    const { mapStyle } = this._mapStyleService
    mapStyle.includes('outdoors')
      ? setTimeout((): void => this._markerService.setHiddenMarkersVisibility(), 1000)
      : setTimeout((): void => this._markerService.setHiddenMarkersVisibility(), 200)
  }

  private _addLayerVisibilityEventListeners(id: string): void {
    this._map
      .on('click', id, (evt: MapLayerMouseEvent): void => this._onMapClickHandler(evt))
      .on('mouseenter', id, (): void => this._onMapMouseEnterHandler())
      .on('mouseleave', id, (): void => this._onMapMouseLeaveHandler())
  }

  private _removeLayerVisibilityEventListeners(id: string): void {
    this._map
      .off('click', id, (evt: MapLayerMouseEvent): void => this._onMapClickHandler(evt))
      .off('mouseenter', id, (): void => this._onMapMouseEnterHandler())
      .off('mouseleave', id, (): void => this._onMapMouseLeaveHandler())
  }

  private _onMapClickHandler(evt: MapLayerMouseEvent): void {
    this._popupService.addLayerPopup(evt)
  }

  private _onMapMouseEnterHandler(): void {
    this._map.getCanvas().style.cursor = 'pointer'
  }

  private _onMapMouseLeaveHandler(): void {
    this._map.getCanvas().style.cursor = ''
    this._popupService.removePopup()
  }
}
