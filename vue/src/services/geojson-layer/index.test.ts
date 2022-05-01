import { FeatureCollection } from 'geojson'
import { Container } from 'typedi'

import { layers } from '@/configuration'
import { GeoJsonLayerService } from '@/services'
import { testData } from '@/test'

describe('GeoJsonLayerService test suite', () => {
  test('setLayer method should be called', () => {
    const { layer } = testData
    const fc = <FeatureCollection>layer
    const geoJsonLayerService = Container.get(GeoJsonLayerService)
    const spy = vi.spyOn(geoJsonLayerService, 'setLayer')
    geoJsonLayerService.setLayer(layers[0], fc)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
