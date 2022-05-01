import { Container } from 'typedi'

import { layerElements } from '@/configuration'
import { RouterService } from '@/services'

describe('RouterService test suite', () => {
  test('setRoute method should be called', async () => {
    const { id } = layerElements[5]
    const routerService = Container.get(RouterService)
    const spy = vi.spyOn(routerService, 'setRoute')
    await routerService.setRoute(id)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
