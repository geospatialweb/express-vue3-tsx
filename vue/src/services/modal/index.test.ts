import { Container } from 'typedi'

import { modal } from '@/configuration'
import { ReactiveState } from '@/enums'
import { IModal } from '@/interfaces'
import { ModalService, StoreService } from '@/services'

describe('Modal test suite', () => {
  test('state getter should equal modal configuration object ', () => {
    const modalService = Container.get(ModalService)
    const { state } = modalService
    expect(state).toEqual(<IModal>modal)
  })

  test('state getter should return StoreService MODAL initial reactive state', () => {
    const { MODAL } = ReactiveState
    const storeService = Container.get(StoreService)
    const spy = vi.spyOn(storeService, 'getReactiveState')
    storeService.getReactiveState(MODAL)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(MODAL)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(<IModal>modal)
  })

  test('hideModal method should be called', () => {
    const modalService = Container.get(ModalService)
    const spy = vi.spyOn(modalService, 'hideModal')
    modalService.hideModal()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('showModal method should be called', () => {
    const modalService = Container.get(ModalService)
    const spy = vi.spyOn(modalService, 'showModal')
    modalService.showModal()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
