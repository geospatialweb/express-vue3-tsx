import { Request, Response } from 'express'
import { Container } from 'typedi'

import { HTTP_CODES } from '../enums'
import { IHttpCodes, IQueryParams } from '../interfaces'
import { ApiService, LogService } from '../services'

const logRequest = (method: string, url: string): void => {
  const white = '\x1b[37m%s\x1b[0m'
  const logService = Container.get(LogService)
  logService.consoleLog(`${method} ${url}`, white)
}
const logResponse = (status: number): void => {
  const green = '\x1b[32m%s\x1b[0m'
  const logService = Container.get(LogService)
  logService.consoleLog(`JSON response status ${status}`, green)
}
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const sendResponse = (res: Response, response: any): Response<any, Record<string, any>> => {
  const { OK }: IHttpCodes = HTTP_CODES
  logResponse(OK)
  return res
    .set({
      'Access-Control-Allow-Origin': '*'
    })
    .status(OK)
    .json(response)
}

export async function getGeoJsonFeatureCollection(req: Request, res: Response): Promise<Response> {
  /* prettier-ignore */
  const { method, originalUrl, query: { fields, table } } = req
  logRequest(method, originalUrl)
  const apiService = Container.get(ApiService)
  const fc = await apiService.getGeoJsonFeatureCollection({ fields, table } as IQueryParams)
  return sendResponse(res, fc)
}

export function getMapboxAccessToken(req: Request, res: Response): Response {
  const { method, originalUrl } = req
  logRequest(method, originalUrl)
  const apiService = Container.get(ApiService)
  const token = apiService.getMapboxAccessToken()
  return sendResponse(res, token)
}
