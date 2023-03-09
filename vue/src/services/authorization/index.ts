import mapboxgl from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { Endpoint } from '@/enums'
import { IEndpoint } from '@/interfaces'
import { HttpService, LogService } from '@/services'
import { HttpGetResponse } from '@/types'

@Service()
export default class AuthorizationService {
  private _endpoints: IEndpoint
  private _httpService: HttpService
  private _logService: LogService

  constructor() {
    this._endpoints = Endpoint
    this._httpService = Container.get(HttpService)
    this._logService = Container.get(LogService)
  }

  get mapboxAccessToken(): string {
    const { accessToken } = mapboxgl
    return accessToken
  }

  private set _mapboxAccessToken(token: string) {
    mapboxgl.accessToken = token
  }

  async getMapboxAccessToken(): Promise<void> {
    const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._endpoints
    const token = await this._httpGetRequest(MAPBOX_ACCESS_TOKEN_ENDPOINT)
    this._setMapboxAccessToken(<string>token)
  }

  private _setMapboxAccessToken(token: string): void {
    token
      ? (this._mapboxAccessToken = token)
      : this._consoleWarning(`No ${this.getMapboxAccessToken.name.slice(3)} Found`)
  }

  private async _httpGetRequest(endpoint: string): Promise<HttpGetResponse> {
    return this._httpService.get(endpoint)
  }

  private _consoleWarning(msg: string): void {
    this._logService.consoleWarning(msg)
  }
}
