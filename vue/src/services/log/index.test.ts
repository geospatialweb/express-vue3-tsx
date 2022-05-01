import { Container } from 'typedi'

import { modal } from '@/configuration'
import { IModal } from '@/interfaces'
import { LogService } from '@/services'

describe('logService test suite', () => {
  let logService: LogService

  beforeEach(() => {
    logService = Container.get(LogService)
  })

  test('consoleError method should be called', () => {
    const message = 'http get failed'
    const spy = vi.spyOn(logService, 'consoleError')
    logService.consoleError(message)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('consoleLog method should be called', () => {
    const data: IModal = modal
    const message = 'modal NEW state:'
    const spy = vi.spyOn(logService, 'consoleLog')
    logService.consoleLog(message, data)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('consoleWarning method should be called', () => {
    const message = 'No getMapboxAccessToken Found'
    const spy = vi.spyOn(logService, 'consoleWarning')
    logService.consoleWarning(message)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
