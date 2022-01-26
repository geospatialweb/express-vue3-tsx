import { QueryResultRow } from 'pg'
import { Container, Service } from 'typedi'

import { IQueryParams } from '../interfaces'
import { GeoJsonService, LogService, PostgresService } from '../services'

@Service()
export default class ApiService {
  constructor(
    private _geoJsonService: GeoJsonService,
    private _logService: LogService,
    private _postgresService: PostgresService
  ) {
    this._geoJsonService = Container.get(GeoJsonService)
    this._logService = Container.get(LogService)
    this._postgresService = Container.get(PostgresService)
  }

  async getGeoJsonFeatureCollection({ fields, table }: IQueryParams): Promise<any> {
    const { pool } = this._postgresService
    const query = `
      SELECT ST_AsGeoJSON(feature.*) AS geojson
      FROM (
        SELECT ${fields}
        FROM ${table}
      ) AS feature`
    return await pool
      .query(query)
      .then(({ rows }) => {
        this.logQuerySuccess()
        return this._geoJsonService.createGeoJsonFeatureCollection(rows as Array<QueryResultRow>)
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
