import { Container } from 'typedi'

import { trails } from '@/configuration'
import { TrailService } from '@/services'
import { mockMapImplementation, testData } from '@/test'

describe('TrailService test suite', () => {
  let trailService: TrailService

  beforeEach(() => {
    trailService = Container.get(TrailService)
  })

  test('selectTrail method should be called', () => {
    const { name } = trails[0]
    const spy = vi.spyOn(trailService, 'selectTrail').mockImplementation(mockMapImplementation)
    trailService.selectTrail(name)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('setInitialZoom method should be called', () => {
    const { initialZoomFactor: factor } = testData
    const spy = vi.spyOn(trailService, 'setInitialZoom')
    trailService.setInitialZoom(factor)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
