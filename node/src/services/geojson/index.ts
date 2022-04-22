import { Feature, FeatureCollection } from 'geojson'
import { QueryResultRow } from 'pg'

export default class GeoJsonService {
  private _features: QueryResultRow[]

  constructor(features: QueryResultRow[]) {
    this._features = features
  }

  createGeoJsonFeatureCollection(): FeatureCollection {
    const fc: FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    }
    if (this._features.length) {
      fc.features = this._features.map(({ geojson }): Feature => <Feature>JSON.parse(<string>geojson))
    }
    return fc
  }
}
