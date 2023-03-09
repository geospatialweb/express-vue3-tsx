import { FeatureCollection } from 'geojson'
import { QueryResultRow } from 'pg'
import { Container } from 'typedi'

import { GeoJSONService } from '../'

describe('GeoJSONService test suite', () => {
  let geoJSONService: GeoJSONService
  let spy: jest.SpyInstance

  beforeEach(() => {
    geoJSONService = Container.get(GeoJSONService)
    spy = jest.spyOn(geoJSONService, 'createGeoJSONFeatureCollection')
  })

  afterEach(() => spy.mockRestore())

  test('createGeoJSONFeatureCollection returns valid GeoJSON FeatureCollection object with features', () => {
    const features: QueryResultRow[] = [
      {
        geojson:
          '{"type": "Feature", "geometry": {"type":"Point","coordinates":[-76.011422,44.384362]}, "properties": {"name": "Frontenac Arch Biosphere Office", "description": "19 Reynolds Road, Lansdowne, ON. Open Monday to Friday 8:30am - 4:30pm"}}'
      }
    ]
    const expectedGeoJSONFeatureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-76.011422, 44.384362]
          },
          properties: {
            name: 'Frontenac Arch Biosphere Office',
            description: '19 Reynolds Road, Lansdowne, ON. Open Monday to Friday 8:30am - 4:30pm'
          }
        }
      ]
    }
    geoJSONService.createGeoJSONFeatureCollection(features)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(features)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(expectedGeoJSONFeatureCollection)
  })

  test('createGeoJSONFeatureCollection returns valid GeoJSON FeatureCollection object with no features', () => {
    const features: QueryResultRow[] = []
    const expectedGeoJSONFeatureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    }
    geoJSONService.createGeoJSONFeatureCollection(features)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(features)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(expectedGeoJSONFeatureCollection)
  })
})
