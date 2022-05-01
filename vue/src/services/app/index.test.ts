import { Container } from 'typedi'

import { app } from '@/configuration'
import { StaticState } from '@/enums'
import { IApp } from '@/interfaces'
import { AppService, StoreService } from '@/services'

describe('AppService test suite', () => {
  test('state getter should equal app configuration object ', () => {
    const appService = Container.get(AppService)
    const { state } = appService
    expect(state).toEqual(<IApp>app)
  })

  test('state getter should return StoreService APP initial static state', () => {
    const { APP } = StaticState
    const storeService = Container.get(StoreService)
    const spy = vi.spyOn(storeService, 'getStaticState')
    storeService.getStaticState(APP)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(APP)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(<IApp>app)
  })

  test('setInitialZoom method should be called', () => {
    const appService = Container.get(AppService)
    const spy = vi.spyOn(appService, 'setInitialZoom')
    appService.setInitialZoom()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
