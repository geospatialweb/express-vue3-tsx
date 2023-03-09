import { Service } from 'typedi'

import { LogData } from '@/types'

@Service()
export default class LogService {
  consoleError(msg: string): void {
    console.error(msg)
  }

  consoleLog(msg: string, data: LogData): void {
    console.log(msg, data)
  }

  consoleWarning(msg: string): void {
    console.warn(msg)
  }
}
