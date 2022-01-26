import { Feature, FeatureCollection } from 'geojson'
import { QueryResultRow } from 'pg'
import { Service } from 'typedi'

@Service()
export default class GeoJsonService {
  createGeoJsonFeatureCollection(features: Array<QueryResultRow>): FeatureCollection {
    const fc: FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    }
    if (features.length) {
      fc.features = features.map(({ geojson }): Feature => JSON.parse(<string>geojson) as Feature)
    }
    return fc
  }
}
