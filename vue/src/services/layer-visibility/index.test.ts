import { Container } from 'typedi'

import { layerVisibility } from '@/configuration'
import { LayerElement, StaticState } from '@/enums'
import { ILayerVisibility } from '@/interfaces'
import { LayerVisibilityService, StoreService } from '@/services'

describe('LayerVisibilityService test suite', () => {
  test('state getter should equal layerVisibility configuration object ', () => {
    const layerVisibilityService = Container.get(LayerVisibilityService)
    const { state } = layerVisibilityService
    expect(state).toEqual(<ILayerVisibility>layerVisibility)
  })

  test('state getter should return StoreService LAYER_VISIBILITY initial static state', () => {
    const { LAYER_VISIBILITY } = StaticState
    const storeService = Container.get(StoreService)
    const spy = vi.spyOn(storeService, 'getStaticState')
    storeService.getStaticState(LAYER_VISIBILITY)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(LAYER_VISIBILITY)
    expect(spy).toHaveReturnedTimes(1)
    expect(spy).toHaveReturnedWith(<ILayerVisibility>layerVisibility)
  })

  test('setHexagonUILabelElementState method should be called', () => {
    const { BIOSPHERE } = LayerElement
    const layerVisibilityService = Container.get(LayerVisibilityService)
    const spy = vi.spyOn(layerVisibilityService, 'setLayerVisibilityState')
    layerVisibilityService.setLayerVisibilityState(BIOSPHERE)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
