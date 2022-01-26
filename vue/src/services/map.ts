import { FillLayer, LineLayer, Map, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/configuration'
import { MapController } from '@/controllers'
import { ILayerVisibility, ITrail } from '@/interfaces'
import {
  GeoJsonLayerService,
  LayerVisibilityService,
  MapStyleService,
  MapboxService,
  MarkerService,
  ModalService
} from '@/services'

@Service()
export default class MapService {
  private _skyLayer = <SkyLayer>mapbox.skyLayer

  constructor(
    private _map: Map,
    private _mapController: MapController,
    private _geoJsonLayerService: GeoJsonLayerService,
    private _layerVisibilityService: LayerVisibilityService,
    private _mapStyleService: MapStyleService,
    private _mapboxService: MapboxService,
    private _markerService: MarkerService,
    private _modalService: ModalService
  ) {
    this._mapController = Container.get(MapController)
    this._geoJsonLayerService = Container.get(GeoJsonLayerService)
    this._layerVisibilityService = Container.get(LayerVisibilityService)
    this._mapStyleService = Container.get(MapStyleService)
    this._mapboxService = Container.get(MapboxService)
    this._markerService = Container.get(MarkerService)
    this._modalService = Container.get(ModalService)
  }

  loadMapLayer(): void {
    this._mapboxService.loadMapbox()
    this.setMapInstance()
  }

  mapFlyTo({ center, zoom }: ITrail): void {
    this._map.flyTo({ center, zoom })
  }

  setLayerVisibility(id: string): void {
    const { state: layers } = this._layerVisibilityService
    layers[id as keyof ILayerVisibility].isActive
      ? this._map.setLayoutProperty(id, 'visibility', 'visible') &&
        this._mapController.addLayerVisibilityEventListeners(id)
      : this._map.setLayoutProperty(id, 'visibility', 'none') &&
        this._mapController.removeLayerVisibilityEventListeners(id)
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

  private resetMapFeatures(): void {
    /* reset layers & marker visibility after delay to set mapStyle (basemap) */
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
}
