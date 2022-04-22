import { Response } from 'express'
import { Container, Service } from 'typedi'

import { HTTP_CODE } from '../../enums'
import { IHttpCode } from '../../interfaces'
import { LogService } from '../'

@Service()
export default class ResponseService {
  private _logService: LogService

  constructor() {
    this._logService = Container.get(LogService)
  }
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  sendResponse(res: Response, payload: any): Response<any, Record<string, any>> {
    const { OK }: IHttpCode = HTTP_CODE
    this._logResponse(OK)
    return res
      .set({
        'Access-Control-Allow-Origin': '*'
      })
      .status(OK)
      .json(payload)
  }

  private _logResponse(status: number): void {
    const green = '\x1b[32m%s\x1b[0m'
    this._logService.consoleLog(`JSON response status ${status}`, green)
  }
}
