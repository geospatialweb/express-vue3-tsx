import { Container } from 'typedi'

import { LayerElement } from '@/enums'
import { MapService } from '@/services'
import { mockMapImplementation } from '@/test'

describe('MapService test suite', () => {
  let mapService: MapService

  beforeEach(() => {
    mapService = Container.get(MapService)
  })

  test('loadMapLayer method should be called', () => {
    const spy = vi.spyOn(mapService, 'loadMapLayer').mockImplementation(mockMapImplementation)
    mapService.loadMapLayer()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('setLayerVisibility method should be called', () => {
    const { BIOSPHERE } = LayerElement
    const spy = vi.spyOn(mapService, 'setLayerVisibility').mockImplementation(mockMapImplementation)
    mapService.setLayerVisibility(BIOSPHERE)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('setMapStyle method should be called', () => {
    const spy = vi.spyOn(mapService, 'setMapStyle').mockImplementation(mockMapImplementation)
    mapService.setMapStyle()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
