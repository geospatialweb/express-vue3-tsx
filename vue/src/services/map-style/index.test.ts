import { Container } from 'typedi'

import { MapStyleService } from '@/services'

describe('MapStyleService test suite', () => {
  let mapStyleService: MapStyleService

  beforeEach(() => {
    mapStyleService = Container.get(MapStyleService)
  })

  test('setMapStyle method should be called', () => {
    const spy = vi.spyOn(mapStyleService, 'setMapStyle')
    mapStyleService.setMapStyle()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('setMapStyleState method should be called', () => {
    const spy = vi.spyOn(mapStyleService, 'setMapStyleState')
    mapStyleService.setMapStyleState()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
