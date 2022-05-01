import { Container } from 'typedi'

import { app, modal } from '@/configuration'
import { ReactiveState, StaticState } from '@/enums'
import { IApp, IModal } from '@/interfaces'
import { StoreService } from '@/services'

describe('StoreService test suite', () => {
  let storeService: StoreService

  beforeEach(() => {
    storeService = Container.get(StoreService)
  })

  test('getReactiveState method should be called with a return', () => {
    const { MODAL } = ReactiveState
    const spy = vi.spyOn(storeService, 'getReactiveState')
    storeService.getReactiveState(MODAL)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(MODAL)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(<IModal>modal)
  })

  test('setReactiveState method should be called', () => {
    const { MODAL } = ReactiveState
    const spy = vi.spyOn(storeService, 'setReactiveState')
    storeService.setReactiveState(MODAL, <IModal>modal)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(MODAL, <IModal>modal)
  })

  test('getStaticState method should be called with a return', () => {
    const { APP } = StaticState
    const spy = vi.spyOn(storeService, 'getStaticState')
    storeService.getStaticState(APP)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(APP)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(<IApp>app)
  })

  test('setStaticState method should be called', () => {
    const { APP } = StaticState
    const spy = vi.spyOn(storeService, 'setStaticState')
    storeService.setStaticState(APP, <IApp>app)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(APP, <IApp>app)
  })
})
