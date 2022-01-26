import { Service } from 'typedi'

@Service()
export default class LogService {
  consoleError(message: string): void {
    console.error(message)
  }

  consoleLog(message: string, colour: string): void {
    console.log(colour, message)
  }
}
