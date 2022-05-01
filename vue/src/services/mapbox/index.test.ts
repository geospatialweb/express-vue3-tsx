import { Container } from 'typedi'

import { MapboxService } from '@/services'
import { mockMapImplementation, testData } from '@/test'

describe('MapboxService test suite', () => {
  let mapboxService: MapboxService

  beforeEach(() => {
    mapboxService = Container.get(MapboxService)
  })

  test('loadMapbox method should be called', () => {
    const spy = vi.spyOn(mapboxService, 'loadMapbox').mockImplementation(mockMapImplementation)
    mapboxService.loadMapbox()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('mapFlyTo method should be called', () => {
    const { trailParams: params } = testData
    const spy = vi.spyOn(mapboxService, 'mapFlyTo').mockImplementation(mockMapImplementation)
    mapboxService.mapFlyTo(params)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('setInitialZoomState method should be called', () => {
    const { trailZoom: zoom } = testData
    const spy = vi.spyOn(mapboxService, 'setInitialZoomState').mockImplementation(mockMapImplementation)
    mapboxService.setInitialZoomState(zoom)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('removeMapInstance method should be called', () => {
    const spy = vi.spyOn(mapboxService, 'removeMapInstance').mockImplementation(mockMapImplementation)
    mapboxService.removeMapInstance()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
