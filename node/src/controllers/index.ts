import { Request, Response } from 'express'
import { FeatureCollection } from 'geojson'
import { Container } from 'typedi'

import { IQueryParams } from '../interfaces'
import { ApiService, LogService } from '../services'

const logRequest = (method: string, url: string): void => {
  const white = '\x1b[37m%s\x1b[0m'
  const logService = Container.get(LogService)
  logService.consoleLog(`${method} ${url}`, white)
}
const logResponse = (): void => {
  const green = '\x1b[32m%s\x1b[0m'
  const logService = Container.get(LogService)
  logService.consoleLog('JSON response status 200', green)
}
const sendResponse = (res: Response, response: FeatureCollection | string): Response => {
  logResponse()
  return res
    .set({
      'Access-Control-Allow-Origin': '*'
    })
    .status(200)
    .json(response)
}

export async function getGeoJsonFeatureCollection(req: Request, res: Response): Promise<Response> {
  /* prettier-ignore */
  const { method, originalUrl, query: { fields, table } } = req
  logRequest(method, originalUrl)
  const apiService: ApiService = Container.get(ApiService)
  const fc: FeatureCollection = await apiService.getGeoJsonFeatureCollection({ fields, table } as IQueryParams)
  return sendResponse(res, fc)
}
export function getMapboxAccessToken(req: Request, res: Response): Response {
  const { method, originalUrl } = req
  logRequest(method, originalUrl)
  const apiService: ApiService = Container.get(ApiService)
  const token = apiService.getMapboxAccessToken()
  return sendResponse(res, token)
}
