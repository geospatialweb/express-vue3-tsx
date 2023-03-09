import { DSVRowArray } from 'd3-dsv'
import { FeatureCollection } from 'geojson'
import cloneDeep from 'lodash.clonedeep'
import { Container, Service } from 'typedi'

import { layers, layerParams, markerParams } from '@/configuration'
import { Endpoint, Url } from '@/enums'
import { IEndpoint, IHttpParam, ILayer, IQueryParam, IUrl } from '@/interfaces'
import { GeoJSONLayerService, HttpService, LogService, MarkerService } from '@/services'
import { HttpCsvResponse, HttpGetResponse } from '@/types'

@Service()
export default class DataService {
  private _endpoints: IEndpoint
  private _hexagonLayerData: number[][]
  private _layers: ILayer[]
  private _layerParams: IQueryParam[]
  private _markerParams: IQueryParam[]
  private _urls: IUrl
  private _geoJSONLayerService: GeoJSONLayerService
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
    this._geoJSONLayerService = Container.get(GeoJSONLayerService)
    this._httpService = Container.get(HttpService)
    this._logService = Container.get(LogService)
    this._markerService = Container.get(MarkerService)
  }

  get hexagonLayerData(): number[][] {
    return this._hexagonLayerData
  }

  async loadData(): Promise<void> {
    await this._getGeoJSONLayerData()
    await this._getGeoJSONMarkerData()
    await this._getHexagonLayerData()
  }

  private async _getHexagonLayerData(): Promise<void> {
    const { HEXAGON_LAYER_DATA_URL } = this._urls
    const data = await this._httpCsvRequest(HEXAGON_LAYER_DATA_URL)
    this._setHexagonLayerData(<DSVRowArray<string>>data)
  }

  private _setHexagonLayerData(data: DSVRowArray<string>): void {
    data?.length
      ? (this._hexagonLayerData = data.map((d): number[] => [Number(d.lng), Number(d.lat)]))
      : this._consoleWarning(`No ${this._getHexagonLayerData.name.slice(4)} Found`)
  }

  private async _getGeoJSONLayerData(): Promise<void> {
    for (const [i, layer] of this._layers.entries()) {
      const fc = await this._getGeoJSONFeatureCollection(this._layerParams[i])
      this._setGeoJSONLayer(layer, fc)
    }
  }

  private _setGeoJSONLayer(layer: ILayer, fc: FeatureCollection): void {
    fc?.features?.length
      ? this._geoJSONLayerService.setLayer(layer, cloneDeep(fc))
      : this._consoleWarning(`No ${this._getGeoJSONLayerData.name.slice(4)} Features Found`)
  }

  private async _getGeoJSONMarkerData(): Promise<void> {
    for (const params of this._markerParams) {
      const { id } = params
      const fc = await this._getGeoJSONFeatureCollection(params)
      this._setGeoJSONMarkers(id, fc)
    }
  }

  private _setGeoJSONMarkers(id: string, fc: FeatureCollection): void {
    fc?.features?.length
      ? this._markerService.setMarkers(id, cloneDeep(fc.features))
      : this._consoleWarning(`No ${this._getGeoJSONMarkerData.name.slice(4)} Features Found`)
  }

  private async _getGeoJSONFeatureCollection({ columns, id }: IQueryParam): Promise<FeatureCollection> {
    const { GEOJSON_ENDPOINT } = this._endpoints
    const params: IHttpParam = { columns, table: (id.includes('-') && id.split('-')[0]) || id }
    const data = await this._httpGetRequest(GEOJSON_ENDPOINT, params)
    return <FeatureCollection>data
  }

  private async _httpGetRequest(endpoint: string, params: IHttpParam): Promise<HttpGetResponse> {
    return this._httpService.get(endpoint, { params })
  }

  private async _httpCsvRequest(url: string): Promise<HttpCsvResponse> {
    return this._httpService.csv(url)
  }

  private _consoleWarning(msg: string): void {
    this._logService.consoleWarning(msg)
  }
}
