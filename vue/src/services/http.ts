import { AxiosRequestConfig } from 'axios'
import { csv } from 'd3-fetch'
import { Container, Service } from 'typedi'

import { AxiosService, LogService } from '@/services'
import { HttpCsvResponse, HttpGetResponse } from '@/types'

@Service()
export default class HttpService {
  private _csv = csv

  constructor(private _axiosService: AxiosService, private _logService: LogService) {
    this._axiosService = Container.get(AxiosService)
    this._logService = Container.get(LogService)
  }

  async csv(url: string): Promise<HttpCsvResponse> {
    return this._csv(url)
      .then((data: HttpCsvResponse) => data)
      .catch(({ message }) => this._logService.consoleError(<string>message))
  }

  async get(endpoint: string, params?: AxiosRequestConfig): Promise<HttpGetResponse> {
    const { httpClient } = this._axiosService
    return httpClient
      .get<HttpGetResponse>(endpoint, params)
      .then(({ data }) => data)
      .catch(({ message }) => this._logService.consoleError(<string>message))
  }
}
