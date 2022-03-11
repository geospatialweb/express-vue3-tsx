import { mount } from '@vue/test-utils'
import { LayerElements } from '@/components'

describe('LayerElements component test suite', () => {
  it('will mount and unmount successfully', () => {
    const wrapper = mount(LayerElements)
    wrapper.unmount()
  })
})
