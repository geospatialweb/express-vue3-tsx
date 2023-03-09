import { Container } from 'typedi'

import { DataService } from '@/services'

describe('DataService test suite', () => {
  test.todo('loadData method should be called', async () => {
    const dataService = Container.get(DataService)
    const spy = vi.spyOn(dataService, 'loadData')
    await dataService.loadData()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
