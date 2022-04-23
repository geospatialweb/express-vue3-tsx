import { DSVRowArray } from 'd3-dsv'
import { Feature, FeatureCollection } from 'geojson'
import cloneDeep from 'lodash.clonedeep'
import mapboxgl from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { layers, layerParams, markerParams } from '@/configuration'
import { Endpoint, Url } from '@/enums'
import { IEndpoint, IHttpParam, ILayer, IQueryParam, IUrl } from '@/interfaces'
import { GeoJsonLayerService, HttpService, LogService, MarkerService } from '@/services'
import { HttpCsvResponse, HttpGetResponse } from '@/types'

@Service()
export default class DataService {
  private _endpoints: IEndpoint
  private _hexagonLayerData: number[][]
  private _layers: ILayer[]
  private _layerParams: IQueryParam[]
  private _markerParams: IQueryParam[]
  private _urls: IUrl
  private _geoJsonLayerService: GeoJsonLayerService
  private _httpService: HttpService
  private _logService: LogService
  private _markerService: MarkerService

  constructor() {
    this._endpoints = Endpoint
    this._hexagonLayerData = []
    this._layers = layers
    this._layerParams = layerParams
    this._markerParams = markerParams
    this._urls = Url
    this._geoJsonLayerService = Container.get(GeoJsonLayerService)
    this._httpService = Container.get(HttpService)
    this._logService = Container.get(LogService)
    this._markerService = Container.get(MarkerService)
  }

  get hexagonLayerData(): number[][] {
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
    await this._getGeoJsonLayerData()
    await this._getGeoJsonMarkerData()
    await this._getHexagonLayerData()
  }

  async getMapboxAccessToken(): Promise<void> {
    const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._endpoints
    const token = await this._httpGetRequest(MAPBOX_ACCESS_TOKEN_ENDPOINT)
    this._setMapboxAccessToken(<string>token)
  }

  private _setMapboxAccessToken(token: string): void {
    token ? (this._mapboxAccessToken = token) : this._consoleWarning(`No ${this.getMapboxAccessToken.name} Found`)
  }

  private async _getHexagonLayerData(): Promise<void> {
    const { HEXAGON_LAYER_DATA_URL } = this._urls
    const data = await this._httpCsvRequest(HEXAGON_LAYER_DATA_URL)
    this._setHexagonLayerData(<DSVRowArray<string>>data)
  }

  private _setHexagonLayerData(data: DSVRowArray<string>): void {
    data?.length
      ? (this._hexagonLayerData = data.map((d): number[] => [Number(d.lng), Number(d.lat)]))
      : this._consoleWarning(`No ${this._getHexagonLayerData.name} Found`)
  }

  private async _getGeoJsonLayerData(): Promise<void> {
    for (const [i, layer] of this._layers.entries()) {
      const fc = await this._getGeoJsonFeatureCollection(this._layerParams[i])
      this._setGeoJsonLayer(layer, fc)
    }
  }

  private _setGeoJsonLayer(layer: ILayer, fc: FeatureCollection): void {
    fc?.features?.length
      ? this._geoJsonLayerService.setLayer(layer, cloneDeep(fc))
      : this._consoleWarning(`No ${this._getGeoJsonLayerData.name} Features Found`)
  }

  private async _getGeoJsonMarkerData(): Promise<void> {
    for (const params of this._markerParams) {
      const { id } = params
      const { features } = await this._getGeoJsonFeatureCollection(params)
      this._setGeoJsonMarkers(id, features)
    }
  }

  private _setGeoJsonMarkers(id: string, features: Feature[]): void {
    features?.length
      ? this._markerService.setMarkers(id, cloneDeep(features))
      : this._consoleWarning(`No ${this._getGeoJsonMarkerData.name} Features Found`)
  }

  private async _getGeoJsonFeatureCollection({ id, fields }: IQueryParam): Promise<FeatureCollection> {
    const { GEOJSON_ENDPOINT } = this._endpoints
    const params: IHttpParam = { fields, table: (id.includes('-') && id.split('-')[0]) || id }
    const fc = await this._httpGetRequest(GEOJSON_ENDPOINT, params)
    return <FeatureCollection>fc
  }

  private async _httpGetRequest(endpoint: string, params?: IHttpParam): Promise<HttpGetResponse> {
    return await this._httpService.get(endpoint, { params })
  }

  private async _httpCsvRequest(url: string): Promise<HttpCsvResponse> {
    return await this._httpService.csv(url)
  }

  private _consoleWarning(message: string): void {
    this._logService.consoleWarning(message)
  }
}
