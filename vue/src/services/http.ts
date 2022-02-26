import { AxiosRequestConfig } from 'axios'
import { csv } from 'd3-fetch'
import { Container, Service } from 'typedi'

import { AxiosService, LogService } from '@/services'

@Service()
export default class HttpService {
  private _csv = csv

  constructor(private _axiosService: AxiosService, private _logService: LogService) {
    this._axiosService = Container.get(AxiosService)
    this._logService = Container.get(LogService)
  }

  async csv(url: string): Promise<any> {
    return this._csv(url)
      .then((data) => data)
      .catch(({ message }) => this._logService.consoleError(<string>message))
  }

  async get(url: string, params?: AxiosRequestConfig): Promise<any> {
    const { httpClient } = this._axiosService
    return httpClient
      .get<Record<string, string>>(url, params)
      .then(({ data }) => data)
      .catch(({ message }) => this._logService.consoleError(<string>message))
  }
}
