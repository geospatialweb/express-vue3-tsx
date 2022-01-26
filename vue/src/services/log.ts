import { Service } from 'typedi'

import { LogData } from '@/types'

@Service()
export default class LogService {
  consoleError(message: string): void {
    console.error(message)
  }

  consoleLog(message: string, data: LogData): void {
    console.log(message, data)
  }

  consoleWarning(message: string): void {
    console.warn(message)
  }
}
