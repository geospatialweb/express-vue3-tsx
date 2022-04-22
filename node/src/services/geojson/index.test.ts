import { FeatureCollection } from 'geojson'
import { QueryResultRow } from 'pg'

import { GeoJsonService } from '../'

describe('GeoJsonService test suite', () => {
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
    const geoJsonService = new GeoJsonService(features)
    const fc = geoJsonService.createGeoJsonFeatureCollection()
    expect(fc).toEqual(expectedGeoJsonFeatureCollection)
    expect(expectedGeoJsonFeatureCollection).toBe(expectedGeoJsonFeatureCollection)
  })

  test('createGeoJsonFeatureCollection returns valid GeoJSON FeatureCollection object with no features', () => {
    const features: QueryResultRow[] = []
    const expectedGeoJsonFeatureCollection: FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    }
    const geoJsonService = new GeoJsonService(features)
    const fc = geoJsonService.createGeoJsonFeatureCollection()
    expect(fc).toEqual(expectedGeoJsonFeatureCollection)
    expect(expectedGeoJsonFeatureCollection).toBe(expectedGeoJsonFeatureCollection)
  })
})
