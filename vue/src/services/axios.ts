import axios, { AxiosInstance, AxiosStatic } from 'axios'
import { Service } from 'typedi'

import { Urls } from '@/enums'

@Service()
export default class AxiosService {
  private _axios: AxiosStatic = axios
  private _urls: Record<string, string> = Urls

  constructor(private _httpClient: AxiosInstance) {
    this.createHttpClient()
  }

  get httpClient(): AxiosInstance {
    return this._httpClient
  }

  private createHttpClient(): void {
    this._httpClient = this._axios.create({
      baseURL: this.setBaseURL(),
      headers: { Accept: 'application/json' },
      timeout: 2000
    })
  }

  private setBaseURL(): string {
    const { API_BASE_URL_DEV, API_BASE_URL_PROD } = this._urls
    if (import.meta.env.DEV) return API_BASE_URL_DEV
    return API_BASE_URL_PROD
  }
}
