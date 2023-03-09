import { FeatureCollection } from 'geojson'
import { QueryResultRow } from 'pg'
import { Container, Service } from 'typedi'

import { IQueryParam } from '../../interfaces'
import { GeoJSONService, LogService, PostgresService } from '../'

@Service()
export default class QueryService {
  private _geoJSONService: GeoJSONService
  private _logService: LogService
  private _postgresService: PostgresService

  constructor() {
    this._geoJSONService = Container.get(GeoJSONService)
    this._logService = Container.get(LogService)
    this._postgresService = Container.get(PostgresService)
  }

  async getGeoJSONFeatureCollection({ columns, table }: IQueryParam): Promise<FeatureCollection | void> {
    const { pool } = this._postgresService
    const query = `
      SELECT ST_AsGeoJSON(feature.*) AS geojson
      FROM (
        SELECT ${columns}
        FROM ${table}
      ) AS feature`
    return await pool
      .query(query)
      .then(({ rows: features }) => {
        this._logQuerySuccess('GeoJSON SQL')
        return this._geoJSONService.createGeoJSONFeatureCollection(<QueryResultRow[]>features)
      })
      .catch(({ message }) => this._logService.consoleError(<string>message))
  }

  getMapboxAccessToken(): string {
    /* prettier-ignore */
    const { env: { MAPBOX_ACCESS_TOKEN } } = process
    this._logQuerySuccess('Mapbox Access Token')
    return <string>MAPBOX_ACCESS_TOKEN
  }

  private _logQuerySuccess(query: string): void {
    const cyan = '\x1b[36m%s\x1b[0m'
    this._logService.consoleLog(`${query} query successful`, cyan)
  }
}
