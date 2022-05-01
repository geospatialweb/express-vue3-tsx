import { Container } from 'typedi'

import { LogService } from '../'

describe('logService test suite', () => {
  let logService: LogService

  beforeEach(() => {
    logService = Container.get(LogService)
  })

  test('consoleError method should be called', () => {
    const message = 'password authentication failed'
    const spy = jest.spyOn(logService, 'consoleError')
    logService.consoleError(message)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('consoleLog method should be called', () => {
    const colour = '\x1b[36m%s\x1b[0m'
    const message = 'PostgreSQL pool connected'
    const spy = jest.spyOn(logService, 'consoleLog')
    logService.consoleLog(colour, message)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
