import { FeatureCollection } from 'geojson'
import { QueryResultRow } from 'pg'
import { Container } from 'typedi'

import { GeoJsonService } from '../'

describe('GeoJsonService test suite', () => {
  let geoJsonService: GeoJsonService
  let spy: jest.SpyInstance

  beforeEach(() => {
    geoJsonService = Container.get(GeoJsonService)
    spy = jest.spyOn(geoJsonService, 'createGeoJsonFeatureCollection')
  })

  afterEach(() => spy.mockRestore())

  test('createGeoJsonFeatureCollection returns valid GeoJSON FeatureCollection object with features', () => {
    const features: QueryResultRow[] = [
      {
        geojson:
          '{"type": "Feature", "geometry": {"type":"Point","coordinates":[-76.011422,44.384362]}, "properties": {"name": "Frontenac Arch Biosphere Office", "description": "19 Reynolds Road, Lansdowne, ON. Open Monday to Friday 8:30am - 4:30pm"}}'
      }
    ]
    const expectedGeoJsonFeatureCollection: FeatureCollection = {
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
    geoJsonService.createGeoJsonFeatureCollection(features)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(features)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(expectedGeoJsonFeatureCollection)
  })

  test('createGeoJsonFeatureCollection returns valid GeoJSON FeatureCollection object with no features', () => {
    const features: QueryResultRow[] = []
    const expectedGeoJsonFeatureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    }
    geoJsonService.createGeoJsonFeatureCollection(features)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(features)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(expectedGeoJsonFeatureCollection)
  })
})
