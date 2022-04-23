import axios, { AxiosInstance, AxiosStatic } from 'axios'
import { Service } from 'typedi'

import { Url } from '@/enums'
import { IUrl } from '@/interfaces'

@Service()
export default class AxiosService {
  private _axios: AxiosStatic
  private _httpClient: AxiosInstance
  private _urls: IUrl

  constructor() {
    this._axios = axios
    this._httpClient = this._axios.create()
    this._urls = Url
    this._createHttpClient()
  }

  get httpClient(): AxiosInstance {
    return this._httpClient
  }

  private _createHttpClient(): void {
    this._httpClient = this._axios.create({
      baseURL: this._setBaseURL(),
      headers: { Accept: 'application/json' },
      timeout: 2000
    })
  }

  private _setBaseURL(): string {
    const { API_BASE_URL_DEV, API_BASE_URL_PROD } = this._urls
    if (import.meta.env.DEV) return API_BASE_URL_DEV
    return API_BASE_URL_PROD
  }
}
