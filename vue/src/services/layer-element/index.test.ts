import { Container } from 'typedi'

import { layerElements } from '@/configuration'
import { ReactiveState } from '@/enums'
import { ILayerElement } from '@/interfaces'
import { LayerElementService, StoreService } from '@/services'
import { mockMapImplementation } from '@/test'

describe('LayerElementService test suite', () => {
  const ids = <string[]>layerElements.map((layer) => Object.values(layer)[0])

  test('state getter should equal layerElements configuration object ', () => {
    const layerElementService = Container.get(LayerElementService)
    const { state } = layerElementService
    expect(state).toEqual(<ILayerElement[]>layerElements)
  })

  test('state getter should return StoreService LAYER_ELEMENTS initial reactive state', () => {
    const { LAYER_ELEMENTS } = ReactiveState
    const storeService = Container.get(StoreService)
    const spy = vi.spyOn(storeService, 'getReactiveState')
    storeService.getReactiveState(LAYER_ELEMENTS)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(LAYER_ELEMENTS)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(<ILayerElement[]>layerElements)
  })

  test.each(ids)("pass '%s' id to displayLayerElement method", (id) => {
    const layerElementService = Container.get(LayerElementService)
    const spy = vi.spyOn(layerElementService, 'displayLayerElement').mockImplementation(mockMapImplementation)
    layerElementService.displayLayerElement(id)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(id)
  })
})
