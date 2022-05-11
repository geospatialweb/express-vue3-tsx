import { Feature } from 'geojson'
import { Container } from 'typedi'

import { LayerElement } from '@/enums'
import { MarkerService } from '@/services'
import { mockMapImplementation, testData } from '@/test'

describe('MarkerService test suite', () => {
  let markerService: MarkerService

  beforeEach(() => {
    markerService = Container.get(MarkerService)
  })

  test('setMarkers method should be called', () => {
    const { OFFICE } = LayerElement
    const { marker } = testData
    const features: Feature[] = [<Feature>marker]
    const spy = vi.spyOn(markerService, 'setMarkers')
    markerService.setMarkers(OFFICE, features)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('setHiddenMarkersVisibility method should be called', () => {
    const spy = vi.spyOn(markerService, 'setHiddenMarkersVisibility')
    markerService.setHiddenMarkersVisibility()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('toggleMarkerVisibility method should be called', () => {
    const { OFFICE } = LayerElement
    const spy = vi.spyOn(markerService, 'toggleMarkerVisibility').mockImplementation(mockMapImplementation)
    markerService.toggleMarkerVisibility(OFFICE)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
