import { Feature, FeatureCollection } from 'geojson'
import { QueryResultRow } from 'pg'
import { Service } from 'typedi'

@Service()
export default class GeoJSONService {
  createGeoJSONFeatureCollection(features: QueryResultRow[]): FeatureCollection {
    const fc: FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    }
    features.length && (fc.features = features.map(({ geojson }): Feature => <Feature>JSON.parse(<string>geojson)))
    return fc
  }
}
