import { Request, Response } from 'express'
import { FeatureCollection } from 'geojson'
import { Container, Service } from 'typedi'

import { HTTP_CODES } from '../enums'
import { IQueryParams } from '../interfaces'
import { ApiService, LogService } from '../services'

@Service()
export default class ControllerService {
  constructor(private _apiService: ApiService, private _logService: LogService) {
    this._apiService = Container.get(ApiService)
    this._logService = Container.get(LogService)
  }

  async getGeoJsonFeatureCollection(req: Request, res: Response): Promise<Response> {
    /* prettier-ignore */
    const { method, originalUrl, query: { fields, table } } = req
    this.logRequest(method, originalUrl)
    const fc: FeatureCollection = await this._apiService.getGeoJsonFeatureCollection({ fields, table } as IQueryParams)
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
  private logResponse(): void {
    const green = '\x1b[32m%s\x1b[0m'
    this._logService.consoleLog('JSON response status 200', green)
  }
  private sendResponse = (res: Response, response: FeatureCollection | string): Response => {
    const { OK } = HTTP_CODES
    this.logResponse()
    return res
      .set({
        'Access-Control-Allow-Origin': '*'
      })
      .status(OK)
      .json(response)
  }
}
