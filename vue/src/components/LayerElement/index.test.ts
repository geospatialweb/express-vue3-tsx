import { mount } from '@vue/test-utils'
import { LayerElement } from '@/components'

describe('LayerElement component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(LayerElement)
    wrapper.unmount()
  })
})
