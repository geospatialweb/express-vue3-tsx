import { Container } from 'typedi'

import { DataService } from '@/services'

describe('DataService test suite', () => {
  test.todo('loadData method should be called', async () => {
    const dataService = Container.get(DataService)
    const spy = vi.spyOn(dataService, 'loadData')
    await dataService.loadData()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getMapboxAccessToken method should be called with a return', async () => {
    const dataService = Container.get(DataService)
    const spy = vi.spyOn(dataService, 'getMapboxAccessToken')
    await dataService.getMapboxAccessToken()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveReturnedTimes(1)
  })
})
