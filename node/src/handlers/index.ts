import { Request, Response } from 'express'
import { Container } from 'typedi'

import { IQueryParam } from '../interfaces'
import { LogService, QueryService, ResponseService } from '../services'

const queryService = Container.get(QueryService)
const responseService = Container.get(ResponseService)
const logRequest = (method: string, url: string): void => {
  const white = '\x1b[37m%s\x1b[0m'
  const logService = Container.get(LogService)
  logService.consoleLog(`${method} ${url}`, white)
}

export async function getGeoJSONFeatureCollection(req: Request, res: Response): Promise<Response> {
  /* prettier-ignore */
  const { method, originalUrl, query: { columns, table } } = req
  logRequest(method, originalUrl)
  const fc = await queryService.getGeoJSONFeatureCollection(<IQueryParam>{ columns, table })
  return responseService.sendResponse(res, fc)
}

export function getMapboxAccessToken(req: Request, res: Response): Response {
  const { method, originalUrl } = req
  logRequest(method, originalUrl)
  const token = queryService.getMapboxAccessToken()
  return responseService.sendResponse(res, token)
}
