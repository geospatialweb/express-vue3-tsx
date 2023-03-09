import { Container } from 'typedi'

import { IQueryParam } from '../../interfaces'
import { PostgresService, QueryService } from '../'

describe('QueryService test suite', () => {
  let queryService: QueryService

  beforeEach(() => {
    const postgresService = Container.get(PostgresService)
    postgresService.setPoolConnection()
    queryService = Container.get(QueryService)
  })

  test('getGeoJSONFeatureCollection method should be called with a return', async () => {
    const queryParams: IQueryParam = {
      columns: 'name,description,geom',
      table: 'office'
    }
    const spy = jest.spyOn(queryService, 'getGeoJSONFeatureCollection')
    await queryService.getGeoJSONFeatureCollection(queryParams)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(queryParams)
    expect(spy).toHaveReturnedTimes(1)
  })

  test('getMapboxAccessToken method should be called with a return', () => {
    const spy = jest.spyOn(queryService, 'getMapboxAccessToken')
    queryService.getMapboxAccessToken()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveReturnedTimes(1)
  })
})
