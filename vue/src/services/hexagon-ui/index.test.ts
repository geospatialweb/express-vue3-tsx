import { Container } from 'typedi'

import { hexagonUILabelElement, hexagonUISliders as sliders } from '@/configuration'
import { ReactiveState } from '@/enums'
import { IHexagonUILabelElement } from '@/interfaces'
import { HexagonUIService, StoreService } from '@/services'

describe('HexagonUIService test suite', () => {
  test('state getter should equal hexagonUILabelElement configuration object ', () => {
    const hexagonUIService = Container.get(HexagonUIService)
    const { state } = hexagonUIService
    expect(state).toEqual(<IHexagonUILabelElement>hexagonUILabelElement)
  })

  test('state getter should return StoreService HEXAGON_UI_LABEL_ELEMENT initial reactive state', () => {
    const { HEXAGON_UI_LABEL_ELEMENT } = ReactiveState
    const storeService = Container.get(StoreService)
    const spy = vi.spyOn(storeService, 'getReactiveState')
    storeService.getReactiveState(HEXAGON_UI_LABEL_ELEMENT)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(HEXAGON_UI_LABEL_ELEMENT)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(<IHexagonUILabelElement>hexagonUILabelElement)
  })

  test('setHexagonUILabelElementState method should be called', () => {
    const id = sliders[0].id
    const hexagonUIService = Container.get(HexagonUIService)
    const spy = vi.spyOn(hexagonUIService, 'setHexagonUILabelElementState')
    hexagonUIService.setHexagonUILabelElementState(id)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
