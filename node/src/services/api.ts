import { FeatureCollection } from 'geojson'
import { QueryResultRow } from 'pg'
import { Container, Service } from 'typedi'

import { IQueryParams } from '../interfaces'
import { GeoJsonService, LogService, PostgresService } from '../services'

@Service()
export default class ApiService {
  private _geoJsonService = GeoJsonService

  constructor(private _logService: LogService, private _postgresService: PostgresService) {
    this._logService = Container.get(LogService)
    this._postgresService = Container.get(PostgresService)
  }

  async getGeoJsonFeatureCollection({ fields, table }: IQueryParams): Promise<FeatureCollection | void> {
    const { pool } = this._postgresService
    const query = `
      SELECT ST_AsGeoJSON(feature.*) AS geojson
      FROM (
        SELECT ${fields}
        FROM ${table}
      ) AS feature`
    return await pool
      .query(query)
      .then(({ rows: features }) => {
        this.logQuerySuccess()
        const geoJsonService = new this._geoJsonService(features as Array<QueryResultRow>)
        return geoJsonService.createGeoJsonFeatureCollection()
      })
      .catch(({ message }) => this._logService.consoleError(<string>message))
  }

  getMapboxAccessToken(): string {
    /* prettier-ignore */
    const { env: { MAPBOX_ACCESS_TOKEN } } = process
    return <string>MAPBOX_ACCESS_TOKEN
  }

  private logQuerySuccess(): void {
    const cyan = '\x1b[36m%s\x1b[0m'
    this._logService.consoleLog('SQL query successful', cyan)
  }
}
