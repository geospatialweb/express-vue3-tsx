import { Container } from 'typedi'

import { PostgresService } from '../'

describe('PostgresService test suite', () => {
  test('setPoolConnection method should be called', () => {
    const postgresService = Container.get(PostgresService)
    const spy = jest.spyOn(postgresService, 'setPoolConnection')
    postgresService.setPoolConnection()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
