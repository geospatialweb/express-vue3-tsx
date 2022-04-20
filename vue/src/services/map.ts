import { FillLayer, LineLayer, Map, MapLayerMouseEvent, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/configuration'
import { LayerElements } from '@/enums'
import { ILayerVisibility, ITrail } from '@/interfaces'
import {
  AppService,
  GeoJsonLayerService,
  LayerVisibilityService,
  MapStyleService,
  MapboxService,
  MarkerService,
  ModalService,
  PopupService
} from '@/services'

@Service()
export default class MapService {
  private _layerElements: Record<string, string> = LayerElements
  private _skyLayer = <SkyLayer>mapbox.skyLayer

  constructor(
    private _map: Map,
    private _appService: AppService,
    private _geoJsonLayerService: GeoJsonLayerService,
    private _layerVisibilityService: LayerVisibilityService,
    private _mapStyleService: MapStyleService,
    private _mapboxService: MapboxService,
    private _markerService: MarkerService,
    private _modalService: ModalService,
    private _popupService: PopupService
  ) {
    this._appService = Container.get(AppService)
    this._geoJsonLayerService = Container.get(GeoJsonLayerService)
    this._layerVisibilityService = Container.get(LayerVisibilityService)
    this._mapStyleService = Container.get(MapStyleService)
    this._mapboxService = Container.get(MapboxService)
    this._markerService = Container.get(MarkerService)
    this._modalService = Container.get(ModalService)
    this._popupService = Container.get(PopupService)
  }

  loadMapLayer(): void {
    this._mapboxService.loadMapbox()
    this.setMapInstance()
  }

  mapFlyTo({ center, zoom }: ITrail): void {
    this._map.flyTo({ center, zoom })
  }

  setLayerVisibility(id: string): void {
    /* prettier-ignore */
    const { state: { isMobile } } = this._appService
    const { state: layers } = this._layerVisibilityService
    const { BIOSPHERE } = this._layerElements
    if (layers[id as keyof ILayerVisibility].isActive) {
      this._map.setLayoutProperty(id, 'visibility', 'visible')
      id === BIOSPHERE && !isMobile && this.addLayerVisibilityEventListeners(id)
    } else {
      this._map.setLayoutProperty(id, 'visibility', 'none')
      id === BIOSPHERE && !isMobile && this.removeLayerVisibilityEventListeners(id)
    }
  }

  removeLayerVisibilityEventListeners(id: string): void {
    ;() =>
      this._map
        .off('click', id, (evt: MapLayerMouseEvent): void => this.onMapClickHandler(evt))
        .off('mouseenter', id, (): void => this.onMapMouseEnterHandler())
        .off('mouseleave', id, (): void => this.onMapMouseLeaveHandler())
  }

  setMapStyle(): void {
    const { mapStyle } = this._mapStyleService
    this._map.setStyle(mapStyle)
    this.resetMapFeatures()
  }

  private setMapInstance(): void {
    const { map } = this._mapboxService
    this._map = map.on('load', (): void => this.onMapLoadHandler())
  }

  private onMapLoadHandler(): void {
    this.addSkyLayer()
    this.addGeoJsonLayers()
    this.hideModal()
  }

  private addSkyLayer(): void {
    this._map.getLayer(this._skyLayer.id) ?? this._map.addLayer(this._skyLayer)
  }

  private addGeoJsonLayers(): void {
    const { layers } = this._geoJsonLayerService
    for (const layer of layers) {
      const { id } = layer
      this._map.getLayer(id) ?? this._map.addLayer(<FillLayer | LineLayer>layer)
      this.setLayerVisibility(id)
    }
  }

  private hideModal(): void {
    setTimeout((): void => this._modalService.hideModal(), 100)
  }

  /* reset layers & marker visibility after delay to set mapStyle (basemap) */
  private resetMapFeatures(): void {
    this.resetSkyLayer()
    this.resetGeoJsonLayers()
    this.resetHiddenMarkersVisibility()
  }

  private resetSkyLayer(): void {
    setTimeout((): void => this.addSkyLayer(), 100)
  }

  private resetGeoJsonLayers(): void {
    setTimeout((): void => this.addGeoJsonLayers(), 200)
  }

  private resetHiddenMarkersVisibility(): void {
    const { mapStyle } = this._mapStyleService
    mapStyle.includes('outdoors')
      ? setTimeout((): void => this._markerService.setHiddenMarkersVisibility(), 1000)
      : setTimeout((): void => this._markerService.setHiddenMarkersVisibility(), 200)
  }

  private addLayerVisibilityEventListeners(id: string): void {
    this._map
      .on('click', id, (evt: MapLayerMouseEvent): void => this.onMapClickHandler(evt))
      .on('mouseenter', id, (): void => this.onMapMouseEnterHandler())
      .on('mouseleave', id, (): void => this.onMapMouseLeaveHandler())
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
