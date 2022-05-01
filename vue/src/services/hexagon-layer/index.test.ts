import { Container } from 'typedi'

import { hexagonLayer, hexagonUISliders as sliders } from '@/configuration'
import { ReactiveState } from '@/enums'
import { IHexagonLayerProp } from '@/interfaces'
import { HexagonLayerService, StoreService } from '@/services'
import { mockDeckImplementation } from '@/test'

describe('HexagonLayerService test suite', () => {
  test('state getter should equal HexagonLayer reactiveProps configuration object ', () => {
    const { reactiveProps } = hexagonLayer
    const hexagonLayerService = Container.get(HexagonLayerService)
    const { state } = hexagonLayerService
    expect(state).toEqual(<IHexagonLayerProp>reactiveProps)
  })

  test('state getter should return StoreService HEXAGON_LAYER_PROPS initial reactive state', () => {
    const { reactiveProps } = hexagonLayer
    const { HEXAGON_LAYER_PROPS } = ReactiveState
    const storeService = Container.get(StoreService)
    const spy = vi.spyOn(storeService, 'getReactiveState')
    storeService.getReactiveState(HEXAGON_LAYER_PROPS)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(HEXAGON_LAYER_PROPS)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(<IHexagonLayerProp>reactiveProps)
  })

  test('loadHexagonLayer method should be called', () => {
    const hexagonLayerService = Container.get(HexagonLayerService)
    const spy = vi.spyOn(hexagonLayerService, 'loadHexagonLayer').mockImplementation(mockDeckImplementation)
    hexagonLayerService.loadHexagonLayer()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('resetHexagonLayerPropsState method should be called', () => {
    const hexagonLayerService = Container.get(HexagonLayerService)
    const spy = vi.spyOn(hexagonLayerService, 'resetHexagonLayerPropsState').mockImplementation(mockDeckImplementation)
    hexagonLayerService.resetHexagonLayerPropsState()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('setHexagonLayerPropsState method should be called', () => {
    const { id, min: value } = sliders[0]
    const hexagonLayerService = Container.get(HexagonLayerService)
    const spy = vi.spyOn(hexagonLayerService, 'setHexagonLayerPropsState').mockImplementation(mockDeckImplementation)
    hexagonLayerService.setHexagonLayerPropsState(id, Number(value))
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
