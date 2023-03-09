import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { csv } from 'd3-fetch'
import { Container, Service } from 'typedi'

import { AxiosService, LogService } from '@/services'
import { HttpCsvResponse, HttpGetResponse } from '@/types'

@Service()
export default class HttpService {
  private _csv
  private _httpClient: AxiosInstance
  private _axiosService: AxiosService
  private _logService: LogService

  constructor() {
    this._csv = csv
    this._axiosService = Container.get(AxiosService)
    const { httpClient } = this._axiosService
    this._httpClient = httpClient
    this._logService = Container.get(LogService)
  }

  async csv(url: string): Promise<HttpCsvResponse> {
    return this._csv(url)
      .then((data: HttpCsvResponse) => data)
      .catch(({ message }) => this._consoleError(<string>message))
  }

  async get(endpoint: string, params?: AxiosRequestConfig): Promise<HttpGetResponse> {
    return this._httpClient
      .get<HttpGetResponse>(endpoint, params)
      .then(({ data }) => data)
      .catch(({ message }) => this._consoleError(<string>message))
  }

  private _consoleError(message: string): void {
    this._logService.consoleError(message)
  }
}
