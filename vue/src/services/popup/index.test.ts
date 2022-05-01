import { Feature } from 'geojson'
import { LngLatLike } from 'mapbox-gl'
import { Container } from 'typedi'

import { PopupService } from '@/services'
import { mockMapImplementation, testData } from '@/test'

describe('PopupService test suite', () => {
  let popupService: PopupService

  beforeEach(() => {
    popupService = Container.get(PopupService)
  })

  test('addLayerPopup method should be called', () => {
    /* prettier-ignore */
    const { layer: { features }, marker: { geometry: { coordinates } } } = testData
    const spy = vi.spyOn(popupService, 'addLayerPopup').mockImplementation(mockMapImplementation)
    popupService.addLayerPopup(<Feature>features[0], <LngLatLike>coordinates)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('addMarkerPopup method should be called', () => {
    const { marker } = testData
    const spy = vi.spyOn(popupService, 'addMarkerPopup').mockImplementation(mockMapImplementation)
    popupService.addMarkerPopup(<Feature>marker)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('removePopup method should be called', () => {
    const spy = vi.spyOn(popupService, 'removePopup').mockImplementation(mockMapImplementation)
    popupService.removePopup()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
