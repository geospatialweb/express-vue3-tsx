import { Request, Response } from 'express'
import { Container, Service } from 'typedi'

import { HTTP_CODES } from '../enums'
import { IQueryParams, IHttpCodes } from '../interfaces'
import { ApiService, LogService } from '../services'

@Service()
export default class ControllerService {
  private _httpCodes: IHttpCodes = HTTP_CODES

  constructor(private _apiService: ApiService, private _logService: LogService) {
    this._apiService = Container.get(ApiService)
    this._logService = Container.get(LogService)
  }

  async getGeoJsonFeatureCollection(req: Request, res: Response): Promise<Response> {
    /* prettier-ignore */
    const { method, originalUrl, query: { fields, table } } = req
    this.logRequest(method, originalUrl)
    const fc = await this._apiService.getGeoJsonFeatureCollection({ fields, table } as IQueryParams)
    return this.sendResponse(res, fc)
  }

  getMapboxAccessToken(req: Request, res: Response): Response {
    const { method, originalUrl } = req
    this.logRequest(method, originalUrl)
    const token = this._apiService.getMapboxAccessToken()
    return this.sendResponse(res, token)
  }

  private logRequest(method: string, url: string): void {
    const white = '\x1b[37m%s\x1b[0m'
    this._logService.consoleLog(`${method} ${url}`, white)
  }

  private logResponse(status: number): void {
    const green = '\x1b[32m%s\x1b[0m'
    this._logService.consoleLog(`JSON response status ${status}`, green)
  }

  private sendResponse(res: Response, response: any): Response {
    const { OK } = this._httpCodes
    this.logResponse(OK)
    return res
      .set({
        'Access-Control-Allow-Origin': '*'
      })
      .status(OK)
      .json(response)
  }
}
