import { FeatureCollection } from 'geojson'
import { Container } from 'typedi'

import { layers } from '@/configuration'
import { GeoJSONLayerService } from '@/services'
import { testData } from '@/test'

describe('GeoJSONLayerService test suite', () => {
  test('setLayer method should be called', () => {
    const { layer } = testData
    const fc = <FeatureCollection>layer
    const geoJSONLayerService = Container.get(GeoJSONLayerService)
    const spy = vi.spyOn(geoJSONLayerService, 'setLayer')
    geoJSONLayerService.setLayer(layers[0], fc)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
