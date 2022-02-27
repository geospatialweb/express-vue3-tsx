import { DSVRowArray } from 'd3-dsv'
import { Feature, FeatureCollection } from 'geojson'
import cloneDeep from 'lodash.clonedeep'
import mapboxgl from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { layers, layerParams, markerParams } from '@/configuration'
import { EndPoints, Urls } from '@/enums'
import { IHttpParams, ILayer, IQueryParams } from '@/interfaces'
import { GeoJsonLayerService, HttpService, LogService, MarkerService } from '@/services'
import { HttpGetResponse } from '@/types'

@Service()
export default class DataService {
  private _endPoints: Record<string, string> = EndPoints
  private _hexagonLayerData: Array<Array<number>> = []
  private _layers: Array<ILayer> = layers
  private _layerParams: Array<IQueryParams> = layerParams
  private _markerParams: Array<IQueryParams> = markerParams
  private _urls: Record<string, string> = Urls

  constructor(
    private _geoJsonLayerService: GeoJsonLayerService,
    private _httpService: HttpService,
    private _logService: LogService,
    private _markerService: MarkerService
  ) {
    this._geoJsonLayerService = Container.get(GeoJsonLayerService)
    this._httpService = Container.get(HttpService)
    this._logService = Container.get(LogService)
    this._markerService = Container.get(MarkerService)
  }

  get hexagonLayerData(): Array<Array<number>> {
    return this._hexagonLayerData
  }

  get mapboxAccessToken(): string {
    const { accessToken } = mapboxgl
    return accessToken
  }

  private set _mapboxAccessToken(token: string) {
    mapboxgl.accessToken = token
  }

  async loadData(): Promise<void> {
    await this.getGeoJsonLayerData()
    await this.getGeoJsonMarkerData()
    await this.getHexagonLayerData()
  }

  async getMapboxAccessToken(): Promise<void> {
    const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._endPoints
    const token = await this.httpGetRequest(MAPBOX_ACCESS_TOKEN_ENDPOINT)
    this.setMapboxAccessToken(<string>token)
  }

  private setMapboxAccessToken(token: string): void {
    token
      ? (this._mapboxAccessToken = token)
      : this._logService.consoleWarning(`No ${this.getMapboxAccessToken.name} Found`)
  }

  private async getHexagonLayerData(): Promise<void> {
    const { HEXAGON_LAYER_DATA_URL } = this._urls
    const data = await this._httpService.csv(HEXAGON_LAYER_DATA_URL)
    this.setHexagonLayerData(data as DSVRowArray<string>)
  }

  private setHexagonLayerData(data: DSVRowArray<string>): void {
    data?.length
      ? (this._hexagonLayerData = data.map((d): Array<number> => [Number(d.lng), Number(d.lat)]))
      : this._logService.consoleWarning(`No ${this.getHexagonLayerData.name} Found`)
  }

  private async getGeoJsonLayerData(): Promise<void> {
    for (const [i, layer] of this._layers.entries()) {
      const fc = await this.getGeoJsonFeatureCollection(this._layerParams[i])
      this.setGeoJsonLayer(layer, fc)
    }
  }

  private setGeoJsonLayer(layer: ILayer, fc: FeatureCollection): void {
    fc?.features?.length
      ? this._geoJsonLayerService.setLayer(layer, cloneDeep(fc))
      : this._logService.consoleWarning(`No ${this.getGeoJsonLayerData.name} Features Found`)
  }

  private async getGeoJsonMarkerData(): Promise<void> {
    for (const params of this._markerParams) {
      const { id } = params
      const { features } = await this.getGeoJsonFeatureCollection(params)
      this.setGeoJsonMarkers(id, features)
    }
  }

  private setGeoJsonMarkers(id: string, features: Array<Feature>): void {
    features?.length
      ? this._markerService.setMarkers(id, cloneDeep(features))
      : this._logService.consoleWarning(`No ${this.getGeoJsonMarkerData.name} Features Found`)
  }

  private async getGeoJsonFeatureCollection({ id, fields }: IQueryParams): Promise<FeatureCollection> {
    const { GEOJSON_ENDPOINT } = this._endPoints
    const params: IHttpParams = { fields, table: (id.includes('-') && id.split('-')[0]) || id }
    const fc = await this.httpGetRequest(GEOJSON_ENDPOINT, params)
    return <FeatureCollection>fc
  }

  private async httpGetRequest(url: string, params?: IHttpParams): Promise<HttpGetResponse> {
    return await this._httpService.get(url, { params })
  }
}
