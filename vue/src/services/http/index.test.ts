import { AxiosRequestConfig } from 'axios'
import { Container } from 'typedi'

import { Endpoint, Url } from '@/enums'
import { HttpService } from '@/services'
import { testData } from '@/test'

describe('HttpService test suite', () => {
  let httpService: HttpService

  beforeEach(() => {
    httpService = Container.get(HttpService)
  })

  test.todo('csv method should be called', async () => {
    const { HEXAGON_LAYER_DATA_URL } = Url
    const spy = vi.spyOn(httpService, 'csv')
    await httpService.csv(HEXAGON_LAYER_DATA_URL)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('get method should be called', async () => {
    const { GEOJSON_ENDPOINT } = Endpoint
    const { queryParams } = testData
    const spy = vi.spyOn(httpService, 'get')
    await httpService.get(GEOJSON_ENDPOINT, <AxiosRequestConfig>{ queryParams })
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
